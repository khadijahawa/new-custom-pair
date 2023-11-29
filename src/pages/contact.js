/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/router";
import emailjs from "emailjs-com";
import contactUs2 from "../utils/images/contact.jpeg";
import { useSpring, animated, config } from "react-spring";

function contact() {
  // const router = useRouter();

  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [router.pathname]);

  // const animation = useSpring({
  //   from: { opacity: 0, transform: "translateY(50px) translateX(-50px)" },
  //   to: { opacity: 1, transform: "translateY(0) translateX(0)" },
  //   config: config.molasses
  // });

  function sendEmail(e) {
    emailjs
      .sendForm(
        "service_92cnvis",
        "template_72mvk1o",
        e.target,
        "KSx9aodRZYHIgS4Oy"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <div>
      <div>
        <img
          src={contactUs2}
          alt="Original image"
          className={`d-block w-100  `}
        />
        {/* <Bounce left> */}
        {/* <animated.div style={{ ...animation }}> */}
        <h1>{/* {t("contactUsPage.SubmitQuestions")} */}</h1>
        <h3>{/* {t("contactUsPage.Questions")} */}</h3>
        <h6>{/* {t("contactUsPage.checkServices")} */}</h6>
        {/* </animated.div> */}
        {/* </Bounce> */}
      </div>
      <div className={`text-center `}>
        <div>
          {/* <FontAwesomeIcon icon={faPhone} /> */}
          <p className="fs-4  my-4 py-4"> +90 555 033 34 44</p>
        </div>
        <div>
          {/* <FontAwesomeIcon  /> */}
          <p className="fs-4 my-4 py-4">
            Merkez Mahallesi <br /> Dilruba Çıkmazı Sokak
            <br /> No 16 d 4 <br /> Kagithane <br /> Istanbul
          </p>
        </div>
        <div>
          {/* <FontAwesomeIcon icon={faEnvelope} /> */}
          <p className="fs-4  my-4 py-4">
            deniz@deniznedimoglu.com
            <br />
            abdagrah@gmail.com
          </p>
        </div>
      </div>
      <div>
        <h1 className={`text-center my-4 py-4 `}>
          {/* {t("contactUsPage.header")} */}
        </h1>
        <Form className={`text-center my-4 py-4 `} onFinish={sendEmail}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter Your Name" />
          </Form.Item>
          {/* <Form.Item
            name="Phone"
            rules={[
              { required: true, message: "Please enter your Phone Number" }
            ]}
          >
            <Input type="Phone" placeholder="Phone Number" />
          </Form.Item> */}
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="Enter Your Email" />
          </Form.Item>
          <Form.Item name="message">
            <Input.TextArea rows={4} placeholder="Enter Your Message" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {/* {t("contactUsPage.SubmitBuuton")} */}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default contact;
