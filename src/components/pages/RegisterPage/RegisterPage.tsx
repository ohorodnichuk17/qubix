import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Card, Typography } from 'antd';
import RegisterForm from './components/RegisterForm';
import { reactAmico, lateAtNight } from '../../../utils/images/index.tsx';
import './RegisterPage.css';

const { Link } = Typography;

const RegisterPage: React.FC = () => {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 768);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

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
                  <RegisterForm />
               </Card>
               <Link href="/authentication/login" style={{ color: '#FF7F50', textDecoration: 'none' }}>
                  Already have an account? <span style={{ color: '#FF6347' }}>Sign in</span>
               </Link>
            </Space>
         </Col>
      </Row>
   );
};

export default RegisterPage;
