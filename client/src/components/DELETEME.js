<Grid
          templateRows='repeat(1, 1fr)'
          templateColumns='repeat(12, 1fr)'
          gap={2}
        >
          {weather.map((day) => (

            // Weather Card
            <GridItem
              rowSpan={1}
              colSpan={{base: 6, md: 4}}
            >
              <Card bg={"secondary.300"} width={"100%"} height={"100%"}>
                <CardBody>

                  {/* Day of the week */}
                  <HStack>
                    <Text fontWeight="bold">{getDay(day.dt)}</Text>
                  </HStack>

                  {/* Temperature */}
                  <HStack>

                    {/* temp */}
                    <Text fontWeight="bold">{Math.round(day.temp.day)}°</Text>

                    {/* Weather Image */}
                    <Image
                      src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                      alt={day.weather[0].description}
                    />
                  </HStack>

                  {/* Day/Night time */}
                  <VStack>
                    <Text color="black">🌚{getHourAMPM(day.sunset)}</Text>
                    <Text color="black">🌞0{getHourAMPM(day.sunrise)}</Text>
                  </VStack>

                  {/* Max/Min Temperature */}
                  <HStack>
                    <Text>{Math.round(day.temp.max)}° /</Text>
                    <Text>{Math.round(day.temp.min)}°</Text>
                  </HStack>
                  {/* </Flex> */}
                </CardBody>
              </Card>
            </GridItem>
          ))}

        </Grid>