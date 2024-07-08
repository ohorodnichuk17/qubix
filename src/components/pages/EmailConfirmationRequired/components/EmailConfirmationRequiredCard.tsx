import { Button } from "antd";
import styles from "../EmailConfirmationRequired.module.css";

type EmailConfirmationRequiredCardProps = {
	setIsVisibleResendEmailConfirmationForm: React.Dispatch<
		React.SetStateAction<boolean>
	>;
};

const EmailConfirmationRequiredCard = ({
	setIsVisibleResendEmailConfirmationForm,
}: EmailConfirmationRequiredCardProps) => {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div className={styles.icon}>📧</div>
					<h1 className={styles.h1}>Email Confirmation Required</h1>
					<p className={styles.p}>
						Thank you for registering! Please check your email to confirm your
						email address before you can log in.
					</p>
				</div>
			</div>
			<Button
				type="text"
				style={{ color: "#FF6347", width: "fit-content" }}
				onClick={() => setIsVisibleResendEmailConfirmationForm(true)}
			>
				Resend email confirmation
			</Button>
		</>
	);
};

export default EmailConfirmationRequiredCard;
