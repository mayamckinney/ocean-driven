const { AuthenticationError } = require('apollo-server-express');
const { User, Boat } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('boats')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('boats')
        },
        boats: async () => {
            return Boat.find()
        },
        boat: async (parent, { boatId }) => {
            return Boat.findOne({ _id: boatId })
        }
    },

    Mutation: {
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { username, email, password, renter }) => {
            const user = await User.create({ username, email, password, renter });
            const token = signToken(user);
            return { token, user };
        },
        addBoat: async (parent, { image, boatType, title, priceRate, description, destination, occupancy, foodServices, music, otherFeatures }, context) => {
            const boat = await Boat.create({ image, boatType, title, priceRate, description, destination, occupancy, foodServices, music, otherFeatures })
            
            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { boats: boat._id }}
            )
            return boat
        },
        removeBoat: async (parent, { boatId }) => {
            const boat = await Boat.findOneAndDelete({
                _id: boatId
            })

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { boats: boat._id }}
            )
            return boat
        },
        addBooking: async (parent, { boatId, from, to }, context) => {
            return Boat.findOneAndUpdate(
                { _id: boatId },
                {
                    $addToSet: {
                        booked: { from, to, user: context.user.username }
                    }
                },
                {
                  new: true,
                  runValidators: true,
                }
            )
        },
        removeBooking: async (parent, { boatId, bookingId }) => {
            return Boat.findOneAndUpdate(
                { _id: boatId },
                {
                    $pull: {
                        booked: {
                            _id: bookingId
                        }
                    }
                },
                { new: true }
            )
        },
        addReview: async (parent, { boatId, reviewText }, context) => {
            return Boat.findOneAndUpdate(
                { _id: boatId },
                { 
                    $addToSet: {
                        reviews: {
                            reviewText,
                            user: context.user.username
                        }
                    }
                },
                {
                  new: true,
                  runValidators: true,
                }
            )
        },
        removeReview: async (parent, { boatId, reviewId }) => {
            return Boat.findOneAndUpdate(
                { _id: boatId },
                {
                    $pull: {
                        reviews: {
                            _id: reviewId
                        }
                    }
                },
                { new: true }
            )
        }
    }
}

module.exports = resolvers