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
            reviews {
                _id
                reviewAuthor
                reviewText
                createdAt
              }
            booked {
                _id
                from
                to
                hours
                passengers
                user
            }
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
export const QUERY_ME = gql`
query Me {
    me {
      _id
      username
      email
      renter
      boats {
        _id
        boatType
        destination
        description
        foodServices
        image
        music
        occupancy
        otherFeatures
        priceRate
        title
        booked {
          from
          to
          hours
          passengers
          user
        }
        reviews {
          createdAt
          reviewAuthor
          reviewText
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($boatId: ID!, $from: String!, $to: String!, $startTime: String!, $endTime: String!) {
    checkout(boatId: $boatId, from: $from, to: $to, startTime: $startTime, endTime: $endTime) {
      session
    }
  }
`;