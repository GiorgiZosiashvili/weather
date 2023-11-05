import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components/native";
import axios from "axios";
import { getTopInset } from "rn-iphone-helper";
import ReusableText from "../../components/ReusableText";
import { windowWidth, screenHeight } from "../../themes/dimension";
import Modal from "../../components/Modal";
import { View } from "react-native";

const HomeScreen = () => {
  const [city, setCity] = useState("Tbilisi");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const backgroundRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
        params: {
          q: `${city}`,
          days: "7",
        },
        headers: {
          "X-RapidAPI-Key":
            "2e088ce01fmsh934fd4f9f5080b5p11a1a9jsne4a3e13c0943",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [city]);

  const roundedMaxTemp = Math.round(
    weatherData?.forecast?.forecastday[0].day.maxtemp_c
  );
  const roundedMinTemp = Math.round(
    weatherData?.forecast?.forecastday[0].day.mintemp_c
  );
  return (
    <Container>
      <Background
        ref={backgroundRef}
        width={windowWidth}
        height={screenHeight}
        source={require("../../../assets/Background.jpeg")}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : weatherData ? (
        <View style={{ flex: 1 }}>
          <InfoContainer>
            <ReusableText fontWeight="xl" size="l" color="white">
              {city}
            </ReusableText>
            <ReusableText fontWeight="s" size="max" color="white">
              {weatherData.current.temp_c}°
            </ReusableText>
            <ReusableText fontWeight="xl" size="s" color="gray">
              {weatherData.current.condition.text}
            </ReusableText>
            <MaxAndMinContainer>
              <ReusableText fontWeight="xl" size="s" color="white">
                M:{roundedMaxTemp}° {"  "}L:
                {roundedMinTemp}°
              </ReusableText>
            </MaxAndMinContainer>
          </InfoContainer>
          <House source={require("../../../assets/House.png")} />
          <Modal weatherData={weatherData?.forecast} />
        </View>
      ) : null}
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  padding-top: ${getTopInset()}px;
`;
const Background = styled.Image`
  object-fit: cover;
  position: absolute;
  z-index: -1;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const InfoContainer = styled.View`
  align-items: center;
  margin-top: 51px;
`;
const MaxAndMinContainer = styled.View`
  flex-direction: row;
`;
const House = styled.Image`
  width: 390px;
  height: 390px;
  object-fit: cover;
  margin-top: 20px;
`;

const Text = styled.Text`
  font-size: 18px;
`;
