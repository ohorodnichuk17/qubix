import {
   Button,
   Input,
} from "antd";
import { SearchOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { logo } from "../../../utils/images";

const LoggedOutHeader = () => (
   <>
      <div className="left-section">
         <Input
            className="search-bar"
            placeholder="Search"
            prefix={<SearchOutlined style={{ color: "#000000" }} />}
         />
      </div>
      <div className="center-section">
         <img src={logo} alt="logo" className="header-logo" />
         <div className="header-text">
            <span className="header-text-regular">This is</span>
            <span className="header-text-bold">Qubix</span>
         </div>
      </div>
      <div className="right-section">
         <NavLink to="/login" style={{ color: "#FFFAFA", textDecoration: "none" }}>
            <Button icon={<UserOutlined />} className="gradient-button login">
               Login
            </Button>
         </NavLink>
         <NavLink to="/register" style={{ color: "#FFFAFA", textDecoration: "none" }}>
            <Button icon={<UserAddOutlined />} className="gradient-button register">
               Register
            </Button>
         </NavLink>
      </div>
   </>
);

export default LoggedOutHeader;
