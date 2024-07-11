import { Layout } from 'antd';
import { plus, photoImg } from '../../../utils/images/index';
import './HomePage.css';
import SideBar from '../../containers/SideBar';

const { Content } = Layout;

export const HomePage = () => {
   return (
      <Layout>
         <SideBar />
         <Layout style={{ marginLeft: 250 }}>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
               <div>

               </div>
            </Content>
         </Layout>
      </Layout>
   );
};

export default HomePage;
