import { useState } from 'react';
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
  useToast
} from '@chakra-ui/react';

const ReviewForm = () => {
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // do something with the comment and stars data, such as send it to a server
    toast({
      title: 'Review submitted',
      description: 'Thank you for your review!',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
    setComment('');
    setStars('');
  };

  const olderReviews = [
    { reviewText: 'Great experience!', reviewBy: "Jon" },
    { reviewText: 'Not bad, but could be better', reviewBy: "Peter" },
    { reviewText: 'Highly recommend!', reviewBy: "Paul" },
    { reviewText: 'Would not recommend', reviewBy: "Jane" },
    { reviewText: 'Average', reviewBy: "Tom" }
  ];

  return (
    <Box >
      <VStack spacing={4} align="start">
        <Heading>Write a review</Heading>
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
        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
      <Divider my={8} />
      <Box>
        <Heading mb={4}>
          Reviews
        </Heading>
        <Flex>
          <Spacer />
          {/* <Select placeholder="Sort by">
            <option value="recent">Most Recent</option>
            <option value="rating">Rating</option>
          </Select> */}
        </Flex>
        <SimpleGrid columns={1} spacing={4} my={4} maxH="300px" overflowY="scroll">
          {olderReviews.map((review, index) => (
            <Box key={index} bg="white" p={4} borderRadius="md">
              <HStack mb={2}>
                <Box fontWeight="bold">{`${review.reviewBy} says`}</Box>
                <Box>{review.reviewText}</Box>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default ReviewForm;