import React from "react";
import { styled } from "styled-components/native";
import { FlatList } from "react-native";
import ReusableText from "./ReusableText";

const Forecast = ({ weatherData }) => {
  const formatTimeTo12HourFormat = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      hour12: true,
    });
  };

  return (
    <Container>
      <List
        horizontal={true}
        data={weatherData.forecastday[0].hour}
        keyExtractor={() => Math.random()}
        renderItem={({ item }) => (
          <Card>
            <ReusableText fontWeight="xl" size="xs" color="white">
              {formatTimeTo12HourFormat(item.time)}
            </ReusableText>
            <Icon source={{ uri: `https:${item.condition.icon}` }} />
            <ReusableText fontWeight="xl" size="s" color="white">
              {Math.round(item.temp_c)}°
            </ReusableText>
          </Card>
        )}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Card = styled.View`
  flex: 1;
  border: 1px;
  background-color: rgba(72, 49, 157, 0.3);
  border-radius: 100px;
  align-items: center;
  margin: 20px 12px 0px;
  justify-content: space-evenly;
  height: 146px;
  width: 75px;
  border-color: rgba(255, 255, 255, 0.2);
`;
const List = styled(FlatList)``;
const Icon = styled.Image`
  width: 35px;
  height: 35px;
  object-fit: cover;
`;

export default Forecast;
