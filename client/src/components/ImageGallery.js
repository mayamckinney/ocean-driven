import React from 'react';
import { SimpleGrid, Box, Image } from '@chakra-ui/react';

const ImageGallery = ({ images }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
      {images.map((image, index) => (
        <Box key={index}>
          <Image src={image} alt={image} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ImageGallery;
