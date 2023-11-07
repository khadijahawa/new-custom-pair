import React, { useState, useEffect } from "react";
import { Upload, Button, Slider, Radio, Modal, Col, Row, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Adidas from "../utils/svgs/stan-heel.svg";
import Image from "next/image";
import html2canvas from "html2canvas";

const AdidasCustomization = () => {
  const [logoImage, setLogoImage] = useState(null);
  const [logoPopupVisible, setLogoPopupVisible] = useState(false);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [placement, setPlacement] = useState("left");
  const [verticalPosition, setVerticalPosition] = useState(0);
  const [horizontalPosition, setHorizontalPosition] = useState(0);
  const [hueRotation, setHueRotation] = useState(0);
  const [removingBackground, setRemovingBackground] = useState(false);
  const [screenshotURL, setScreenshotURL] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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
      <h2 className="mt-6">Adidas Customization</h2>
      <Button
        icon={<UploadOutlined />}
        onClick={() => setLogoPopupVisible(true)}
        className="my-4 rounded border-zinc-300	rounded-3xl	hover:#0d9488 focus:outline-none focus:ring focus:ring-mgreen font-[BSemiBold] border-mgreen-500/75"
        type="secundray"
      >
        Upload Logo And Customize It
      </Button>

      <Modal
        title="Customize Your Adidas Shoes"
        visible={logoPopupVisible}
        centered
        onCancel={() => setLogoPopupVisible(false)}
        footer={[
          <Button key="save" type="primary" onClick={handleSC}>
            Save
          </Button>
        ]}
        className="flex"
        mask="true"
        width={1000}
        // height={750}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col>
            <div>
              <Upload
                accept="image/*"
                customRequest={({ file }) => handleImageUpload(file)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} className="my-4">
                  Upload Logo And Customize It
                </Button>
              </Upload>
              <div>
                <Button key="save" type="primary" onClick={handleSC}>
                  Save
                </Button>

                <div id="modal-container">
                  <Adidas className="treecSvg" />
                  {logoImage && (
                    <Image
                      src={logoImage}
                      width={100}
                      height={100}
                      style={{
                        width: `${width}%`,
                        height: `${height}%`,
                        position: "absolute",
                        transform: `rotate(${rotation}deg)`,
                        top: `${verticalPosition}px`,
                        left: `${horizontalPosition}px`,
                        zIndex: 2
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <label>Width:</label>
              <Slider
                value={width}
                onChange={(value) => setWidth(value)}
                min={10}
                max={200}
              />
            </div>
            <div>
              <label>Height:</label>
              <Slider
                value={height}
                onChange={(value) => setHeight(value)}
                min={10}
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
                max={isMobile ? 300 : 350}
              />
            </div>
            <div>
              <label>Horizontal Position:</label>
              <Slider
                value={horizontalPosition}
                onChange={(value) => setHorizontalPosition(value)}
                min={isMobile ? -50 : -150}
                max={isMobile ? 300 : 350}
              />
            </div>
            <div>
              <label>
                Placement: <br />
                <br />
              </label>
              <Radio.Group
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
              >
                <Radio.Button value="left">The Inner Side</Radio.Button>
                <Radio.Button value="right">The Outter Side</Radio.Button>
              </Radio.Group>
            </div>
            <div className="mt-2">
              <label>
                Remove Background: <br />
              </label>
              <Switch onChange={handleRemoveBG} autoFocus />
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default AdidasCustomization;
