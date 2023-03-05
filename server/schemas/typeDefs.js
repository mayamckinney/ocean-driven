const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Boat {
        _id: ID
        image: String
        boatType: String
        title: String
        priceRate: Int
        booked: [Booking]
        reviews: [Review]
        description: String
        destination: String
        occupancy: Int
        foodServices: Boolean
        music: Boolean
        otherFeatures: [String]
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        boats: [Boat]
        renter: Boolean
    }

    type Auth {
        token: ID!
        user: User
    }

    type Review {
        _id: ID
        reviewText: String
        reviewAuthor: String
        createdAt: String
    }

    type Booking {
        _id: ID
        from: String
        to: String
        user: String
    }

    type Query {
        users: [User]
        user(username: String!): User
        boats: [Boat]
        boat(boatId: ID!): Boat
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!, username: String!, renter: Boolean!): Auth
        addBoat(image: String, boatType: String, title: String, priceRate: Int, description: String, destination: String, occupancy: Int, foodServices: Boolean, music: Boolean, otherFeatures: [String]): Boat
        removeBoat(boatId: ID!): Boat
        addBooking(boatId: ID!, from: String!, to: String!, user: String!): Boat
        removeBooking(bookingId: ID!): Booking
        addReview(boatId: ID!, reviewText: String, reviewAuthor: String!): Boat
        removeReview(boatId: ID!, reviewId: Int): Review
    }
`;

module.exports = typeDefs;