import { gql } from '@apollo/client'

// export const LOGIN_USER = gql`
//     mutation loginUser($email: String!, $password: String!) {
//         loginUser(email: $email, password: $password) {
//             token
//             user {
//               _id
//               username
//         }
//     }
// `

// export const ADD_USER = gql`
//   mutation addUser($username: String!, $email: String!, $password: String!, $renter: Boolean!) {
//     addUser(username: $username, email: $email, password: $password, renter: $renter) {
//       token
//       user {
//         _id
//         username
//       }
//     }
//   }
// `

// export const ADD_BOAT = gql`
//   mutation addBoat($image: String!, $boatType: String!, $title: String!, $priceRate: Int!, $description: String!, $destination: String!, $occupancy: Int!, $foodServices: Boolean!, $music: Boolean!, $otherFeatures: [String!]) {
//     addBoat(image: $image, boatType: $boatType, title: $title, priceRate: $priceRate, description: $description, destination: $destination, occupancy: $occupancy, foodServices: $foodServices, music: $music, otherFeatures: $otherFeatures) {
//         _id
//         image
//         boatType
//         title
//         priceRate
//         description
//         destination
//         occupancy
//         foodServices
//         music
//         otherFeatures
//     }
//   }
// `

// export const REMOVE_BOAT = gql`
//   mutation removeBoat($boatId: ID!) {
//     removeBoat(boatId: $boatId) {
//         _id
//         image
//         boatType
//         title
//         priceRate
//         description
//         destination
//         occupancy
//         foodServices
//         music
//         otherFeatures
//     }
//   }
// `

export const ADD_BOOKING = gql`
  mutation addBooking($boatId: ID!, $from: String!, $to: String!, $user: String) {
    addBooking(boatId: $boatId, from: $from, to: $to, user: $user) {
        _id
        from
        to
        user
    }
  }
`

// export const REMOVE_BOOKING = gql`
//   mutation removeBooking($boatId: ID!, $bookingId: ID!) {
//     removeBooking(boatId: $boatId, bookingId: $bookingId) {
//         _id
//         from
//         to
//         user 
//     }
//   }
// `

// export const ADD_REVIEW = gql`
//   mutation addReview($boatId: ID!, $reviewText: String!, $reviewAuthor: String) {
//     addReview(boatId: $boatId, reviewText: $reviewText, reviewAuthor: $reviewAuthor) {
//         _id
//         reviewText
//         reviewAuthor
//     }
//   }
// `

// export const REMOVE_REVIEW = gql`
//   mutation removeReview($boatId: ID!, $reviewId: ID!) {
//     removeReview(boatId: $boatId, reviewId, $reviewId) {
//         _id
//         reviewText
//         reviewAuthor
//     }
//   }
// `