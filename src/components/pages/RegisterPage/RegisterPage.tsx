import { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Typography, Space, Select, DatePicker, Card, message, Upload } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { apiClient } from '../../../utils/api/apiClient.ts';
import { reactAmico, lateAtNight } from '../../../utils/images/index.tsx';
import './RegisterPage.css';

const { Link } = Typography;
const { Option } = Select;

const roles = ['User', 'Admin'];

const RegisterPage = () => {
   const [isFieldActive, setIsFieldActive] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 768);
      };

      handleResize();

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const onFinish = async (values: any) => {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('confirmPassword', values.confirmPassword);
      formData.append('birthday', values.birthday.toISOString());
      formData.append('gender', values.gender);
      formData.append('role', values.role);

      if (values.avatar && values.avatar.fileList.length > 0) {
         formData.append('avatar', values.avatar.fileList[0].originFileObj);
      }

      try {
         await apiClient.post('/api/authentication/register', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });
         message.success("Successfully registered!");
      } catch (error) {
         message.error("Registration error!");
         console.log(error);
      }
   };

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      message.error('Registration error');
   };

   return (
      <Row justify="center" align="middle" className="register-page">
         {!isMobile && (
            <>
               <img
                  src={reactAmico}
                  alt="React Amico"
                  style={{
                     position: 'absolute',
                     bottom: 0,
                     left: 0,
                     width: '25%',
                     zIndex: 1
                  }}
               />
               <img
                  src={lateAtNight}
                  alt="Late at Night"
                  style={{
                     position: 'absolute',
                     top: '10%',
                     right: 0,
                     width: '25%',
                     zIndex: 1
                  }}
               />
            </>
         )}
         <Col xs={24} sm={20} md={16} lg={14} xl={12}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
               <Card>
                  <Form
                     name="register"
                     layout='vertical'
                     initialValues={{ remember: true }}
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
                     requiredMark={false}
                  >
                     <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                     >
                        <Input placeholder="Enter your First Name" />
                     </Form.Item>

                     <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                     >
                        <Input placeholder="Enter your Last Name" />
                     </Form.Item>

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
                        <Input prefix={<MailOutlined />} placeholder="Enter your Email"
                           style={{
                              borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                           }}
                           onFocus={() => setIsFieldActive(true)}
                           onBlur={() => setIsFieldActive(false)}
                           onMouseEnter={(e) => (e.target as HTMLInputElement).style.borderColor = '#FFA07A'}
                           onMouseLeave={(e) => (e.target as HTMLInputElement).style.borderColor = isFieldActive ? '#FF6347' : '#FF7F50'}
                        />
                     </Form.Item>

                     <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                     >
                        <Input.Password prefix={<LockOutlined />} placeholder="Enter your Password" />
                     </Form.Item>

                     <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please confirm your password!' }]}
                     >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm your Password" />
                     </Form.Item>

                     <Form.Item
                        label="Date of Birth"
                        name="birthday"
                        rules={[{ required: true, message: 'Please select your date of birth!' }]}
                     >
                        <DatePicker placeholder="Select your Date of Birth" style={{ width: '100%' }} />
                     </Form.Item>

                     <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                     >
                        <Select placeholder="Select your Gender">
                           <Option value="Male">Male</Option>
                           <Option value="Female">Female</Option>
                           <Option value="Other">Other</Option>
                        </Select>
                     </Form.Item>

                     <Form.Item
                        label="Avatar"
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e.fileList}
                     >
                        <Upload
                           accept="image/*"
                           beforeUpload={() => false}
                        >
                           <Button>Upload Avatar</Button>
                        </Upload>
                     </Form.Item>

                     <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select a role' }]}
                     >
                        <Select placeholder="Select a role">
                           {roles.map(role => (
                              <Option key={role} value={role}>{role}</Option>
                           ))}
                        </Select>
                     </Form.Item>

                     <Form.Item>
                        <Button htmlType="submit" style={{ width: '100%' }}>
                           Register
                        </Button>
                     </Form.Item>
                  </Form>
                  <Link href="/authentication/login" style={{ color: '#FF7F50', textDecoration: 'none' }}>
                     Already have an account? <span style={{ color: '#FF6347' }}>Sign in</span>
                  </Link>
               </Card>
            </Space>
         </Col>
      </Row>
   );
}

export default RegisterPage;
