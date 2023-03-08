import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Select,
  useToast,
} from "@chakra-ui/react";

import { useMutation } from "@apollo/client";
import { ADD_BOAT } from "../utils/mutations";
import { boatTypes } from "../utils/types";


function BoatForm() {
  const [image, setImage] = useState("");
  const [boatType, setBoatType] = useState("");
  const [title, setTitle] = useState("");
  const [priceRate, setPriceRate] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [occupancy, setOccupancy] = useState(1);
  const [foodServices, setFoodServices] = useState(false);
  const [music, setMusic] = useState(false);
  const [otherFeatures, setOtherFeatures] = useState("")
  const [formError, setFormError] = useState(null);

  const [addBoat] = useMutation(ADD_BOAT);
  const toast = useToast()

  function getFileName(filePath) {
    const filePathArray = filePath.split("\\");
    return filePathArray.pop();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data here
    // if (title.trim() === "") {
    //   setFormError("Title is required");
    //   return;
    // }

    // Submit form data to server here
    console.log({
      image,
      boatType,
      title,
      priceRate,
      description,
      destination,
      occupancy,
      foodServices,
      music,
    });

    let demoImage = `images/${getFileName(image)}`

    try {
      const { data } = await addBoat({
        variables: {
          image: demoImage,
          title,
          boatType,
          priceRate,
          description,
          destination,
          occupancy,
          foodServices,
          music,
          otherFeatures
        }
      });
      console.log(data);

      toast({
        title: `Boat ${title}  created.`,
        description: 'Thank you!',
        status: 'success',
        duration: 3000,
        isClosable: true
      })

       // Reset form fields
       setImage("");
       setBoatType("");
       setTitle("");
       setPriceRate("");
       setDescription("");
       setDestination("");
       setOccupancy(1);
       setFoodServices(false);
       setMusic(false);
       setOtherFeatures("")
       setFormError(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      borderRadius="md"
      my={4}
    >
      <Card>
        <CardBody>
          <Box maxWidth="800px" margin="auto">

            <form onSubmit={handleSubmit}>

              {/* Image Upload */}
              <FormControl id="image" isRequired>
                <FormLabel>Image</FormLabel>
                <Input type="file" variant='flushed' verticalAlign='center' onChange={(e) => setImage(e.target.value)} />
                <Image src={image} alt="" maxW="200px" />
              </FormControl>

              {/* Boat Type */}
              <FormControl id="boatType" isRequired mt="4">
                <FormLabel>Boat Type</FormLabel>
                <Select placeholder="Select boat type" onChange={(e) => setBoatType(e.target.value)}>
                  {boatTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Title */}
              <FormControl id="title" isRequired mt="4">
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormHelperText>Title is required</FormHelperText>
                {formError && (
                  <FormErrorMessage color="red.500">
                    {formError}
                  </FormErrorMessage>
                )}
              </FormControl>

              {/* Price Rate */}
              <FormControl id="priceRate" isRequired mt="4">
                <FormLabel>Price Rate</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter price rate"
                  value={priceRate}
                  onChange={(e) => setPriceRate(Number(e.target.value))}
                />
              </FormControl>

              {/* Description */}
              <FormControl id="description" isRequired mt="4">
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              {/* Destination */}
              <FormControl id="destination" isRequired mt="4">
                <FormLabel>Destination</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </FormControl>

              {/* Occupancy */}
              <FormControl id="occupancy" isRequired mt="4">
                <FormLabel>Occupancy</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter occupancy"
                  value={occupancy}
                  onChange={(e) => setOccupancy(Number(e.target.value))}
                />
              </FormControl>

              {/* Food Service */}
              <FormControl id="foodServices" mt="4">
                <FormLabel>Food Services</FormLabel>
                <Checkbox
                  type="checkbox"
                  value={foodServices}
                  onChange={(e) => setFoodServices(e.target.checked)}
                />
              </FormControl>

              {/* Music */}
              <FormControl id="music" mt="4">
                <FormLabel>Music</FormLabel>
                <Checkbox
                  type="checkbox"
                  value={music}
                  onChange={(e) => setMusic(e.target.checked)}
                />
              </FormControl>

              {/* Other Features */}
              <FormControl id="other" mt="4">
                <FormLabel>Other Features</FormLabel>
                <Input
                  type="text"
                  placeholder="Add extra features"
                  value={otherFeatures}
                  onChange={(e) => {setOtherFeatures(e.target.value)}}
                />
              </FormControl>

              {/* Submit Button */}
              <Button type="submit" mt="4" w='full' onClick={() => {window.location.reload()}}>
                Submit
              </Button>
            </form>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}

export default BoatForm;
