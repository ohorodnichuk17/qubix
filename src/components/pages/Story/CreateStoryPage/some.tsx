// import { Card, Flex, Upload } from "antd";
// import imageStoryIcon from "../../../../assets/story/image_story_icon.png"
// import textStoryIcon from "../../../../assets/story/text_story_icon.png"
// import settingsIcon from "../../../../assets/story/settings.png"
// import defaultAvatar from "../../../../assets/avatar.png"

// import './CreateStoryPage.css'
// import { useEffect, useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";

// const CreateStoryPage = () => {
//     const [storyType, setStoryType] = useState<"image" | "text" | null>(null);

//     useEffect(() => {
//         console.log(storyType);
//     }, [storyType])

//     return (
//         <Flex style={{ height: '100%' }} gap="middle">
//             <Card>
//                 <Card>
//                     <Flex justify="space-between" align="center">
//                         <p>Your story</p>
//                         <div className="settings-icon-div">
//                             <img src={settingsIcon} alt="Settings icon" />
//                         </div>
//                     </Flex>
//                     <Flex className="avatar-div">
//                         <img src={defaultAvatar} alt="User avatar image" />
//                         <p>Username</p>
//                     </Flex>
//                 </Card>

//                 {storyType!=null&&(
//                     <>
//                         <Upload
//                             showUploadList={{ showPreviewIcon: false }}
//                             beforeUpload={() => false}
//                             accept="image/*"
//                             listType="picture-card"
//                             maxCount={1}>
//                             <div>
//                                 <PlusOutlined />
//                                 <div style={{ marginTop: 8 }}>Upload</div>
//                             </div>
//                         </Upload>
//                     </>
//                 )}
//             </Card>

//             {storyType == null && (
//                 <>
//                     <div className="create-story-div" onClick={() => setStoryType("image")}>
//                         <div className="create-story-image-div">
//                             <img src={imageStoryIcon} alt="Create story with image icon" />
//                         </div>
//                         <p className="create-story-label">Create story with photo</p>
//                     </div>
//                     <div className="create-story-div" onClick={() => setStoryType("text")}>
//                         <div className="create-story-image-div">
//                             <img src={textStoryIcon} alt="Create story with text icon" />
//                         </div>
//                         <p className="create-story-label">Create text story</p>
//                     </div>
//                 </>
//             )}

//             {storyType=="image"&&(
//                 <Card title="Preview" style={{width:'100%'}}>
//                     <div className="preview-div">
//                         <div className="preview-div-bordered">

//                         </div>
//                     </div>
//                 </Card>
// )}

//             {storyType == "text" && (
//                 <>
//                     It`s text
//                 </>
//             )}
//         </Flex>
//     );
// }

// export default CreateStoryPage;