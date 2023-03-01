const { gql } = require('apollo-server-express');

const typeDefs = gql`{
    type User {
        _id: ID
        username: String
        email: String
        boats: [Boat]
    }

    type Boat {
        _id: ID
        image: String
        boatType: String,
        title: String
        priceRate: Number
        booked: Booking
    }

    type Booking {
        from: Date
        to: Date
        bookedBy: User
    }
}
`;

module.exports = typeDefs;