import React, { useState, useEffect } from "react";
import { Table, Space, Image } from "antd";
import TopBar from "./topbar";
import { Link } from "react-router-dom";

const UserTable = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getAllUsers");
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error during data fetching:", error);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text) => (
        <Image
          src={`http://localhost:5000/api/getImage/${text}`}
          alt="User"
          width={50}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Father's Name",
      dataIndex: "fatherName",
      key: "fatherName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/user/${record._id}`}>View Details</Link>
      ),
    },
  ];

  return (
    <>
      <TopBar />
      <div className="flex mt-8">
        <div className="container">
          <h1 className="text-3xl font-semibold mb-4">Registered Student</h1>
        </div>
      </div>

      <Table
        dataSource={userData}
        columns={columns}
        rowKey="_id"
        align="center"
      />
    </>
  );
};

export default UserTable;
