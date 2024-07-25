import React, { useState } from "react";
import { Card, Typography, Radio } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
  border-color: #FF7F50;
`;

const StyledRadio = styled(Radio)`
  &&& {
    .ant-radio-inner {
      border-color: #FF7F50;
    }
    .ant-radio-inner:after {
      background-color: #FF7F50;
    }
    &:hover .ant-radio-inner {
      border-color: #FFA07A;
    }
    &:hover .ant-radio-inner:after {
      background-color: #FFA07A;
    }
    .ant-radio-checked .ant-radio-inner {
      border-color: #FF6347;
    }
    .ant-radio-checked .ant-radio-inner:after {
      background-color: #FF6347;
    }
  }
`;

const PrivacyPage: React.FC = () => {
   const [isPrivate, setIsPrivate] = useState(false);

   const handleRadioChange = (e: any) => {
      setIsPrivate(e.target.value === 'private');
   };

   return (
      <StyledCard>
         <Title level={2}>Privacy Settings</Title>
         <Paragraph>
            Choose your account visibility by selecting one of the options below.
            A private account restricts visibility to only approved followers,
            while a public account allows anyone to see all in your account.
         </Paragraph>
         <Radio.Group value={isPrivate ? 'private' : 'public'} onChange={handleRadioChange}>
            <StyledRadio value="private">Private Account</StyledRadio>
            <StyledRadio value="public">Public Account</StyledRadio>
         </Radio.Group>
      </StyledCard>
   );
};

export default PrivacyPage;
