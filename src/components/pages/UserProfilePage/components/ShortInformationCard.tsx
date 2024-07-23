import { Card, Flex, Space } from "antd";
import { house, pronouns } from "../../../../utils/images";
import type { IUserProfile } from "../types";
import * as styles from "../styles";

type ShortInformationCardProps = {
	userProfile: IUserProfile | null;
};

const ShortInformationCard = ({ userProfile }: ShortInformationCardProps) => {
	return (
		<Card title="Short information" style={styles.menuItemCard}>
			<Flex vertical justify="center">
				{userProfile?.biography && (
					<p style={{ margin: 0 }}>{userProfile.biography}</p>
				)}

				{(userProfile?.country || userProfile?.region) && (
					<Space align="center" size="small">
						<img
							src={house}
							alt="House icon"
							style={styles.shortInformationImg}
						/>
						<p style={{ margin: 0 }}>
							{`${userProfile.country} ${userProfile.region}`}
						</p>
					</Space>
				)}

				{userProfile?.pronouns && (
					<Space align="center" size="small">
						<img
							src={pronouns}
							alt="Pronouns icon (circles)"
							style={styles.shortInformationImg}
						/>
						<p style={{ margin: 0 }}>{userProfile.pronouns}</p>
					</Space>
				)}
			</Flex>
		</Card>
	);
};

export default ShortInformationCard;
