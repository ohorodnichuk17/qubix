import React, { useState } from 'react';
import { Form, Input, Button, Flex, Card, message, Spin } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import { setNewPasswordImg } from '../../../utils/images';
import { apiClient } from '../../../utils/api/apiClient';
import type { IResetPassword } from '../../../interfaces/account';

const SetNewPasswordPage: React.FC = () => {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const email = searchParams.get("email");
   const token = searchParams.get("token");

   const [loading, setLoading] = useState<boolean>(false);

   const onFinish = (values: IResetPassword) => {
      if (token === null || token === "" || email === null || email === "") {
         navigate("/");
      } else {
         values.token = token;
         values.email = email;
      }

      setLoading(true);
      apiClient.post('/api/authentication/reset-password', values)
         .then(res => {
            if (res.status === 200) {
               message.success("Success")
                  .then(() => navigate('/login'));
            }
         })
         .catch(() => {
            message.error("Error resetting password. Please try again later.");
         })
         .finally(() => {
            setLoading(false);
         });
   };

   return (
      <Flex justify='center' align='center' wrap='wrap' className='auth-pages-flex'>
         <div>
            <img src={setNewPasswordImg} alt="resetPasswordImage" className='auth-pages-img' />
         </div>
         <Card style={{ width: '400px' }}>
            <h3 style={{ fontSize: 32 }}>Set New Password</h3>
            <p style={{ fontSize: 18 }}>
               You are here to set a new password for your
               account. Please enter your new password below.
            </p>
            <Form onFinish={onFinish} layout='vertical' requiredMark={false}>

               <Form.Item
                  label="Password"
                  name="password"
                  style={{ width: '100%' }}
                  rules={[
                     { required: true, message: 'Password must not be empty' },
                     { min: 8, message: 'Password must be at least 8 characters long' },
                     { max: 24, message: 'Password must be less than 24 characters long' },
                     { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
                     { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
                     { pattern: /\d/, message: 'Password must contain at least one digit' },
                     { pattern: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, message: 'Password must contain at least one special character' },
                     { pattern: /^[^£#“”]*$/, message: 'Password must not contain the following characters: £ # “”' },
                     { pattern: /^[^а-яА-Я]*$/, message: 'First name must not contain Cyrillic characters' },
                  ]}
               >
                  <Input.Password prefix={<LockOutlined />} />
               </Form.Item>

               <Form.Item
                  label="Confirm password"
                  name="confirmPassword"
                  style={{ width: '100%' }}
                  rules={[
                     { required: true, message: 'Password must not be empty' },
                     { min: 8, message: 'Password must be at least 8 characters long' },
                     { max: 24, message: 'Password must be less than 24 characters long' },
                     { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
                     { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
                     { pattern: /\d/, message: 'Password must contain at least one digit' },
                     { pattern: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, message: 'Password must contain at least one special character' },
                     { pattern: /^[^£#“”]*$/, message: 'Password must not contain the following characters: £ # “”' },
                     { pattern: /^[^а-яА-Я]*$/, message: 'First name must not contain Cyrillic characters' },
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                     }),
                  ]}
               >
                  <Input.Password prefix={<LockOutlined />} />
               </Form.Item>

               <Form.Item>
                  <Button
                     htmlType="submit"
                     style={{ color: 'white', width: '100%' }}
                     disabled={loading}
                  >
                     {loading ? <Spin size="small" /> : 'Confirm'}
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

export default SetNewPasswordPage;
