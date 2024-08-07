import { Button } from "antd";
import styled from "styled-components";

export const CoverButton = styled(Button)`
  display: flex;
	align-items: center;
	border: none;
	position: absolute;
	right: 0px;
	bottom: 0px;
  background-color: white;
  border-radius: 10px;
  padding: 2px;
  text-transform: none;
  color: #000000;
  margin: 20px;

  &:hover {
    background-color: #ff7f50;
    box-shadow: none;
  }
  
  img{
    width: 26px;
    height: 22px;
    margin: 5px;
  }
`;

export const EditButton = styled(Button)`
  background-color: #ff7f50;
  border-radius: 10px;
  padding: 2px;
  width: 15%;
  text-transform: none;
  margin: 7%;
  font-weight: bold;
  color: #000000;
  &:hover {
    background-color: #d9d9d9;
    box-shadow: none;
  }
  @media (max-width: 768px) {
    width: 40%;
    font-size: 12px;
  }
`;

export const AvatarButton = styled(Button)`
  border: none;
  color: black;
  border-radius: 100px;
  background-color: #d9d9d9;
  padding: 0px;
  text-transform: none;
  margin-left: -3vh;
  margin-top: 10vh;
  &:hover {
    background-color: #ff7f50;
    box-shadow: none;
  }
`;