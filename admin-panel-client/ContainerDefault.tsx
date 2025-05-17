import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import './ContainerDefault.css';

const ContainerDefault = () => {
   return (
      <Layout className="container-default">
         <Content className="content">
            <Layout className="inner-layout">
               <Content className="main-content">
                  <Outlet />
               </Content>
            </Layout>
         </Content>
      </Layout>
   );
}

export default ContainerDefault;