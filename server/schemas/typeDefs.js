const { gql } = require('apollo-server-express');

const typeDefs = gql`{
    type User {
        _id: ID
        username: String
        email: String
        password: String
        boats: [Boat]
        renter: Boolean
    }

    type Boat {
        _id: ID
        image: String
        boatType: String
        title: String
        priceRate: Number
        booked: [Booking]
        reviews: [Review]
        description: String
        destination: String
        occupancy: Int
        foodServices: Boolean
        music: Boolean
        otherFeatures: [String]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Review {
        _id: ID
        reviewText: String
        reviewAuthor: String
    }

    type Booking {
        _id: ID
        from: Date
        to: Date
        user: String
    }

    type Mutation {
        loginUser(email: String!, password: String!): Auth
        addUser(email: String!, password: String!, username: String!, renter: Boolean!): Auth
        addBoat(image: String!, boatType: String!, title: String!, priceRate: Int!, description: String!, destination: String!, occupancy: Int!, foodServices: Boolean!, music: Boolean!, otherFeatures: [String!]): Boat
        removeBoat(boatId: ID!): Boat
        addBooking(boatId: ID!, from: Date!, to: Date!, user: String): Booking
        removeBooking(bookingId: ID!): Booking
        addReview(boatId: ID!, reviewText: String, reviewAuthor: String): Review
        removeReview(boatId: ID!, reviewId): Review
    }

    type Query {
        users: [User]
        user(username: String!): User
        boats: [Boat]
        boat(boatId: ID!): Boat
    }
}
`;

module.exports = typeDefs;