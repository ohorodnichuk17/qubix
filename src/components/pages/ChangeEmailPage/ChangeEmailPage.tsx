import React, { useEffect } from 'react';
import { Form, Input, Button, Flex, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../hooks/redux';
import { changeEmail } from '../../../utils/images';
import { apiClient } from '../../../utils/api/apiClient';

const ChangeEmailPage: React.FC = () => {
   const account = useAppSelector(state => state.account);
   useEffect(() => { console.log(account) }, [account]);

   const navigate = useNavigate();

   const onFinish = (values: any) => {
      values.token = account?.token;
      values.userId = account?.user?.id
      console.log(values);
      apiClient.post('/api/authentication/change-email', values)
         .then(res => {
            console.log(res);
            if (res.status === 200) {
               message.success("Success")
                  .then(() => navigate('/'));
            }
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
                  name="email" >
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
