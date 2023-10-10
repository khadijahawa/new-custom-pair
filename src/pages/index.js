import React, { useState } from "react";
import Image from "next/image";
import home1 from "../utils/images/home1.png";
import home2 from "../utils/images/home2.png";
import before from "../utils/images/before-removebg-preview.png";
import after from "../utils/images/after-removebg-preview.png";
import before2 from "../utils/images/before2-removebg-preview.png";
import { Card, Tabs, Col, Row, Divider, Typography } from "antd";
import ShoeSection from "../components/ShoeExpand";
import image1 from "../utils/images/4.png";
import image2 from "../utils/images/5.png";
import image3 from "../utils/images/Treec_-_01-removebg-preview.png";
import team1 from "../utils/images/team1.jpg";
import team2 from "../utils/images/team2.JPG";

import svg1 from "../utils/icons/fit.svg";
import svg2 from "../utils/icons/feel.svg";
import svg3 from "../utils/icons/renew.svg";
import ForBusinessProduct from "../components/ForBusinessProduct";
import { client } from "@/sanity/lib/client";

const { Text } = Typography;

const CenteredTabTitle = ({ title }) => (
  <div className="text-xl lg:text-5xl font-[BRegular] hover:drop-shadow-2xl ">
    {title}
  </div>
);

const contentStyle = {
  maxWidth: "100%",
  width: "100%"
};

const { Meta } = Card;
const { TabPane } = Tabs;

const HomePage = ({ products }) => {
  const [selectedTab, setSelectedTab] = useState("1");

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const getImageForTab = () => {
    if (selectedTab === "1") {
      return (
        <Image
          src={home2}
          alt="home"
          className="w-full h-full max-h-600 max-w-600"
        />
      );
    }
    if (selectedTab === "2") {
      return <Image src={home1} alt="home" />;
    }
    return null;
  };

  return (
    <div className="">
      <div
        className="lg:grid lg:grid-cols-2 my-8"
        style={{
          minHeight: 350,
          maxHeight: 350
        }}
      >
        <div className="flex justify-center items-center">
          <div>{getImageForTab()}</div>
        </div>
        <div className="lg:flex lg:flex-col mt-4 lg:mt-0">
          <Card
            style={{
              border: "none",
              textAlign: "center"
            }}
          >
            <Tabs
              centered
              className="text-2xl lg:text-xl mt-8 pt-8"
              activeKey={selectedTab}
              onChange={handleTabChange}
            >
              <TabPane
                tab={<CenteredTabTitle title="For Business" />}
                key="1"
                className="justify-center items-center"
              >
                <span className=" font-[OBoldItalic]">
                  <br /> and add your logo for a unique touch
                </span>
              </TabPane>
              <TabPane
                tab={<CenteredTabTitle title="Cleaning" />}
                key="2"
                className=""
              >
                <span className=" font-[OBoldItalic]">
                  <br /> Our expert team ensures meticulous cleaning, to their
                  pristine condition.
                </span>
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>
      <h1 className="text-5xl font-[HUltraLight] text-center mt-32 pt-8 ">
        What's Included
      </h1>
      <div className=" mt-16 ">
        <Row className="flex justify-center md:justify-around drop-shadow-2xl text-center font-bold gap-4 md:gap-0">
          <Col xs={18} sm={12} md={6} lg={4}>
            <Card bordered={false} className="max-w-xs mx-auto">
              Sustainable Packaging
            </Card>
          </Col>
          <Col xs={18} sm={12} md={6} lg={4}>
            <Card bordered={false} className="max-w-xs mx-auto">
              High-Quality Printing
            </Card>
          </Col>
          <Col xs={18} sm={12} md={6} lg={4}>
            <Card bordered={false} className="max-w-xs mx-auto">
              End-to-End Experience
            </Card>
          </Col>
          <Col xs={18} sm={12} md={6} lg={4}>
            <Card bordered={false} className="max-w-xs mx-auto">
              Design Consultation
            </Card>
          </Col>
        </Row>
      </div>
      <div className="flex flex-col md:flex-row mt-16">
        <ShoeSection
          imageSrc={image1}
          headerText="Nike"
          backgroundColor="#ececec"
        />
        <ShoeSection
          imageSrc={image2}
          headerText="Adidas"
          backgroundColor="#e1e1e1"
        />
        <ShoeSection
          imageSrc={image3}
          headerText="Custimized"
          backgroundColor="#e1e1e1"
        />
      </div>
      <Row className="flex justify-around my-16 py-12 text-2xl">
        <Col className="">
          <div className="my-16">
            <Image src={svg1} alt="team1" />
            <p className="mt-6 font-[O]">Unleash Creativity</p>
            <span className="font-[OLight]">
              Design Your Signature Sneakers
            </span>
          </div>
          <Divider />
          <div className="my-16">
            <Image src={svg2} alt="team1" />
            <p className="mt-6 font-[O]">Revive Reimagine Renew</p>
            <span className="font-[OLight]">
              Breath New Life into Your Favorite Footwear
            </span>
          </div>
          <Divider />
          <div className="my-16">
            <Image src={svg3} alt="team1" />
            <p className="mt-6 font-[O]">Uniquely Yours</p>
            <span className="font-[OLight]">
              Customized Sneakers That elevate Your Branding Game
            </span>
          </div>
          <Divider />
        </Col>
        <Col>
          <Image src={team1} alt="team1" className="rounded-xl " />
        </Col>
      </Row>
      <Row className="flex justify-around my-16 py-12 text-2xl">
        <Col>
          <Image
            src={team2}
            alt="team1"
            className="rounded-xl "
            width={750}
            height={750}
          />
        </Col>
        <Col className="">
          <div className="my-16">
            <Image src={svg1} alt="team1" />
            <p className="mt-6 font-[O]">Unleash Creativity</p>
            <span className="font-[OLight]">
              Design Your Signature Sneakers
            </span>
          </div>
          <Divider />
          <div className="my-16">
            <Image src={svg2} alt="team1" />
            <p className="mt-6 font-[O]">Revive Reimagine Renew</p>
            <span className="font-[OLight]">
              Breath New Life into Your Favorite Footwear
            </span>
          </div>
          <Divider />
          <div className="my-16">
            <Image src={svg3} alt="team1" />
            <p className="mt-6 font-[O]">Uniquely Yours</p>
            <span className="font-[OLight]">
              Customized Sneakers That elevate Your Branding Game
            </span>
          </div>
          <Divider />
        </Col>
      </Row>
      <div className="my-10 flex justify-center">
        <iframe
          className="rounded-2xl"
          width="88%"
          height="415"
          src="https://www.youtube-nocookie.com/embed/XBIZbf8FTLg"
          title="Custom Pair"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {/* <div className="products-heading"> */}
      <h1 className="text-5xl font-[HUltraLight] text-center my-32 pt-8 ">
        Highest Demand
      </h1>
      {/* <p>speaker There are many variations passages</p> */}
      {/* </div> */}

      <div className="products-container my-32">
        {products?.map((product) => (
          <ForBusinessProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products }
  };
};

export default HomePage;
