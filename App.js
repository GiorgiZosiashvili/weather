import { StatusBar } from "expo-status-bar";
import { styled } from "styled-components/native";
import HomeScreen from "./src/screens/home/HomeScreen";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#45278B", "#2E335A"]}
      />
      <StatusBar style="light" />
      <HomeScreen />
    </GestureHandlerRootView>
  );
}
const Gradient = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 100%;
`;
