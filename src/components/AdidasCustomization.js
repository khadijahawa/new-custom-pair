import React, { useState } from "react";
import { Upload, Button, Slider, Radio, Modal, Col, Row, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import adidas1 from "../utils/images/stan-heel.jpeg";
import Image from "next/image";

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
                  // Set the processed image URL to logoImage state
                  setLogoImage(reader.result);
                  setRemovingBackground(false); // Clear the background removal flag
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
        Upload Logo And Customize It{" "}
      </Button>

      <Modal
        title="Customize Logo"
        visible={logoPopupVisible}
        centered
        onCancel={() => setLogoPopupVisible(false)}
        footer={[
          <Button key="save" type="primary" onClick={handleSaveChanges}>
            Save
          </Button>
        ]}
        className="flex"
        mask="true"
        width={1000}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col>
            <div>
              <div className="relative max-w-[400px]">
                <Upload
                  accept="image/*"
                  customRequest={({ file }) => handleImageUpload(file)}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />} className="my-4">
                    Upload Logo
                  </Button>
                </Upload>
                <Image
                  src={adidas1}
                  alt="Adidas Shoes"
                  width={400}
                  height={300}
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
                      left: `${horizontalPosition}px`,
                      filter: `hue-rotate(${hueRotation}turn)`
                    }}
                  />
                )}
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
                min={-150}
                max={150}
              />
            </div>
            <div>
              <label>Horizontal Position:</label>
              <Slider
                value={horizontalPosition}
                onChange={(value) => setHorizontalPosition(value)}
                min={-150}
                max={150}
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
