const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order, Boat } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    boats: async () => {
      return await Boat.find();
    },
    boat: async (parent, { boatId }) => {
      return await Boat.findOne({ _id: boatId });
    },
    users: async () => {
      return await User.find().populate("boats");
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate("boats");
    },
  },
  Mutation: {
    login: async (parent, {email, password}) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, args) => {
  
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addBoat: async (
      parent,
      {
        image,
        boatType,
        title,
        priceRate,
        description,
        destination,
        occupancy,
        foodServices,
        music,
        otherFeatures,
      },
      context
    ) => {
      
      const boat = await Boat.create({
        image,
        boatType,
        title,
        priceRate,
        description,
        destination,
        occupancy,
        foodServices,
        music,
        otherFeatures,
      });
      
      if(!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
     
      let user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { boats: boat._id } }
      );
      
      return boat;
    },
    removeBoat: async (parent, { boatId }) => {
      const boat = await Boat.findOneAndDelete({
        _id: boatId,
      });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { boats: boat._id } }
      );
      return boat;
    },
    addBooking: async (parent, { boatId, from, to, user }, context) => {
      return await Boat.findOneAndUpdate(
        { _id: boatId },
        {
          $addToSet: {
            booked: { from, to, user: context.user.username },
          },
        }
      );
    },
    removeBooking: async (parent, { boatId, bookingId }) => {
      return await Boat.findOneAndUpdate(
        { _id: boatId },
        {
          $pull: {
            booked: {
              _id: bookingId,
            },
          },
        },
        { new: true }
      );
    },
    addReview: async (parent, { boatId, reviewText }, context) => {
      return await Boat.findOneAndUpdate(
        { _id: boatId },
        {
          $addToSet: {
            reviews: {
              reviewText,
              user: context.user.username,
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeReview: async (parent, { boatId, reviewId }) => {
      return await Boat.findOneAndUpdate(
        { _id: boatId },
        {
          $pull: {
            reviews: {
              _id: reviewId,
            },
          },
        },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
