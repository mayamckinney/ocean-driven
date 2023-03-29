import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Card,
  HStack,
  CardBody,
  VStack,
  Divider,
  Heading,
  Switch,
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
    return `${hour}:${min}`;
  };

  const [isChecked, setIsChecked] = useState(true);

  function handleChange() {
    setIsChecked(!isChecked);
    setUnits(units === "metric" ? "imperial" : "metric");
  }

  return (
    <Card mt={4}>
      <CardBody>

        {/* Header */}
        <HStack>

          <Heading as="h3" fontSize="2xl" mt={2} mb={2}>
            Weather
          </Heading>

          {/* Fahrenheit to Celsius Switch */}
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

        <HStack
          overflowX='scroll'
          pb={1}
          sx={{
            '&::-webkit-scrollbar': {
              width: '100%',
              height: '10px',
              borderRadius: '8px',
              backgroundColor: `secondary.50`,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `secondary.200`,
              borderRadius: '8px',
            },
          }}
        >
          {weather.map((day) => (

            // Weather Card
            <Card bg={"secondary.300"} minWidth='160px' height={"100%"}>
              <CardBody>

                {/* Day of the week */}
                <HStack>
                  <Text fontWeight="bold">{getDay(day.dt)}</Text>
                
                  {/* Temperature */}              
                  <Text fontWeight="bold">{Math.round(day.temp.day)}°</Text>

                  {/* Weather Image */}
                  <Image
                    src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                </HStack>

                {/* Sunset/Sunrise */}
                <VStack>
                  <Text as='b'>Sunset/Sunrise</Text>
                  <Text color="black">🌇 {getHourAMPM(day.sunset)}</Text>
                  <Text color="black">🌅 0{getHourAMPM(day.sunrise)}</Text>
                </VStack>

                {/* Max/Min Temperature */}
                <VStack mt={3}>
                  <Text as='b'>High/Low</Text>
                  <Text>{Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°</Text>
                </VStack>     
              </CardBody>
            </Card>

          ))}

        </HStack>
      </CardBody>
    </Card>
  );
}

export default WeatherPanel;
