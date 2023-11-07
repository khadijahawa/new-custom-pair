/* eslint-disable react/no-unknown-property */

import React, { useState, useEffect } from "react";
import { Upload, Button, Slider, Radio, Modal, Col, Row, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Treec from "./Svg";
import html2canvas from "html2canvas";
import { SketchPicker } from "react-color";

import Image from "next/image";
// import Stripe from "stripe";

const CustomCustomization = () => {
  const [logoImage, setLogoImage] = useState(null);
  const [logoPopupVisible, setLogoPopupVisible] = useState(false);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [placement, setPlacement] = useState("left");
  const [verticalPosition, setVerticalPosition] = useState(0);
  const [horizontalPosition, setHorizontalPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const defaultColors = {
    front: "",
    inner: "",
    back: "",
    stripe: "",
    backTop: "",
    tongue: ""
  };

  const [frontColor, setFrontColor] = useState(defaultColors.front);
  const [innerColor, setInnerColor] = useState(defaultColors.inner);
  const [backColor, setBackColor] = useState(defaultColors.back);
  const [stripeColor, setStripeColor] = useState(defaultColors.stripe);
  const [backTopColor, setBackTopColor] = useState(defaultColors.backTop);
  const [tongueColor, setTongueColor] = useState(defaultColors.tongue);

  const [removingBackground, setRemovingBackground] = useState(false);
  const [selectedPart, setSelectedPart] = useState("heel");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSC = async () => {
    const whatWeWant = document.getElementById("modal-container");
    const finalImage = await html2canvas(whatWeWant);
    const dataUrl = finalImage.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "screenshot.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const partNames = ["Front", "Inner", "Back", "Stripe", "Back Top", "Tongue"];

  const resetPartColor = (partName) => {
    switch (partName) {
      case "Front":
        setFrontColor(defaultColors.front);
        break;
      case "Inner":
        setInnerColor(defaultColors.inner);
        break;
      case "Back":
        setBackColor(defaultColors.back);
        break;
      case "Stripe":
        setStripeColor(defaultColors.stripe);
        break;
      case "Back Top":
        setBackTopColor(defaultColors.backTop);
        break;
      case "Tongue":
        setTongueColor(defaultColors.tongue);
        break;
      default:
        break;
    }
  };

  const handleColorChange = (color) => {
    switch (selectedPart) {
      case "Front":
        setFrontColor(color);
        break;
      case "Inner":
        setInnerColor(color);
        break;
      case "Back":
        setBackColor(color);
        break;
      case "Stripe":
        setStripeColor(color);
        break;
      case "Back Top":
        setBackTopColor(color);
        break;
      case "Tongue":
        setTongueColor(color);
        break;
      default:
        break;
    }
  };
  const handleImageUpload = (file) => {
    setLogoImage(URL.createObjectURL(file));
  };

  const handleSaveChanges = () => {
    setLogoPopupVisible(false);
  };

  const handleRemoveBG = () => {
    if (!logoImage) {
      alert("Please upload a logo image first.");
      return;
    }
    const apiKey = "fapmLaZmKdaWGCfj9PF4eY6L";
    const url = "https://api.remove.bg/v1.0/removebg";

    fetch(logoImage)
      .then((response) => response.blob())
      .then((blob) => {
        const formData = new FormData();
        formData.append("image_file", blob, logoImage.name);
        formData.append("size", "auto");

        fetch(url, {
          method: "POST",
          headers: { "X-Api-Key": apiKey },
          body: formData
        })
          .then((res) =>
            res
              .blob()
              .then((resultBlob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setLogoImage(reader.result);
                  setRemovingBackground(false);
                };
                reader.readAsDataURL(resultBlob);
              })
              .catch((error) => console.error(error))
          )
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2 className="mt-6">Total Custom </h2>
      <Button
        icon={<UploadOutlined />}
        onClick={() => setLogoPopupVisible(true)}
        className="my-4 rounded border-zinc-300	rounded-3xl	hover:#0d9488 focus:outline-none focus:ring focus:ring-mgreen font-[BSemiBold] border-mgreen-500/75"
        type="secundray"
      >
        Upload Logo And Customize It
      </Button>

      <Modal
        title="Customize Logo"
        open={logoPopupVisible}
        centered
        onCancel={() => setLogoPopupVisible(false)}
        footer={[
          <Button key="save" type="primary" onClick={handleSC}>
            Save
          </Button>
        ]}
        className="flex"
        mask="true"
        width={1300}
      >
        <Row gutter={{ xs: 8, sm: 20, md: 36, lg: 40 }}>
          <Col>
            <div className="relative max-w-[500px] mx-2">
              <Upload
                accept="image/*"
                customRequest={({ file }) => handleImageUpload(file)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} className="my-4">
                  Upload Logo And Customize It
                </Button>
              </Upload>
              <div className="my-2">
                <label>
                  Remove Background: <br />
                </label>
                <Switch onChange={handleRemoveBG} autoFocus className="my-2" />
              </div>
              <div className="mx-1" id="modal-container">
                <Treec
                  frontColor={frontColor}
                  innerColor={innerColor}
                  backColor={backColor}
                  stripeColor={stripeColor}
                  backTopColor={backTopColor}
                  tongueColor={tongueColor}
                />
                {logoImage && (
                  <img
                    src={logoImage}
                    alt="Custom Logo"
                    style={{
                      position: "absolute",
                      width: `${width}%`,
                      height: `${height}%`,
                      transform: `rotate(${rotation}deg)`,
                      float: placement,
                      maxWidth: "100%",
                      top: `${verticalPosition}px`,
                      left: `${horizontalPosition}px`
                    }}
                  />
                )}
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <label>Select A Part: &nbsp; &nbsp;</label>
              <Radio.Group
                value={selectedPart}
                onChange={(e) => setSelectedPart(e.target.value)}
              >
                {partNames.map((partName) => (
                  <Radio.Button key={partName} value={partName}>
                    {partName.charAt(0).toUpperCase() + partName.slice(1)}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
            <Row gutter={{ xs: 12, sm: 28, md: 38, lg: 48 }} className="my-4">
              <Col className="mx-2">
                <label>
                  Pick A Color:
                  <br />
                </label>

                <SketchPicker
                  color={
                    selectedPart === "Front"
                      ? frontColor
                      : selectedPart === "Inner"
                      ? innerColor
                      : selectedPart === "Back"
                      ? backColor
                      : selectedPart === "Stripe"
                      ? stripeColor
                      : selectedPart === "Back Top"
                      ? backTopColor
                      : selectedPart === "Tongue"
                      ? tongueColor
                      : ""
                  }
                  onChangeComplete={(color) => handleColorChange(color.hex)}
                />
              </Col>
              <Col className="mx-2">
                <label>
                  Reset Color: <br />
                </label>
                {partNames.map((partName) => (
                  <Button
                    key={partName}
                    type="default"
                    onClick={() => resetPartColor(partName)}
                    className="mx-1 my-3 flex"
                  >
                    Reset {partName.charAt(0).toUpperCase() + partName.slice(1)}
                  </Button>
                ))}
              </Col>
            </Row>
            <label>Customize Your Logo:</label>
            <div className="my-2">
              <label>Width:</label>
              <Slider
                value={width}
                onChange={(value) => setWidth(value)}
                min={5}
                max={200}
              />
            </div>
            <div>
              <label>Height:</label>
              <Slider
                value={height}
                onChange={(value) => setHeight(value)}
                min={5}
                max={200}
              />
            </div>
            <div>
              <label>Rotation:</label>
              <Slider
                value={rotation}
                onChange={(value) => setRotation(value)}
                min={0}
                max={360}
              />
            </div>

            <div>
              <label>Vertical Position:</label>
              <Slider
                value={verticalPosition}
                onChange={(value) => setVerticalPosition(value)}
                min={isMobile ? -50 : -150}
                max={isMobile ? 300 : 450}
              />
            </div>
            <div>
              <label>Horizontal Position:</label>
              <Slider
                value={horizontalPosition}
                onChange={(value) => setHorizontalPosition(value)}
                min={isMobile ? -50 : -150}
                max={isMobile ? 300 : 450}
              />
            </div>
            <div>
              <label>
                Placement On The Shoes
                <br />
              </label>
              <Radio.Group
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="my-2"
              >
                <Radio.Button value="left">The Inner Side Of The </Radio.Button>
                <Radio.Button value="right">The Outter Side</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default CustomCustomization;
