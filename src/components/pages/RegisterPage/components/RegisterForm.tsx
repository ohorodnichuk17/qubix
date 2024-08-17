import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Radio, DatePicker, message, Spin } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { IRegisterModel } from '../../../../interfaces/account/index.ts';
import { apiClient } from '../../../../utils/api/apiClient.ts';
import AvatarPreview from './AvatarPreview';
import { avatar } from '../../../../utils/images/index.tsx';

const validGenders = ['Male', 'Female', 'Other'];

const RegisterForm: React.FC = () => {
   const [isFieldActive, setIsFieldActive] = useState(false);
   const [previewImage, setPreviewImage] = useState(avatar);
   const [loading, setLoading] = useState(false);

   const [selectedFile, setSelectedFile] = useState<File | null>(null);

   const onFinish = (values: IRegisterModel) => {
      const formData = new FormData();

      (Object.keys(values) as Array<keyof IRegisterModel>).forEach(key => {
         formData.append(key, values[key] as string);
      });

      if (selectedFile) {
         formData.append('avatar', selectedFile);
      }

      setLoading(true);
      apiClient.post('/api/authentication/register', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      }).then(() => {
         message.success("Successfully registered!");
         window.location.href = '/email-confirmation-required';
      }).catch(error => {
         message.error("Registration error!");
         console.log(error);
      }).finally(() => {
         setLoading(false);
      });
   };


   const handleImageChange = (image: string, file: File | null) => {
      setPreviewImage(image);
      setSelectedFile(file);
   };

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      message.error('Registration error');
   };



   return (
      <Spin spinning={loading} tip="Registration in progress..." size="large">
         <Form
            name="register"
            layout='vertical'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
         >
            <Form.Item
               name="avatar"
               valuePropName="image"
            >
               <AvatarPreview initialImage={previewImage} onImageChange={handleImageChange} />
            </Form.Item>

            <Row gutter={[16, 16]}>
               <Col xs={24} sm={12}>
                  <Form.Item
                     label="First Name"
                     name="firstName"
                     rules={[
                        { required: true, message: 'First name must not be empty' },
                        { min: 3, message: 'First name must be at least 3 characters long' },
                        { max: 50, message: 'First name must be less than 50 characters long' },
                        { pattern: /^[A-Za-z\s]+$/, message: 'First name must contain only letters and spaces' },
                        { pattern: /^[^£#“”]*$/, message: 'First name must not contain the following characters: £ # “”' },
                     ]}
                  >
                     <Input
                        placeholder='Enter your first name'
                        style={{
                           borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                        }}
                        onFocus={() => setIsFieldActive(true)}
                        onBlur={() => setIsFieldActive(false)}
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} sm={12}>
                  <Form.Item
                     label="Last Name"
                     name="lastName"
                     rules={[
                        { required: true, message: 'Last name must not be empty' },
                        { min: 3, message: 'Last name must be at least 3 characters long' },
                        { max: 50, message: 'Last name must be less than 50 characters long' },
                        { pattern: /^[A-Za-z\s]+$/, message: 'Last name must contain only letters and spaces' },
                        { pattern: /^[^£#“”]*$/, message: 'Last name must not contain the following characters: £ # “”' },
                     ]}
                  >
                     <Input
                        placeholder='Enter your last name'
                        style={{
                           borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                        }}
                        onFocus={() => setIsFieldActive(true)}
                        onBlur={() => setIsFieldActive(false)}
                     />
                  </Form.Item>
               </Col>
            </Row>

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
               <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter your Email"
                  style={{
                     borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                  }}
                  onFocus={() => setIsFieldActive(true)}
                  onBlur={() => setIsFieldActive(false)}
               />
            </Form.Item>

            <Row gutter={[16, 16]}>
               <Col xs={24} sm={12}>
                  <Form.Item
                     label="Password"
                     name="password"
                     rules={[
                        { required: true, message: 'Password must not be empty' },
                        { min: 8, message: 'Password must be at least 8 characters long' },
                        { max: 24, message: 'Password must be less than 24 characters long' },
                        { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
                        { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
                        { pattern: /\d/, message: 'Password must contain at least one digit' },
                        { pattern: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, message: 'Password must contain at least one special character' },
                        { pattern: /^[^£#“”]*$/, message: 'Password must not contain the following characters: £ # “”' },
                        { pattern: /^[^а-яА-Я]*$/, message: 'Password must not contain Cyrillic characters' },
                     ]}
                  >
                     <Input.Password
                        prefix={<LockOutlined />}
                        style={{
                           borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                        }}
                        onFocus={() => setIsFieldActive(true)}
                        onBlur={() => setIsFieldActive(false)}
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} sm={12}>
                  <Form.Item
                     label="Confirm Password"
                     name="confirmPassword"
                     dependencies={['password']}
                     rules={[
                        { required: true, message: 'Please confirm your password' },
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
                     <Input.Password
                        prefix={<LockOutlined />}
                        style={{
                           borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                        }}
                        onFocus={() => setIsFieldActive(true)}
                        onBlur={() => setIsFieldActive(false)}
                     />
                  </Form.Item>
               </Col>
            </Row>

            <Form.Item
               label="Birth Date"
               name="birthday"
               rules={[
                  { required: true, message: 'Birthday must not be empty' },
                  {
                     validator: (_, value) => {
                        const today = new Date();
                        if (value && value > today) {
                           return Promise.reject('Birthday cannot be in the future');
                        }
                        return Promise.resolve();
                     },
                  }
               ]}
            >
               <DatePicker
                  placeholder='Enter your birth date'
                  style={{
                     borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                     width: '100%',
                  }}
                  onFocus={() => setIsFieldActive(true)}
                  onBlur={() => setIsFieldActive(false)}
               />
            </Form.Item>

            <Form.Item
               label="Gender"
               name="gender"
               rules={[
                  { required: true, message: 'Gender must not be empty' },
                  { type: 'enum', enum: validGenders, message: `Gender must be one of the following: ${validGenders.join(", ")}` },
               ]}
            >
               <Radio.Group>
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                  <Radio value="Other">Other</Radio>
               </Radio.Group>
            </Form.Item>

            <Form.Item>
               <Button htmlType="submit" style={{ width: '100%' }}>
                  Register
               </Button>
            </Form.Item>
         </Form>
      </Spin>
   );
};

export default RegisterForm;
