import { Flex } from 'antd';
import { Link } from 'react-router-dom';

const ForgotPasswordSuccess = () => {
   return (
      <Flex
         justify='center'
         align='center'
         gap='large'
         vertical
         style={{
            height: '100vh',
            background: 'linear-gradient(to right, #f0f0f0, #f7e7d6)',
            borderRadius: 10,
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
         }}
      >
         <Flex justify='center' align='center'>
            <h1 style={{ color: '#F47321', fontSize: 24, fontWeight: 500 }}>
               You have received an email to change your password. Check your email
            </h1>
         </Flex>
         <Flex justify='center'>
            <Link to='/login' style={{ color: '#F47321', fontSize: 18, textDecoration: 'none' }}>
               Back to Login
            </Link>
         </Flex>
      </Flex>
   );
};

export default ForgotPasswordSuccess;
