import { Card, Typography, Collapse } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const StyledCard = styled(Card)`
  border-color: #FF7F50;
  height: 100%;
`;

const HelpPage: React.FC = () => (
	<StyledCard style={{overflow:"auto"}}>
		<Title level={2}>Questions and Help</Title>
		<Paragraph>
			If you have any questions or need assistance, you can find answers to some
			of the most common queries below. If you don't find the answer you're
			looking for, please reach out to our support team.
		</Paragraph>
		<Collapse>
			<Panel header="How do I change my password?" key="2">
				<Paragraph>
					To change your password, go to your profile settings and select the
					"Reset password" option. Enter your new password, then confirm the
					changes.
				</Paragraph>
			</Panel>
			<Panel header="How do I set my account privacy?" key="3">
				<Paragraph>
					To set your account privacy, go to your profile privacy settings. You
					can choose between a "Private" or "Public" profile, depending on who
					can see your posts and information.
				</Paragraph>
			</Panel>
			<Panel header="How do I change my email address?" key="4">
				<Paragraph>
					To update your email address, navigate to your account settings and
					select the "Change email" option. Enter your new email address and
					confirm the changes by following the instructions sent to your current
					email.
				</Paragraph>
			</Panel>
			<Panel
				header="How do I recover my account if I forget my password?"
				key="6"
			>
				<Paragraph>
					To recover your account, click the "Forgot Password?" link on the
					login page. Enter your registered email address, and follow the
					instructions sent to your email to reset your password.
				</Paragraph>
			</Panel>
			<Panel header="How do I change my username?" key="7">
				<Paragraph>
					To change your username, go to your profile page and click on the
					"Edit profile" button. Enter your new username and save the changes.
				</Paragraph>
			</Panel>
		</Collapse>
	</StyledCard>
);

export default HelpPage;
