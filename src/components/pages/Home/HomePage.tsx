import { Layout } from 'antd';
import SideBar from '../../containers/SideBar';
import StoryForm from './components/StoryForm';
import PostForm from './components/PostForm';
import './HomePage.css';
import { useAppSelector } from '../../../hooks/redux';

const { Content } = Layout;

export const HomePage = () => {
   const { isLogin } = useAppSelector(state => state.account);

   return (
      <Layout>
         <SideBar />
         <Layout style={{ marginLeft: 250 }}>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
               <div className="homepage-container">
                  {isLogin ? (
                     <>
                        <StoryForm />
                        <PostForm />
                     </>
                  ) : null}
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};

export default HomePage;
