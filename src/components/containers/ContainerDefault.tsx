import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import HeaderDefault from "./HeaderDefault";

const ContainerDefault = () => {
   return (
      <Layout style={{ height: '100vh' }}>
         <HeaderDefault />
         <Content style={{ padding: '0 48px' }}>
            <Layout style={{ padding: '24px 0' }}>
               <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  <Outlet />
               </Content>
            </Layout>
         </Content>
         
         <Footer style={{ textAlign: 'center', position: 'fixed', bottom: "0", right: "0", left: "0", backgroundColor: '#f0f2f5', color: '#000', borderTop: '1px solid #e8e8e8' }}>
            Diploma Work "Quilt" ©2024 Crafted with ❤ by Quilt team
         </Footer>

      </Layout>
   );
}

export default ContainerDefault;