import React, { useState, useEffect } from "react";
import {
  Upload,
  Button,
  Slider,
  Radio,
  Modal,
  Col,
  Row,
  Switch,
  Input
} from "antd";

import { UploadOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import AdidasImage from "../../utils/svgs/stan-heel.svg";
import Image from "next/image";
import html2canvas from "html2canvas";
import { useAdidasContext } from "../../../context/AdidasContext";

const { TextArea } = Input;

// const saveCustomizationData = (data) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("adidasData", JSON.stringify(data));
//   }
// };

// export const getCustomizationData = () => {
//   if (typeof window !== "undefined") {
//     const data = localStorage.getItem("adidasData");
//     return data ? JSON.parse(data) : null;
//   }
//   return null;
// };

const Adidas = () => {
  const [logoImage, setLogoImage] = useState(null);
  const [logoPopupVisible, setLogoPopupVisible] = useState(false);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [placement, setPlacement] = useState("Outer Face");
  const [verticalPosition, setVerticalPosition] = useState(0);
  const [horizontalPosition, setHorizontalPosition] = useState(0);
  const [removingBackground, setRemovingBackground] = useState(false);
  // const [screenshotURL, setScreenshotURL] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(5);

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

  // const saveCustomizationData = (data) => {
  //   localStorage.setItem("treecData", JSON.stringify(data));
  // };
  const { adidasCustomization, setAdidasCustomization } = useAdidasContext();

  // console.log("adidasCustomization", adidasCustomization);

  const handleSC = async () => {
    const whatWeWant = document.getElementById("modal-container");
    const finalImage = await html2canvas(whatWeWant);
    const screenshotURL = finalImage.toDataURL("image/png");

    setAdidasCustomization({
      ...adidasCustomization,
      orderImage: screenshotURL,
      placement: placement,
      notes: notes
    });

    // const customData = {
    //   screenshot: screenshotURL,
    //   placement
    // };

    // saveCustomizationData(customData);

    setLogoPopupVisible(false);

    // const a = document.createElement("a");
    // a.href = dataUrl;
    // a.download = "screenshot.png";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
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
                  <AdidasImage className="treecSvg" />
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
                Placement Logo On <br />
                <br />
              </label>
              <Radio.Group
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
              >
                <Radio.Button value="Inner">The Inner Side</Radio.Button>
                <Radio.Button value="Outter">The Outter Side</Radio.Button>
              </Radio.Group>
            </div>
            <div className="mt-4">
              <label>
                Remove Background Of Logo <br />
              </label>
              <Switch onChange={handleRemoveBG} autoFocus className="mt-2" />
            </div>
            <TextArea
              placeholder="Additional Notes (Optional)"
              className="mt-2"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Col>
        </Row>
      </Modal>
      <div className="quantity">
        <h3>Quantity:</h3>
        <p className="quantity-desc">
          <span className="minus">
            <MinusOutlined />
          </span>
          <span className="num">quantity</span>
          <span className="plus">
            <PlusOutlined />
          </span>
        </p>
      </div>
    </div>
  );
};

export default Adidas;
