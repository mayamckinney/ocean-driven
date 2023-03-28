import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($email: String!, $password: String!, $username: String!, $renter: Boolean!) {
  addUser(email: $email, password: $password, username: $username, renter: $renter) {
    token
    user {
      _id
    }
  }
}
`

export const ADD_BOAT = gql`
  mutation addBoat($image: String!, $boatType: String!, $title: String!, $priceRate: Int!, $description: String!, $destination: String!, $occupancy: Int!, $foodServices: Boolean!, $music: Boolean!, $otherFeatures: String!) {
    addBoat(image: $image, boatType: $boatType, title: $title, priceRate: $priceRate, description: $description, destination: $destination, occupancy: $occupancy, foodServices: $foodServices, music: $music, otherFeatures: $otherFeatures) {
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

export const REMOVE_BOAT = gql`
  mutation removeBoat($boatId: ID!) {
    removeBoat(boatId: $boatId) {
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

export const ADD_BOOKING = gql`
  mutation addBooking($boatId: ID!, $from: String!, $to: String!, $hours: Int!, $passengers: Int!, $user: String!) {
    addBooking(boatId: $boatId, from: $from, to: $to, hours: $hours, passengers: $passengers, user: $user) {
      _id
      boatType
      title
      description
      destination
      image
      foodServices
      music
      occupancy
      otherFeatures
      priceRate
      booked {
        _id
        from
        to
        hours
        passengers
        user
      }
      reviews {
        _id
        createdAt
        reviewAuthor
        reviewText
      }
    }
  }
`

export const REMOVE_BOOKING = gql`
  mutation removeBooking($boatId: ID!, $bookingId: ID!) {
    removeBooking(boatId: $boatId, bookingId: $bookingId) {
        _id
        from
        to
        hours
        passengers
        user 

    }
  }
`

export const ADD_REVIEW = gql`
mutation addReview($boatId: ID!, $reviewAuthor: String!, $reviewText: String) {
  addReview(boatId: $boatId, reviewAuthor: $reviewAuthor, reviewText: $reviewText) {
    reviews {
      reviewAuthor
      reviewText
      createdAt
    }
    title
  }
}
`

export const REMOVE_REVIEW = gql`
  mutation removeReview($boatId: ID!, $reviewId: ID!) {
    removeReview(boatId: $boatId, reviewId: $reviewId) {
      _id
      boatType
      booked {
        from
        to
        hours
        passengers
        user
        _id
      }
      description
      destination
      foodServices
      image
      music
      occupancy
      priceRate
      otherFeatures
      reviews {
        _id
        reviewAuthor
        reviewText
      }
      title 
    }
  }
`