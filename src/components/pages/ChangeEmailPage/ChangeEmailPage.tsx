import React from 'react';
import { Form, Input, Button, Flex, Card } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import axios from 'axios';

import changeEmail from '../../../assets/change_email.png'

const ChangeEmailPage: React.FC = () => {

    const onFinish = (values: any) => {
        console.log(values);
        values.token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZjI5MDM4NC0wYzBjLTQyMDEtYjc3My01YWQwZmQ4NjhkYmEiLCJzdWIiOiJiYTdjYWRhNS0zZDFiLTQyZDEtODQ1Yy1jODE1YWMwOGU3MTMiLCJnaXZlbl9uYW1lIjoiQXJ0dXIiLCJmYW1pbHlfbmFtZSI6IkRyaXRyb3YiLCJlbWFpbCI6Imt1dHVrb3YxNi4yMDA1QGdtYWlsLmNvbSIsIkVtYWlsQ29uZmlybSI6IlRydWUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJBdmF0YXIiOiIiLCJleHAiOjE3MTQ0OTc2OTgsImlzcyI6IkZhY2Vib29rLnJ2Lm9yZyIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.c2ntjnO2wrvqr2wH7CqGCCYRCMtMqrzmyx2ZmeZPMbs"
        values.userId ="ba7cada5-3d1b-42d1-845c-c815ac08e713"
        axios.post('http://localhost:5181/api/Authentication/change-email', values)
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
                <img src={changeEmail} alt="forgotPasswordImage" className='auth-pages-img' />
            </div>
            <Card style={{ width: '400px' }}>
                <h3 style={{ fontSize: 32 }}>Email change</h3>
                <p style={{ fontSize: 18 }}>
                    Change the email address for your
                    Quilt account
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
                            Change my email address
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Flex justify='center'>
                            <Link to='/' style={{ color: '#FF6347' }}>
                                Back to Main page
                            </Link>
                        </Flex>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
};

export default ChangeEmailPage;
