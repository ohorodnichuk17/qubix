import { Button, Typography } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

export const StyledButton = styled(Button)`
  background-color: #FF7F50;
  border-color: #FF7F50;
  &:hover {
    background-color: #FF6347;
    border-color: #FF6347;
  }
`;

export const StyledContainer = styled.div`
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

export const StyledTitle = styled(Title)`
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const StyledParagraph = styled(Paragraph)`
  text-align: justify;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
