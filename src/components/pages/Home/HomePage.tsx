import { Layout } from 'antd';
import SideBar from '../../containers/SideBar';
import StoryForm from './components/StoryForm';
import PostForm from './components/PostForm';
import './HomePage.css';
import CreatePostButton from '../../post/CreatePostButton';

const { Content } = Layout;

export const HomePage = () => {
   return (
      <Layout>
         <SideBar />
         <Layout style={{ marginLeft: 250 }}>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
               <div className="homepage-container">
                  <CreatePostButton/>
                  <StoryForm />
                  <PostForm />
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};

export default HomePage;
