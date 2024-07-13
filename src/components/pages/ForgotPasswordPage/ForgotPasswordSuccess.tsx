import { Flex } from "antd";
import { Link } from "react-router-dom";

const ForgotPasswordSuccess=()=>{
    return(
        <Flex justify='center' align='center' gap='large' vertical style={{ height: '100%' }}>
            <Flex justify='center' align='center'>
                <h1>You have received an email to change your password. Check your email</h1>
            </Flex>
            <Flex justify='center'>
                <Link to='/login' style={{ color: '#FF6347' }}>
                    Back to Login
                </Link>
            </Flex>
        </Flex>
    );
}

export default ForgotPasswordSuccess;