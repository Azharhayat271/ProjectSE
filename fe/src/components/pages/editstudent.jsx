import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, Row, Col, Image, Form } from "antd";
import TopBar from "./topbar";
import html2pdf from "html2pdf.js";
import QRCode from "qrcode.react";
import UET from "/uet.png";
import Barcode from "react-barcode"; // Import the Barcode component


const UserDetails = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [form] = Form.useForm();
  const [barcodeValue, setBarcodeValue] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/getUser/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error during data fetching:", error);
    }
  };

  const handlePrint = async () => {
    await form.validateFields();

    const logoSrc = UET;

    const pdfContent = `
      <div class="text-center mb-8">
        <img src="${logoSrc}" alt="Logo" class="w-20 h-20 mr-2"/> 
        <h1 class="text-green-500 font-bold text-4xl">UET Lahore Narowal Campus</h1>
      </div>
      <table class="w-full border-collapse mb-8">
        <tr>
          <td>
            <img src=${`http://localhost:5000/api/getImage/${userDetails.imageUrl}`} alt="Logo" class="w-20 h-20 mr-2"/> 
          </td>
        </tr>
        <tr>
          <td class="font-bold pr-4">Name:</td>
          <td>${userDetails.name}</td>
        </tr>
        <tr>
          <td scope="col" class="font-bold pr-4">Father's Name:</td>
          <td scope="col">${userDetails.fatherName}</td>
        </tr>
        <tr>
          <td class="font-bold pr-4">Gender:</td>
          <td>${userDetails.gender}</td>
        </tr>
        <tr>
          <td class="font-bold pr-4">Height:</td>
          <td>${userDetails.height}</td>
        </tr>
        <tr>
          <td class="font-bold pr-4">Age:</td>
          <td>${userDetails.age}</td>
        </tr>
        <tr>
        <td class="font-bold pr-4">Issued By:</td>
        <td>${form.getFieldValue("issuedBy")}</td>
      </tr>
      </table>
    `;

    const pdfElement = document.createElement("div");
    pdfElement.innerHTML = pdfContent;

    const pdfBuffer = await html2pdf(pdfElement, {
      margin: 10,
      filename: `user_${userId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });

    const blob = new Blob([pdfBuffer], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `user_${userId}.pdf`;
    link.click();
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  //handle barcode function

  const handleBarcode = async () => {
  
    
   debugger
    // Generate a unique barcode value using the last four digits of userDetails.bar
    const lastFourDigits = userDetails.barcode.slice(-4);
    const barcodeValue = `BARCODE-${userId}-${lastFourDigits}-${new Date().getTime()}`;
  
    // Set the barcode value in the component's state
    setBarcodeValue(barcodeValue);
  };
  

  return (
    <div>
      <TopBar />
      <h1 className="text-3xl font-semibold mb-4 mt-3 text-center">
        Student Details
      </h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8} xl={6}>
          <div className="text-center">
            <Image
              src={`http://localhost:5000/api/getImage/${userDetails.imageUrl}`}
              alt="User"
              width={150}
            />
            <Row justify="center" className="mt-4">
              <Col>
                <QRCode
                  value={`http://localhost:5000/api/downloadPdf/${userId}`}
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={12} lg={16} xl={18}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div>
                <label>Name:</label>
                <Input value={userDetails.name} readOnly />
              </div>
            </Col>
            <Col span={24}>
              <div>
                <label>Father's Name:</label>
                <Input value={userDetails.fatherName} readOnly />
              </div>
            </Col>
            <Col span={24}>
              <div>
                <label>Gender:</label>
                <Input value={userDetails.gender} readOnly />
              </div>
            </Col>
            <Col span={24}>
              <div>
                <label>Height:</label>
                <Input value={userDetails.height} readOnly />
              </div>
            </Col>
            <Col span={24}>
              <div>
                <label>Age:</label>
                <Input value={userDetails.age} readOnly />
              </div>
            </Col>
            <Col span={24}>
              <div>
                <label>Issued By:</label>
                <Form.Item
                  name="issuedBy"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the issuer's name",
                    },
                  ]}
                >
                  <Input placeholder="Issued By" />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Button type="primary" danger onClick={handlePrint} className="mt-4">
            Print PDF
          </Button>
        </Col>
        <Col>
          <Button type="primary" danger onClick={handleBarcode} className="mt-4">
           Bar Code
          </Button>
        </Col>
      </Row>

      {barcodeValue && (
        <Row justify="center" className="mt-4">
          <Col>
            <Barcode value={barcodeValue} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UserDetails;
