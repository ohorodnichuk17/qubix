import React from 'react';
import { Form, Input, Button, Flex, Card } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import axios from 'axios';

import forgotPasswordImage from '../../../assets/forgot_password_image.png'

const ForgotPasswordPage: React.FC = () => {

    const onFinish = (values: any) => {
        console.log(values);

        axios.post('http://localhost:5181/api/Authentication/forgot-password', values)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <Flex justify='center' align='center' wrap='wrap' className='auth-pages-flex'>
            <div>
                <img src={forgotPasswordImage} alt="forgotPasswordImage" className='auth-pages-img' />
            </div>
            <Card style={{ width: '400px' }}>
                <h3 style={{fontSize:32}}>Forgot password?</h3>
                <p style={{fontSize:18}}>
                    Enter your email and we’ll send you a link
                    to reset your password.
                </p>
                <Form onFinish={onFinish} layout='vertical' requiredMark={false}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Email must not be empty' },
                            { pattern: /^[^а-яА-Я]*$/, message: 'Email must not contain Cyrillic characters' },
                            { min: 5, message: 'Email must be at least 5 characters long' },
                            { max: 254, message: 'Email must be less than 254 characters long' },
                            { type: 'email', message: 'Invalid email address format' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email address" />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" style={{ color: 'white', width: '100%' }}>
                            Submit
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Flex justify='center'>
                            <Link to='/' style={{ color: '#FF6347' }}>
                                Back to Login
                            </Link>
                        </Flex>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
};

export default ForgotPasswordPage;
