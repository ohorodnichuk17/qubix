import { Button } from "antd";
import { useState } from "react";
import CreatePostModal from "./CreatePostModal";

const CreatePostButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);

    const handleOk = () => setIsModalOpen(false);

    const handleCancel = () => setIsModalOpen(false);

    return (
        <>
            <Button onClick={showModal}>Create Post</Button>
            <CreatePostModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
        </>
    )
}

export default CreatePostButton;