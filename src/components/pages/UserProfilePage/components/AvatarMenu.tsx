import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import { Menu, Upload } from "antd";
import { APP_ENV } from "../../../../env";
import { avatar } from "../../../../utils/images";
import { useAppSelector } from "../../../../hooks/redux";

type AvatarMenuProps = {
    handleAvatarChange: (info: any) => Promise<void>;
    setAvatar: React.Dispatch<React.SetStateAction<string>>;
}

const AvatarMenu = ({ handleAvatarChange, setAvatar }: AvatarMenuProps) => {
    const { user } = useAppSelector(state => state.account);
    return (
        <Menu>
            <Upload
                showUploadList={false}
                beforeUpload={() => false}
                accept="image/*"
                onChange={handleAvatarChange}
                maxCount={1}
                defaultFileList={[]}
            >
                <Menu.Item key="1" icon={<CameraOutlined />}>
                    <span>Add new avatar</span>
                </Menu.Item>
            </Upload>
            <Menu.Item key="2" icon={<DeleteOutlined />} onClick={() => {
                if (user?.avatar == "/images/avatars/") {
                    setAvatar(avatar);
                }
                else {
                    setAvatar(APP_ENV.BASE_URL + user?.avatar)
                }
            }}
            >
                Delete avatar
            </Menu.Item>
        </Menu>
    );
}

export default AvatarMenu;