import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import HeaderDefault from "./HeaderDefault";
import './ContainerDefault.css';

const ContainerDefault = () => {
   return (
      <Layout style={{ height: '100vh' }}>
         <HeaderDefault />
         <Content className="content">
            <Layout className="inner-layout">
               <Content className="main-content">
                  <Outlet />
               </Content>
            </Layout>
         </Content>
         <Footer className="footer">
            Diploma Work "Quilt" ©2024 Crafted with ❤ by Quilt team
         </Footer>
      </Layout>
   );
}

export default ContainerDefault;
