import { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Typography, Space, Radio, DatePicker, Card, Upload, message, Flex } from 'antd';
import { LockOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons';
import { IRegisterModel } from '../../../interfaces/account/index.ts';
import { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { getBase64 } from '../../../utils/helpers/getBase64.ts';
import { FileType } from '../../../types/FileType.ts';
import { apiClient } from '../../../utils/api/apiClient.ts';
import { IUploadedFile } from '../../../types/IUploadedFile.ts';
import { avatar, reactAmico, lateAtNight } from '../../../utils/images/index.tsx';
import './RegisterPage.css'

const { Link } = Typography;

const validGenders = ['Male', 'Female', 'Other'];

const RegisterPage = () => {
   const [isFieldActive, setIsFieldActive] = useState(false);
   const [previewImage, setPreviewImage] = useState(avatar);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 768);
      };

      handleResize();

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj as FileType);
      }

      setPreviewImage(file.url || (file.preview as string));
   };

   const onFinish = (values: IRegisterModel) => {
      apiClient.post('/api/authentication/register', values, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      }).then(() => {
         message.success("Successfully registered!");
         window.location.href = '/email-confirmation-required';
      }).catch(error => {
         message.error("Registration error!")
         console.log(error);
      });
   };

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      message.error('Помилка реєстрації');
   };

   const handleAvatarChange = async (info: any) => {
      const file = info.fileList[0];
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj as FileType);
      }

      setPreviewImage(file.url || (file.preview as string));
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
                  <Flex justify='center'>
                     {previewImage && (
                        <img
                           src={previewImage}
                           alt="Avatar"
                           style={{ width: '33%' }}
                        />
                     )}
                  </Flex>

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
                        getValueFromEvent={(e: UploadChangeParam) => {
                           const image = e?.fileList[0] as IUploadedFile;
                           return image?.originFileObj;
                        }}
                     >
                        <Upload
                           showUploadList={false}
                           beforeUpload={() => false}
                           defaultFileList={[]}
                           accept="image/*"
                           onChange={handleAvatarChange}
                           onPreview={handlePreview}
                           maxCount={1}
                        >
                           <Button icon={<UploadOutlined />}>UPLOAD IMAGE</Button>
                        </Upload>
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
                                 onMouseEnter={(e) => (e.target as HTMLInputElement).style.borderColor = '#FFA07A'}
                                 onMouseLeave={(e) => (e.target as HTMLInputElement).style.borderColor = isFieldActive ? '#FF6347' : '#FF7F50'}
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
                              <Input placeholder='Enter your last name'
                                 style={{
                                    borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                                 }}
                                 onFocus={() => setIsFieldActive(true)}
                                 onBlur={() => setIsFieldActive(false)}
                                 onMouseEnter={(e) => (e.target as HTMLInputElement).style.borderColor = '#FFA07A'}
                                 onMouseLeave={(e) => (e.target as HTMLInputElement).style.borderColor = isFieldActive ? '#FF6347' : '#FF7F50'}
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
                                 { pattern: /^[^а-яА-Я]*$/, message: 'First name must not contain Cyrillic characters' },
                              ]}
                           >
                              <Input.Password prefix={<LockOutlined />}
                                 style={{
                                    borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                                 }}
                                 onFocus={() => setIsFieldActive(true)}
                                 onBlur={() => setIsFieldActive(false)}
                                 onMouseEnter={(e) => (e.target as HTMLInputElement).style.borderColor = '#FFA07A'}
                                 onMouseLeave={(e) => (e.target as HTMLInputElement).style.borderColor = isFieldActive ? '#FF6347' : '#FF7F50'}
                              />
                           </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                           <Form.Item
                              label="Confirm password"
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
                              <Input.Password prefix={<LockOutlined />}
                                 style={{
                                    borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                                 }}
                                 onFocus={() => setIsFieldActive(true)}
                                 onBlur={() => setIsFieldActive(false)}
                                 onMouseEnter={(e) => (e.target as HTMLInputElement).style.borderColor = '#FFA07A'}
                                 onMouseLeave={(e) => (e.target as HTMLInputElement).style.borderColor = isFieldActive ? '#FF6347' : '#FF7F50'}
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
                           }]}
                     >
                        <DatePicker
                           placeholder='Enter your birth date'
                           style={{
                              borderColor: isFieldActive ? '#FF6347' : '#FF7F50',
                              width: '100%',
                           }}
                           onFocus={() => setIsFieldActive(true)}
                           onBlur={() => setIsFieldActive(false)}
                           onMouseEnter={(e) => (e.target as HTMLElement).parentElement?.parentElement?.querySelector('.ant-picker-input')?.setAttribute('style', `border-color: #FFA07A`)}
                           onMouseLeave={(e) => (e.target as HTMLElement).parentElement?.parentElement?.querySelector('.ant-picker-input')?.setAttribute('style', `border-color: ${isFieldActive ? '#FF6347' : '#FF7F50'}`)}
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
                  <Link href="/authentication/login" style={{ color: '#FF7F50', textDecoration: 'none' }}>Already have an account? <span style={{ color: '#FF6347' }}>Sign in</span></Link>
               </Card>
            </Space>
         </Col>
      </Row>
   );
}

export default RegisterPage;
