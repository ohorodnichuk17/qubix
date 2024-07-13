import { Button, Flex, Input } from "antd";
import { useState } from "react";

type TagInputProps = {
	tags: string[];
	setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagInput = ({ tags, setTags }: TagInputProps) => {
	const [newTag, setNewTag] = useState<string>("");

	const addTag = () => {
		if (newTag && !tags.includes(newTag)) {
			setTags([...tags, newTag]);
			setNewTag("");
		}
	};

	return (
		<Flex gap="small">
			<Input
				value={newTag}
				onChange={(e) => setNewTag(e.target.value)}
				placeholder="Enter tag"
			/>
			<Button onClick={addTag}>Add 2</Button>
		</Flex>
	);
};

export default TagInput;
