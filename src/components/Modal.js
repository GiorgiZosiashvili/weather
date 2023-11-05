import React, { useCallback, useMemo, useRef, useState } from "react";
import { styled } from "styled-components/native";
import ReusableText from "./ReusableText";
import { LinearGradient } from "expo-linear-gradient";
import Forecast from "./Forecast";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet"; // Update import
import { Button, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

const Modal = ({ weatherData }) => {
  const [selectedForecast, setSelectedForecast] = useState("Hourly Forecast");

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["43%", "99%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop enableTouchThrough={true} opacity={0} {...props} />
    ),
    []
  );
  return (
    <Container>
      <BottomSheet
        ref={bottomSheetRef}
        enableTouchThrough={true}
        backgroundStyle={{
          opacity: 0,
        }}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        handleComponent={null}
        style={{ overflow: "hidden" }}
      >
        <BottomSheetContainer>
          <BlurView tint="dark" intensity={35} style={{ flex: 1 }}>
            <Gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["rgba(46, 51, 90, 0.5)", "rgba(69, 39, 139, 0.7)"]}
            />
            <ForecastContainer>
              <Pressable
                onPress={() => {
                  setSelectedForecast("Hourly Forecast");
                }}
              >
                <ReusableText fontWeight="xl" size="xs" color="gray">
                  Hourly Forecast
                </ReusableText>
              </Pressable>
              <Pressable
                onPress={() => {
                  setSelectedForecast("Weekly Forecast");
                }}
              >
                <ReusableText fontWeight="xl" size="xs" color="gray">
                  Weekly Forecast
                </ReusableText>
              </Pressable>
            </ForecastContainer>
            <Forecast weatherData={weatherData} />
          </BlurView>
        </BottomSheetContainer>
      </BottomSheet>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  width: 101%;
  height: 100%;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  position: absolute;
  bottom: 0px;
  align-self: center;
`;
const BottomSheetContainer = styled.View`
  width: 100%;
  height: 100%;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  overflow: hidden;
`;
const ForecastContainer = styled.View`
  width: 100%;
  height: 49px;
  flex-direction: row;
  justify-content: space-around;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border: 0.5px;
  border-color: rgba(255, 255, 255, 0.4);
  align-items: flex-end;
  padding-bottom: 4px;
`;
const Pressable = styled.Pressable``;
const Gradient = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export default Modal;
