import { Grid, Layout } from "antd";
import SettingsSideBar from "./components/SettingsSideBar";
import { useAppSelector } from "../../../hooks/redux";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export const SettingsPage = () => {
   const screens = Grid.useBreakpoint();

   const { isLogin } = useAppSelector((state) => state.account);

   const isScreenSmallerThatMd =
      (screens.xs || screens.sm) &&
      !screens.md &&
      !screens.lg &&
      !screens.xl &&
      !screens.xxl;

   return (
      <Layout>
         <SettingsSideBar />
         <Layout style={{ marginLeft: isScreenSmallerThatMd ? 70 : 250 }}>
            <Content
               style={{
                  padding: isScreenSmallerThatMd ? "0 5px" : "0 50px",
                  marginTop: 64,
               }}
            >
               <div className="settings-container">
                  {isLogin ? <Outlet /> : null}
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};

export default SettingsPage;
