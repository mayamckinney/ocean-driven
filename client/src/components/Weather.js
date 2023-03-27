import React, { useEffect, useState } from "react";

import {
  HStack,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Text,
  Heading,
} from "@chakra-ui/react";

const Spinner = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

const Form = ({ newLocation }) => {
  const [city, setCity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ city });
    if (city === "" || !city) return;

    newLocation(city);
  };

  useEffect(() => {
    console.log("Form mounted");
    newLocation("Guaymas");
  }, []);

  return <div className="container"></div>;
};

const CardW = ({ loadingData, showData, weather, forecast }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const hour = d.getHours();

    return `${month}/${day} ${hour}:00`;
  };

  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var date = month + "/" + day + " ";

  var url = "";
  var iconUrl = "";

  var iconUrl3 = "";
  var iconUrl6 = "";
  var iconUrl9 = "";

  var forecastDate3 = "";
  var forecastDate6 = "";
  var forecastDate9 = "";

  if (loadingData) {
    return <Spinner />;
  }

  if (showData) {
    url = "http://openweathermap.org/img/w/";
    iconUrl = url + weather.weather[0].icon + ".png";

    iconUrl3 = url + forecast.list[1].weather[0].icon + ".png";
    iconUrl6 = url + forecast.list[2].weather[0].icon + ".png";
    iconUrl9 = url + forecast.list[3].weather[0].icon + ".png";

    forecastDate3 = formatDate(forecast.list[1].dt_txt);
    forecastDate6 = formatDate(forecast.list[2].dt_txt);
    forecastDate9 = formatDate(forecast.list[3].dt_txt);
  }

  return (
    <div className="mt-5">
      {showData === true ? (
        // <div className="container">
        <div>
          {/* <div className="card-body text-start mt-2">
                                        <h5 className="card-text">Temperatura máxima: {(weather.main.temp_max - 273.15).toFixed(1)}ºC</h5>
                                        <h5 className="card-text">Temperatura mínima: {(weather.main.temp_min - 273.15).toFixed(1)}ºC</h5>
                                        <h5 className="card-text">sensación térmica: {(weather.main.feels_like- 273.15).toFixed(1)}ºC</h5>
                                        <h5 className="card-text">Humedad: {weather.main.humidity}%</h5>
                                        <h5 className="card-text">Velocidad del viento: {weather.wind.speed}m/s</h5>
                                    </div> */}
          {/* <hr /> */}

          <HStack>
            <Day
              date={date}
              icon={iconUrl}
              temp={weather.main.temp}
              description={weather.weather[0].description}
            />
            <Day
              date={forecastDate3}
              icon={iconUrl3}
              temp={forecast.list[1].main.temp}
              description={forecast.list[1].weather[0].description}
            />
            <Day
              date={forecastDate6}
              icon={iconUrl6}
              temp={forecast.list[2].main.temp}
              description={forecast.list[2].weather[0].description}
            />
            <Day
              date={forecastDate9}
              icon={iconUrl9}
              temp={forecast.list[3].main.temp}
              description={forecast.list[3].weather[0].description}
            />
            {/* <Day
              date={forecastDate3}
              icon={iconUrl3}
              temp={forecast.list[4].main.temp}
              description={forecast.list[4].weather[0].description}
            /> */}
          </HStack>
        </div>
      ) : (
        <h2 className="text-light">Loading</h2>
      )}
    </div>
  );
};

const Day = ({ date, icon, temp, description }) => {
  console.log("description", description);
  console.log("date", date);
  console.log("icon", icon);
  return (
    <Card bg={"secondary.300"}>
      <CardBody>
      <Heading size={"sm"}>{date}</Heading>
        <Image src={icon} alt="icon" />
        <Text>{(temp - 273.15).toFixed(1)}ºC</Text>
        {/* <Text>{description}</Text> */}
      </CardBody>
    </Card>
  );
};

const Weather = () => {
  let urlWeather =
    "https://api.openweathermap.org/data/2.5/weather?appid=38a07275b84946c812dcb08c2e4bd539&lang=en";
  let cityUrl = "&q=";

  let urlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?appid=38a07275b84946c812dcb08c2e4bd539&lang=en";

  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const getLocation = async (loc) => {
    setLoading(true);
    setLocation(loc);

    //weather

    urlWeather = urlWeather + cityUrl + loc;

    await fetch(urlWeather)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((weatherData) => {
        console.log(weatherData);
        setWeather(weatherData);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setShow(false);
      });

    //Forecast

    urlForecast = urlForecast + cityUrl + loc;

    await fetch(urlForecast)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((forecastData) => {
        console.log(forecastData);
        setForecast(forecastData);

        setLoading(false);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setShow(false);
      });
  };

  return (
    <React.Fragment>
      <Form newLocation={getLocation} />

      <CardW
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </React.Fragment>
  );
};

export default Weather;
