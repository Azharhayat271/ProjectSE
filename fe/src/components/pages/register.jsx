import React, { useRef, useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import moment from "moment";
import html2pdf from "html2pdf.js";
import UET from "/uet.png";
import Topbar from "./topbar";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const pdfContentRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const calculateAge = (date) => {
    if (date) {
      const birthDate = moment(date);
      const today = moment();
      const calculatedAge = today.diff(birthDate, "years");

      form.setFieldsValue({ age: calculatedAge });
    }
  };

  const onFinish = async (values) => {
    try {
      // Create a new FormData object
      const formData = new FormData();
      // Append other form fields to the FormData
      formData.append("name", values.name);
      formData.append("age", values.age);
      formData.append("fatherName", values.fatherName);
      formData.append("gender", values.gender || "");
      formData.append("height", values.height || "");
      formData.append("barcode", values.barcode || "");


      console.log(formData);

      // Append the image file to the FormData
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Send a POST request to the server
      const response = await fetch("http://localhost:5000/api/submitForm", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        form.resetFields();
        message.success("Form submitted successfully");
        navigate("/about");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const onClear = () => {
    form.resetFields();
  };

  const onPrint = async () => {
    await form.validateFields();

    const logoSrc = UET; // Replace with your logo path

    const pdfContent = `
      <div class="text-center mb-8">
        <img src="${logoSrc}" alt="Logo" class="w-20 h-20 mr-2"/> 
        <h1 class="text-green-500 font-bold text-4xl">UET Lahore Narowal Campus</h1>
      </div>
      <table class="w-full border-collapse mb-8">
      <tr>

      <td>
      <img src="${imageFile}" alt="Logo" class="w-20 h-20 mr-2"/> 


      </td>
    </tr>
        <tr>
          <td class="font-bold pr-4">Name:</td>
          <td>${form.getFieldValue("name")}</td>
        </tr>
        <tr>
          <td  scope="col" class="font-bold pr-4">Father's Name:</td>
          <td   scope="col" >${form.getFieldValue("fatherName")}</td>
        </tr>
        <tr>
          <td class="font-bold pr-4">Gender:</td>
          <td>${form.getFieldValue("gender")}</td>
        </tr>
        <tr>
          <td class="font-bold pr-4">Date of Birth:</td>
          <td>${form.getFieldValue("dob")}</td>
        </tr>
        <tr>
          <td class="font-bold pr-4">Height:</td>
          <td>${form.getFieldValue("height")}</td>
        </tr>
        <tr>
          <td class="font-bold pr-4">Issued By:</td>
          <td>${form.getFieldValue("issuedBy")}</td>
        </tr>
        <tr>
          <td class="font-bold pr-4">Age:</td>
          <td>${form.getFieldValue("age")}</td>
        </tr>
      </table>
    `;

    const pdfElement = document.createElement("div");
    pdfElement.innerHTML = pdfContent;

    html2pdf(pdfElement, {
      margin: 10,
      filename: "science_mela_ticket.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  };

  return (
    <>
      <Topbar />
      <div className="flex   mt-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-4 text-center">Student Registeration Form</h1>
          <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    setImageFile(e.file);
                    return [e.file];
                  }}
                  rules={[
                    { required: true, message: "Please upload an image" },
                  ]}
                >
                  <Upload.Dragger
                    name="file"
                    multiple={false}
                    beforeUpload={() => false}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag image file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Col>
              {/* ... existing code ... */}
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                  labelCol={{ span: 24 }} // Set the labelCol to take the full width
                  wrapperCol={{ span: 24 }} // Set the wrapperCol to take the full width
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                label="Father's Name"
                  name="fatherName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your father's name",
                    },
                  ]}
                  labelCol={{ span: 24 }}  // Set the labelCol to take the full width
                  wrapperCol={{ span: 24 }} 
                >
                  <Input placeholder="Father's Name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                 label="Gender"
                  name="gender"
                  rules={[
                    { required: true, message: "Please select your gender" },
                  ]}
                  labelCol={{ span: 24 }}  // Set the labelCol to take the full width
                  wrapperCol={{ span: 24 }} 
                >
                  <Select placeholder="Select gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                label="Height"
                  name="height"
                  rules={[
                    { required: true, message: "Please enter your height" },
                  ]}
                  labelCol={{ span: 24 }}  // Set the labelCol to take the full width
                  wrapperCol={{ span: 24 }}
                >
                  <Input placeholder="Height (cm)" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                label="Date of Birth"
                  name="dob"
                  rules={[
                    {
                      required: true,
                      message: "Please select your date of birth",
                    },
                  ]}
                  labelCol={{ span: 24 }}  // Set the labelCol to take the full width
                  wrapperCol={{ span: 24 }} 
                >
                  <DatePicker
                    onChange={(date, dateString) => calculateAge(dateString)}
                    placeholder="Date of Birth"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                label="Age"
                name="age"
                labelCol={{ span: 24 }}  // Set the labelCol to take the full width
                wrapperCol={{ span: 24 }} >
                  <Input disabled placeholder="Age" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Issued By"
                  name="issuedBy"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the issuer's name",
                    },
                  ]}
                  labelCol={{ span: 24 }}  // Set the labelCol to take the full width
                  wrapperCol={{ span: 24 }} 
                >
                  <Input placeholder="Issued By" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                label="Bar Code"
                name="barcode"
                labelCol={{ span: 24 }}  // Set the labelCol to take the full width
                wrapperCol={{ span: 24 }} >
                  <Input  placeholder="Bar Code" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" danger htmlType="submit">
                Save
              </Button>
              <Button
                type="default"
                onClick={onClear}
                style={{ marginLeft: 8 }}
              >
                Clear
              </Button>
              <Button
                type="default"
                onClick={onPrint}
                style={{ marginLeft: 8 }}
              >
                Print
              </Button>
            </Form.Item>
          </Form>
          <div
            id="pdf-content"
            ref={pdfContentRef}
            style={{ display: "none" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Register;
