import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import { Menu, Upload } from "antd";
import { APP_ENV } from "../../../../env";

type CoverPhotoMenuProps={
    handleCoverPhotoChange: (info: any) => Promise<void>;
    setCoverPhoto: React.Dispatch<React.SetStateAction<string>>
    userCoverPhoto:any;
}

const CoverPhotoMenu = ({ handleCoverPhotoChange, setCoverPhoto, userCoverPhoto }: CoverPhotoMenuProps)=>{
return(
    <Menu>
        <Upload
            showUploadList={false}
            beforeUpload={() => false}
            accept="image/*"
            onChange={handleCoverPhotoChange}
            maxCount={1}
            defaultFileList={[]}
        >
            <Menu.Item key="1" icon={<CameraOutlined />}>
                <span>Add new cover photo</span>
            </Menu.Item>
        </Upload>
        <Menu.Item key="2" icon={<DeleteOutlined />} onClick={() => setCoverPhoto(APP_ENV.BASE_URL + "/images/coverPhotos/" + userCoverPhoto)}>
            Delete cover photo
        </Menu.Item>
    </Menu>
);
}

export default CoverPhotoMenu;