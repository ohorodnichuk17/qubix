import { Flex, Tag } from "antd";
import { TAG_COLORS } from "../../constants";

type TagsListProps = {
	tags: string[];
	setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export const getRandomTagColor = () =>
	TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)];

const TagsList = ({ tags, setTags }: TagsListProps) => {
	const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

	return (
		<Flex wrap="wrap" gap="small">
			{tags.map((tag) => (
				<Tag
					key={tag}
					closable
					onClose={() => removeTag(tag)}
					color={getRandomTagColor()}
					style={{ margin: 0 }}
				>
					{tag}
				</Tag>
			))}
		</Flex>
	);
};

export default TagsList;
