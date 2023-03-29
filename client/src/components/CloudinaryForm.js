import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";
// import { AdvancedImage as Image } from '@cloudinary/react';

const CloudinaryForm = ({ props }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (event) => {
    console.log("images", event.target.files);
    setImages(event.target.files);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setUploading(true);

    const promises = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "cjbeculx");
      const date = new Date().toISOString().replace(/:/g, "-");
      formData.append("public_id", `${props.title}-${date}`);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dqa3bfehe/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      promises.push(data.secure_url);
    }

    const urls = await Promise.all(promises);

    console.log(urls);

    setImages([]);
    setUploading(false);
    alert("Images uploaded successfully!");
  };

  return (
    // <CloudinaryContext cloudName="your-cloud-name">
    <Box
      maxW="lg"
      mx="auto"
      my={8}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel htmlFor="images">Select images to upload:</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<Text>+</Text>} />
            <Input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
            />
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          isLoading={uploading}
          mt={4}
          colorScheme="blue"
          isDisabled={!images.length}
        >
          Upload
        </Button>
      </form>
      {images.length > 0 && (
        <>
          <FormLabel>Preview:</FormLabel>
          <HStack mt={4}>
            {Array.from(images).map((image, index) => (
              <Image
                key={index}
                src={URL.createObjectURL(image)}
                width="250px"
                height={"300"}
              >
                {/* <Transformation width="200" height="200" crop="fill" /> */}
              </Image>
            ))}
          </HStack>
        </>
      )}
    </Box>
    // </CloudinaryContext>
  );
};

export default CloudinaryForm;
