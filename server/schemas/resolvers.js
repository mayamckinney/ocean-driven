const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order, Boat } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    boats: async () => {
      return await Boat.find().populate("booked").populate("reviews");
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
    me: async (parent, args, context) => { 
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("boats");
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
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

      user = await User.findOne({ _id: context.user._id }).populate("boats");
      
      return boat;
    },
    removeBoat: async (parent, { boatId }, context) => {
      const boat = await Boat.findOneAndDelete({
        _id: boatId,
      });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { boats: boat._id } }
      );
      return boat;
    },
    addBooking: async (parent, { boatId, from, to, startTime, endTime, user }, context) => {
      await Boat.findOneAndUpdate(
        { _id: boatId },
        {
          $addToSet: {
            booked: { from, to, startTime, endTime, user: context.user.username },
          },
        }
      );

      return await Boat.findOne({ _id: boatId }).populate("booked").populate("reviews");
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
    addReview: async (
      parent,
      { boatId, reviewText, reviewAuthor },
      context
    ) => {
      // const user = context.user ? context.user.username : reviewAuthor;
      const boat = await Boat.findOneAndUpdate(
        { _id: boatId },
        {
          $addToSet: {
            reviews: {
              reviewText,
              reviewAuthor
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      
      return boat;
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
