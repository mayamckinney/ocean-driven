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
  Radio,
  RadioGroup,
  Text,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Select
} from "@chakra-ui/react";

const BoatForm = () => {
  const [image, setImage] = useState("");
  const [boatType, setBoatType] = useState("");
  const [title, setTitle] = useState("");
  const [priceRate, setPriceRate] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [occupancy, setOccupancy] = useState(1);
  const [foodServices, setFoodServices] = useState(false);
  const [music, setMusic] = useState(false);
  const [formError, setFormError] = useState(null);

  const boatTypes = [
    "Sailboat",
    "Powerboat",
    "Fishing boat",
    "Pontoon boat",
    "Kayak/Canoe",
    "Yacht",
    "Catamaran",
    "Houseboat",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data here
    if (title.trim() === "") {
      setFormError("Title is required");
      return;
    }

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
    setFormError(null);
  };

  return (
    <Card>
      <CardHeader>
        <Heading margin="auto" textAlign={"center"}>
          Boat Form
        </Heading>
      </CardHeader>
      <CardBody>
        <Box maxWidth="800px" margin="auto">
          <form onSubmit={handleSubmit}>
            <FormControl id="image" isRequired>
              <FormLabel>Image</FormLabel>
              <Input type="file" onChange={(e) => setImage(e.target.value)} />
              <Image src={image} alt="" maxW="200px" my="4" />
            </FormControl>
            <FormControl id="boatType" isRequired mt="4">
              <FormLabel>Boat Type</FormLabel>
              {/* <Input
                type="text"
                placeholder="Enter boat type"
                value={boatType}
                onChange={(e) => setBoatType(e.target.value)}
              /> */}
              <Select placeholder="Select boat type">
                {boatTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormControl>
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
                <FormErrorMessage color="red.500">{formError}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="priceRate" isRequired mt="4">
              <FormLabel>Price Rate</FormLabel>
              <Input
                type="number"
                placeholder="Enter price rate"
                value={priceRate}
                onChange={(e) => setPriceRate(e.target.value)}
              />
            </FormControl>
            <FormControl id="description" isRequired mt="4">
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl id="destination" isRequired mt="4">
              <FormLabel>Destination</FormLabel>
              <Input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </FormControl>
            <FormControl id="occupancy" isRequired mt="4">
              <FormLabel>Occupancy</FormLabel>
              <Input
                type="number"
                placeholder="Enter occupancy"
                value={occupancy}
                onChange={(e) => setOccupancy(Number(e.target.value))}
              />
            </FormControl>
            <FormControl id="foodServices" isRequired mt="4">
              <FormLabel>Food Services</FormLabel>
              <Checkbox
                type="checkbox"
                placeholder="Enter food services"
                value={foodServices}
                onChange={(e) => setFoodServices(e.target.checked)}
              />
            </FormControl>
            <FormControl id="music" isRequired mt="4">
              <FormLabel>Music</FormLabel>
              <Checkbox
                type="checkbox"
                placeholder="Enter music"
                value={music}
                onChange={(e) => setMusic(e.target.checked)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" mt="4">
              Submit
            </Button>
          </form>
        </Box>
      </CardBody>
    </Card>
  );
};

export default BoatForm;
