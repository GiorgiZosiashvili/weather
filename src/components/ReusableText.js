import React from "react";
import styled from "styled-components/native";
import fontSize from "../themes/fontSize";
import colors from "../themes/colors";
import fontWeight from "../themes/fontWeight";

const ReusableText = (props) => {
  return (
    <StyledText
      fontWeight={props.fontWeight}
      size={props.size}
      color={props.color}
    >
      {props.children}
    </StyledText>
  );
};
const StyledText = styled.Text`
  font-size: ${(props) => fontSize[props.size]}px;
  color: ${(props) => colors[props.color]};
  font-weight: ${(props) => fontWeight[props.fontWeight]};
`;

export default ReusableText;
