import React from "react";
import { Layout, Button, Space } from "antd";
import { MenuOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import UET from "/uet.png";

const { Header } = Layout;

const TopBar = ({ openDrawer }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleUserClick = () => {
    navigate("/users");
  };

  const handleSettingClick = () => {
    navigate("/setting");
  };

  return (
    <Header className="bg-gray-100 p-0 flex items-center px-4">
      <div className="ml-4">
        <img src={UET} alt="logo" className="h-10" />
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-700 ml-4">
          Science Mela UET Narowal
        </h1>
      </div>

      <div className="ml-auto">
        <Space size="large">
          <Link to="/" className="text-black">
            Home
          </Link>
          <Link to="/about" className="text-black">
            About
          </Link>
          <Link to="/register" className="text-black">
            Register
          </Link>
          <Link to="/contact" className="text-black">
            Contact
          </Link>
        </Space>
      </div>
    </Header>
  );
};

export default TopBar;
