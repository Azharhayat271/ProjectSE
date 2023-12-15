import React, { useRef } from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import moment from "moment";
import html2pdf from "html2pdf.js";
import UET from "/uet.png";
import Topbar from "./topbar";


const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const pdfContentRef = useRef();

  const calculateAge = (date) => {
    if (date) {
      const birthDate = moment(date);
      const today = moment();
      const calculatedAge = today.diff(birthDate, "years");

      form.setFieldsValue({ age: calculatedAge });
    }
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const onClear = () => {
    form.resetFields();
  };

  const onPrint = async () => {
    await form.validateFields();
  
    const logoSrc = UET; // Replace with your logo path
  
    const pdfContent = `
      <div class="text-center mb-8">
        <img src="${logoSrc}" alt="Logo" class="w-16 h-16 mr-2"/> 
        <h1 class="text-green-500 font-bold text-3xl">UET Lahore Narowal Campus</h1>
      </div>
      <table class="w-full border-collapse mb-8">
        <tr>
          <td class="font-bold pr-4">Name:</td>
          <td>${form.getFieldValue("name")}</td>
        </tr>
        <tr>
          <td class="font-bold pr-4">Father's Name:</td>
          <td>${form.getFieldValue("fatherName")}</td>
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
    <Topbar/>
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Register Student</h1>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
      <Form.Item
      name="name"
      rules={[{ required: true, message: "Please enter your name" }]}
    >
      <Input placeholder="Name" />
    </Form.Item>

    <Form.Item
      name="fatherName"
      rules={[{ required: true, message: "Please enter your father's name" }]}
    >
      <Input placeholder="Father's Name" />
    </Form.Item>

    <Form.Item
      name="gender"
      rules={[{ required: true, message: "Please select your gender" }]}
    >
      <Select placeholder="Select gender">
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="dob"
      rules={[{ required: true, message: "Please select your date of birth" }]}
    >
      <DatePicker onChange={(date, dateString) => calculateAge(dateString)} placeholder="Date of Birth" />
    </Form.Item>

    <Form.Item name="age">
    <Input disabled />
  </Form.Item>

    <Form.Item
      name="height"
      rules={[{ required: true, message: "Please enter your height" }]}
    >
      <Input placeholder="Height (cm)" />
    </Form.Item>

    <Form.Item
      name="issuedBy"
      rules={[{ required: true, message: "Please enter the issuer's name" }]}
    >
      <Input placeholder="Issued By" />
    </Form.Item>



        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            Save
          </Button>
          <Button type="default" onClick={onClear} style={{ marginLeft: 8 }}>
            Clear
          </Button>
          <Button type="default" onClick={onPrint} style={{ marginLeft: 8 }}>
            Print
          </Button>
        </Form.Item>
      </Form>
      <div id="pdf-content" ref={pdfContentRef} style={{ display: "none" }}></div>
    </div>
    </>
  );
};

export default Register;
