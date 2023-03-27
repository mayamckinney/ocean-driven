import React, { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Image,
  Grid,
  Text
} from "@chakra-ui/react";

function ImageUploadForm({props}) {
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // Iterate throught the files and prepend the name of the boat to the file name
    console.log("files", files)
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object and append each image to it
    images.forEach((image) => {
      const formData = new FormData();
      formData.append("image", image);
      const response = fetch(`/api/boat/image/${props._id}`, {
        method: "POST",
        body: formData,
      }).then(() => {});
    });
    // Handle the server response here
    // Prevent the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
  };

  return (
    <Flex direction="column" alignItems="center">
      <Text fontSize="2xl" fontWeight="bold" mt={4}>
        {props.title}
      </Text>
      <FormControl>
        <FormLabel htmlFor="images">Select Images</FormLabel>
        <Input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleFileChange}
        />
      </FormControl>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
        {images.map((image) => (
          <Box key={image.name}>
            <Image
              src={URL.createObjectURL(image)}
              objectFit="cover"
              alt={image.name}
            />
          </Box>
        ))}
      </Grid>
      <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
        Upload Images
      </Button>
    </Flex>
  );
}

export default ImageUploadForm;
