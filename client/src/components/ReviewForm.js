import { useState } from "react";
import {
  Box,
  Heading,
  Textarea,
  Button,
  Select,
  VStack,
  HStack,
  Flex,
  Spacer,
  Divider,
  SimpleGrid,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { ADD_REVIEW } from "../utils/mutations";
import { formatDate } from "../utils/helpers";
import Auth from "../utils/auth";

function ReviewForm({ props }) {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState("");
  const [reviews, setReviews] = useState([]);
  const [addReview] = useMutation(ADD_REVIEW);
  const toast = useToast();

  useEffect(() => {
    setReviews(props.reviews);
  }, [props.reviews]);

 

  const handleSubmit = async (event) => {
    let reviewAuthor = Auth.getProfile().data.username || "Anonymous";
    let reviewText = comment;
    event.preventDefault();

    // do something with the comment and stars data, such as send it to a server
    try {
      const { data } = await addReview({
        variables: {
          boatId: `${props._id}`,
          reviewAuthor,
          reviewText,
        },
      });

      const reviews = data.addReview.reviews;
      setReviews(reviews);

      toast({
        title: "Review submitted",
        description: "Thank you for your review!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
    }
    setComment("");
    setStars("");
  };

  return (
    <Box mt={4}>
      {/* Form */}
      <VStack spacing={4} align="start">
        <FormControl>
          <FormLabel fontSize="xl">
            What did you think of your experience?
          </FormLabel>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here"
            size="lg"
          />
          {/* <Select
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          placeholder="Select number of stars"
          size="lg"
        >
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </Select> */}
          <Button onClick={handleSubmit} mt={2} w="full">
            Submit
          </Button>
        </FormControl>
      </VStack>

      <Divider my={8} />

      {/* Reviews */}
      <Box>
        <Heading mb={4} fontSize="3xl">
          Reviews
        </Heading>

        <Flex>
          <Spacer />
          {/* <Select placeholder="Sort by">
            <option value="recent">Most Recent</option>
            <option value="rating">Rating</option>
          </Select> */}
        </Flex>

        <SimpleGrid
          columns={1}
          spacing={1}
          my={2}
          maxH="300px"
          overflowY="scroll"
        >
          {reviews.map((review, index) => (
            <Box key={index} bg="white" p={4} borderRadius="md">
              <HStack mb={2}>
                <Box fontWeight="bold">{`${
                  review.reviewAuthor
                } says at ${formatDate(Number(review.createdAt))}`}</Box>
                <Box>{review.reviewText}</Box>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default ReviewForm;
