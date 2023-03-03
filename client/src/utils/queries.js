import { gql } from '@apollo/client'

export const QUERY_USERS = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            password
            boats
            renter
        }
    }
`
export const QUERY_BOATS = gql`
    query getBoats {
        boats {
            _id
            image
            boatType
            title
            priceRate
            description
            destination
            occupancy
            foodServices
            music
            otherFeatures
        }
    }
`

export const QUERY_SINGLE_BOAT = gql`
    query getSingleBoat($boatId: ID!) {
        boat(boatId: $boatId) {
            _id
            image
            boatType
            title
            priceRate
            booked
            reviews
            description
            destination
            occupancy
            foodServices
            music
            otherFeatures
        }
    }
`