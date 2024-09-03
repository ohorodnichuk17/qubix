import { Grid } from "antd";
import StoryForm from "./components/StoryForm";
import PostForm from "./components/PostForm";
import "./HomePage.css";
import { useAppSelector } from "../../../hooks/redux";
import PostList from "../../post/list/PostList";
import StoryList from "../Story/list/StoryList";
import DummyPosts from "../../post/list/components/DummyPosts";
import { useState } from "react";

export const HomePage = () => {
   const { isLogin } = useAppSelector((state) => state.account);
   const screens = Grid.useBreakpoint();

   const isScreenSmallerThatLg =
      (screens.xs || screens.sm || screens.md) &&
      !screens.lg &&
      !screens.xl &&
      !screens.xxl;

   const [postCount, setPostCount] = useState(0);

   return (
      <div
         className="homepage-container"
         style={{
            padding: isScreenSmallerThatLg ? "20px 5px" : "20px 50px",
         }}
      >
         {isLogin ? (
            <>
               <StoryList />
               <StoryForm />
               <PostForm />
               <PostList setPostCount={setPostCount} />
               {postCount === 0 && <DummyPosts />}
            </>
         ) : <DummyPosts />}
      </div>
   );
};

export default HomePage;
