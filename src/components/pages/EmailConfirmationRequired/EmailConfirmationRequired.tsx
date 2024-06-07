import React from 'react';
import { createRoot } from 'react-dom/client';
import styles from './EmailConfirmationRequired.module.css';

const EmailConfirmationRequired: React.FC = () => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <div className={styles.icon}>📧</div>
            <h1 className={styles.h1}>Email Confirmation Required</h1>
            <p className={styles.p}>Congratulation! You are successfully registered. We have sent a confirmation email. Please check your inbox and follow the instructions to complete the registration process.</p>
         </div>
      </div>
   );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<EmailConfirmationRequired />);

export default EmailConfirmationRequired;
