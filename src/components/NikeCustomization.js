import React, { useState, useEffect } from "react";
import { Upload, Button, Slider, Radio, Modal, Col, Row, Switch } from "antd";
import { UploadOutlined, SaveOutlined } from "@ant-design/icons";
// import nike from "../utils/images/Untitled design.png";
import { SketchPicker } from "react-color";
import Nikesvg from "../utils/svgs/222.svg";
// import Image from "next/image";
import html2canvas from "html2canvas";

const NikeCustomization = () => {
  const [logoImage, setLogoImage] = useState(null);
  const [logoPopupVisible, setLogoPopupVisible] = useState(false);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [placement, setPlacement] = useState("left");
  const [verticalPosition, setVerticalPosition] = useState(0);
  const [horizontalPosition, setHorizontalPosition] = useState(0);
  const [nikeSwooshColor, setNikeSwooshColor] = useState("#E2E2E2");
  const [removingBackground, setRemovingBackground] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleImageUpload = (file) => {
    setLogoImage(URL.createObjectURL(file));
  };

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
  const handleSaveChanges = () => {
    setLogoPopupVisible(false);
  };
  const handleColorChange = (color) => {
    setNikeSwooshColor(color.hex);
  };

  return (
    <div>
      <h2 className="mt-6">Adidas Customization</h2>
      <Button
        icon={<UploadOutlined />}
        onClick={() => setLogoPopupVisible(true)}
        className="my-4 rounded border-zinc-300	rounded-3xl	hover:#0d9488 focus:outline-none focus:ring focus:ring-mgreen font-[BSemiBold] border-mgreen-500/75"
        type="secundray"
      >
        Upload Logo
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
        className="flex justify-items-center"
        mask="true"
        width={1100}
      >
        <Row gutter={{ xs: 8, sm: 24, md: 42, lg: 48 }}>
          <Col>
            <div className="relative max-w-[500px] ">
              <Upload
                accept="image/*"
                customRequest={({ file }) => handleImageUpload(file)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload Logo</Button>
              </Upload>
              <div className="my-4">
                <label>
                  Remove Background: <br />
                </label>
                <Switch onChange={handleRemoveBG} autoFocus />
              </div>
              <div id="modal-container">
                <div>
                  <Nikesvg
                    width={500}
                    height={500}
                    style={{
                      backgroundColor: `${nikeSwooshColor}`
                    }}
                    className="treecSvg"
                  />
                </div>

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
              <label>
                Change The Woosh Color:
                <br />
              </label>
              <SketchPicker
                color={nikeSwooshColor}
                onChangeComplete={handleColorChange}
                className="mt-4"
              />
            </div>
            <div className="my-3">Customize Your Logo:</div>

            <div>
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
                min={-360}
                max={360}
              />
            </div>

            <div>
              <label>Vertical Position:</label>
              <Slider
                value={verticalPosition}
                onChange={(value) => setVerticalPosition(value)}
                min={isMobile ? -50 : -150}
                max={isMobile ? 300 : 550}
              />
            </div>
            <div>
              <label>Horizontal Position:</label>
              <Slider
                value={horizontalPosition}
                onChange={(value) => setHorizontalPosition(value)}
                min={isMobile ? -50 : -150}
                max={isMobile ? 250 : 550}
              />
            </div>
            <div>
              <label>
                {" "}
                Placement On The Shoes <br />
              </label>
              <Radio.Group
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="my-2"
              >
                <Radio.Button value="left"> The Inside Face</Radio.Button>
                <Radio.Button value="right">The Outside Face</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default NikeCustomization;
