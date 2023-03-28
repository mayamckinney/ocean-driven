import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Image,
  Card,
  HStack,
  CardBody,
  CardHeader,
  VStack,
  Box,
  Divider,
  Heading,
  Button,
  Link,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid,
} from "@chakra-ui/react";
const lat = 27.9484684;
const lon = -111.0555218;
const KEY = "38a07275b84946c812dcb08c2e4bd539";
const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${KEY}`;
const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=Guaymas&appid=${KEY}&units=metric`;

function WeatherPanel() {
  const [weather, setWeather] = useState([]);
  const [units, setUnits] = useState("metric");

  const getURL = () => {
    return `${url}&units=${units}`;
  };

  useEffect(() => {
    fetch(getURL())
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setWeather(data.daily.slice(0, 5));
        // console.log("data", data.list.slice(0, 7));
      });
  }, [units]);

  const getDay = (dt) => {
    const date = new Date(dt * 1000);
    const day = date.getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  };

  const getHourAMPM = (dt) => {
    const date = new Date(dt * 1000);
    const hour = date.getHours();
    const min = date.getMinutes();
    return `${hour}::${min}`;
  };

  const [isChecked, setIsChecked] = useState(true);

  function handleChange() {
    setIsChecked(!isChecked);
    setUnits(units === "metric" ? "imperial" : "metric");
  }

  return (
    <Card mt={4}>
      <CardBody>
        <HStack>
          <Heading as="h3" fontSize="2xl" mt={2} mb={2}>
            Weather
          </Heading>
          <HStack>
            <Text>°F</Text>
            <Switch
              id="isRequired"
              onChange={handleChange}
              isChecked={isChecked}
              color="primary.200"
            ></Switch>
            <Text>°C</Text>
          </HStack>
        </HStack>
        <Divider />
        <HStack>
          {weather.map((day) => (
            <Card bg={"secondary.300"} width={"100%"} height={"100%"}>
              <CardBody>
                <HStack>
                  <Text fontWeight="bold">{getDay(day.dt)}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">{Math.round(day.temp.day)}°</Text>
                  <Image
                    src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                </HStack>
                <VStack>
                  <Text color="black">🌚{getHourAMPM(day.sunset)}</Text>
                  <Text color="black">🌞0{getHourAMPM(day.sunrise)}</Text>
                </VStack>
                <HStack>
                  <Text>{Math.round(day.temp.max)}° /</Text>
                  <Text>{Math.round(day.temp.min)}°</Text>
                </HStack>
                {/* </Flex> */}
              </CardBody>
            </Card>
          ))}
        </HStack>
      </CardBody>
    </Card>
  );
}

export default WeatherPanel;
