import { Grid, Layout } from "antd";
import SideBar from "../../containers/SideBar/SideBar";
import StoryForm from "./components/StoryForm";
import PostForm from "./components/PostForm";
import "./HomePage.css";
import { useAppSelector } from "../../../hooks/redux";
import PostList from "../../post/list/PostList";
import StoryList from "../Story/list/StoryList";

const { Content } = Layout;

export const HomePage = () => {
   const { isLogin } = useAppSelector((state) => state.account);

   const screens = Grid.useBreakpoint();

   const isScreenSmallerThatMd =
      (screens.xs || screens.sm) &&
      !screens.md &&
      !screens.lg &&
      !screens.xl &&
      !screens.xxl;

   return (
      <Layout>
         <SideBar />
         <Layout style={{ marginLeft: isScreenSmallerThatMd ? 70 : 250 }}>
            <Content
               style={{
                  padding: isScreenSmallerThatMd ? "0 5px" : "0 50px",
               }}
            >
               <div className="homepage-container">
                  {isLogin ? (
                     <>
                        <StoryList />
                        <StoryForm />
                        <PostForm />
                        <PostList />
                     </>
                  ) : null}
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};

export default HomePage;
