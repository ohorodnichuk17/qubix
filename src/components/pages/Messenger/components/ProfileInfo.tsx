import { Avatar, Typography } from "antd";
import {ProfileInfoProps} from "../types.ts";

const { Title } = Typography;

const ProfileInfo: React.FC<ProfileInfoProps> = ({ selectedChat, selectedProfile }) => (
    <>
        {selectedChat && (
            <div>
                <Avatar src={selectedChat.avatar} style={{ height: "100px", width: "100px" }} />
                <Title level={4}>{selectedChat.name}</Title>
            </div>
        )}
        {selectedProfile && (
            <div>
                <Title level={4}>Profile Information</Title>
                <p>{selectedProfile}</p>
            </div>
        )}
    </>
);

export default ProfileInfo;