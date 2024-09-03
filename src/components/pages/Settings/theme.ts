import styled from "styled-components";
import {Card, Radio} from "antd";

const theme = {
    colors: {
        primary: "#FF7F50",
        hover: "#FFA07A",
        checked: "#FF6347",
    },
};

export const StyledCard = styled(Card)`
    border-color: ${theme.colors.primary};
    max-width: 400px; 
    margin: 0 auto; 
    padding: 20px; 
`;

export const StyledRadio = styled(Radio)`
  &&& {
    .ant-radio-inner {
      border-color: ${theme.colors.primary};
    }
    .ant-radio-inner:after {
      background-color: ${theme.colors.primary};
    }
    &:hover .ant-radio-inner {
      border-color: ${theme.colors.hover};
    }
    &:hover .ant-radio-inner:after {
      background-color: ${theme.colors.hover};
    }
    .ant-radio-checked .ant-radio-inner {
      border-color: ${theme.colors.checked};
    }
    .ant-radio-checked .ant-radio-inner:after {
      background-color: ${theme.colors.checked};
    }
  }
`;