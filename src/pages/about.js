import React from "react";
import ShoeSection from "../components/ShoeExpand";
import image1 from "../utils/images/jo-removebg-preview.png";
import image2 from "../utils/images/poli.png";
import image3 from "../utils/images/6.png";
// import ReactPlayer from "react-player/lazy";
import Faq from "../components/Faq";
import { Card, Col, Row } from "antd";

// import { Card } from "antd";
import Image from "next/image";

const About = () => {
  const { Meta } = Card;
  const faqDataORDERING = [
    {
      question: "What is the purpose of this FAQ?",
      answer: "To provide answers to commonly asked questions."
    },
    {
      question: "How does the ordering process work at Custom Pair?",
      answer:
        "Easy! From our website, select the custom sneaker design you're interested in. During the ordering process, you will be prompted to provide your business information and personal details. Additionally, if you wish to incorporate your company logo into the design, you can upload it to assist our team in creating a customized quote and mockup for your products. After submitting your quote request, you can typically expect a response from our team within 24 hours."
    },
    {
      question:
        "What is the minimum order quantity (MOQ) for Custom Pair products?",
      answer:
        "You can easily find the MOQ for each of our custom sneaker designs on their respective product pages. The MOQs are determined based on the customization options and are essential to ensure efficient production. If the MOQ presents any challenges or if you have specific requirements, please don't hesitate to get in touch with us."
    },
    {
      question:
        "Can I order different sizes for custom sneakers at Custom Pair?",
      answer:
        "Certainly! Our MOQ applies to the total quantity of custom sneakers ordered, but you are free to select different sizes for each pair as long as the overall MOQ requirement is met. This allows you to accommodate the specific needs of your business."
    },
    {
      question:
        "Is it possible to see a product before placing a large order with Custom Pair?",
      answer:
        "Absolutely! We understand the importance of quality assurance. At Custom Pair, we offer our customers the option to purchase a sample of nearly all our custom sneaker products. To request a sample, simply follow the process provided after selecting 'Buy a sample' for the product(s) you're interested in. Once you receive the sample item(s), you'll have the opportunity to physically inspect, test, and feel the product(s) to ensure they meet your standards before placing a larger order."
    }
  ];
  const faqDataPRICING = [
    {
      question:
        "Why do Custom Pair's prices vary within a range and not fixed?",
      answer:
        "At Custom Pair, we offer flexible pricing to accommodate different needs. The final price for a product depends on various factors, including the quantity, the chosen customization technique, and the incorporation of your logo. To get a more precise price for your specific order, we encourage you to request a quote from us."
    },
    {
      question: "Why has the price of a product increased since my last order?",
      answer:
        "The primary reason for any price increase may be attributed to rising raw material costs. As a result, the prices of our products may fluctuate to reflect these changes in the market."
    },
    {
      question:
        "What is Custom Pair's average response time for quote requests?",
      answer:
        "Our goal is to provide you with a timely response. You can typically expect to hear back from us with a proposal within 24 hours after we receive your quote request."
    },
    {
      question:
        "Is it possible to receive discounts for larger order volumes at Custom Pair?",
      answer:
        "Absolutely, we offer competitive pricing options. Our prices are designed to be degressive, meaning that as the quantity of your order increases, the unit price per item decreases. If you're considering placing a larger order or require additional discounts, please don't hesitate to reach out to us. Our team is here to work with you to meet your specific needs."
    }
  ];

  const faqDataCUSTOMIZATION = [
    {
      question:
        "What are the available colour options for Custom Pair's products?",
      answer:
        "You can see all colour options for our products on the product page while designing the item. If you happen to not find the specific colour you're looking for, don't hesitate to reach out to us, and we'll be happy to assist you in finding the right colour for your custom sneakers."
    },
    {
      question:
        "Is it possible to have more than one customization on a product at Custom Pair?",
      answer:
        "The feasibility of multiple customizations on a product depends on the specific product you wish to personalize. In most cases, we offer the flexibility to incorporate several customizations on our products. While designing on the product's page, you'll see all the available customization techniques and positions where your logo can be placed."
    },
    {
      question:
        "Are there any constraints on the logos that can be placed on Custom Pair products?",
      answer:
        "We're highly accommodating when it comes to incorporating logos onto our products. However, if we find that a particular design doesn't align well with the product, we will inform you. The dimensions and the number of colors in your logo may influence the type of customization available. Nevertheless, we always strive to provide you with the most suitable technique based on your logo's characteristics."
    },
    {
      question: "What file format is required for our company logo?",
      answer:
        "At Custom Pair, we accept logo files in .ai, .eps, and .pdf formats. You don't need to vectorize your logo, and you can conveniently remove the background directly while designing, which simplifies the process. In some cases, our team may contact you after your order is placed to request a vectorized logo if it's essential to maintain the quality of the customization."
    },
    {
      question:
        "Can I review e-draft(s) before my order goes into production at Custom Pair?",
      answer:
        "Yes, you have the opportunity to review e-draft(s) before your order moves into production. While designing your company merch sneakers on our website, you can see the e-draft(s) directly. If you've submitted a request, our Production Team will send you the e-draft(s) containing all the essential information about the product(s) and customization(s). You'll be asked to confirm and sign the eproof(s) before the production process begins."
    },
    {
      question:
        "Is it possible to expedite the lead time for production at Custom Pair?",
      answer:
        "The lead time for production can vary based on several factors, including the specific products, customization techniques, and the current season. If you have a strict deadline, we recommend specifying it in your request or contacting us directly for more information on lead times. We'll do our best to accommodate your needs whenever possible."
    }
  ];
  const faqDataPRODUCTS = [
    {
      question: "How can I learn more about Custom Pair's products?",
      answer:
        "To explore our range of products and discover more about Custom Pair, please navigate through our website. We have a wide selection of custom sneakers and customization options available for your consideration."
    },
    {
      question: "Which brands of sneakers do you offer at Custom Pair?",
      answer:
        "At Custom Pair, we offer a selection of renowned brands, including Adidas and Nike, known for their quality and style. Additionally, we provide a unique option for handmade sneakers made in Portugal, ensuring a diverse array of choices for our customers."
    },
    {
      question: "Is Custom Pair a sustainable brand?",
      answer:
        "At Custom Pair, we embrace environmental responsibility. We offer Nike Move To Zero shoe models and Adidas PRIMEGREEN products, both of which prioritize environmental responsibility and circular practices. Additionally, our totally customizable sneakers are produced on-demand, minimizing deadstock waste."
    },
    {
      question: "What is the sizing and fit of Custom Pair's sneakers?",
      answer:
        "The sizing and fit of our sneakers, whether they are from Nike, Adidas, or handmade in Portugal, are true to size. You can confidently choose the size you normally wear when making your selection."
    },
    {
      question: "How long can I expect Custom Pair's products to last?",
      answer:
        "Our sneakers are of high quality, and their longevity largely depends on how well you care for them. With proper maintenance and care, you can enjoy your Custom Pair sneakers for an extended period."
    },
    {
      question:
        "Can I send my existing products to Custom Pair for customization?",
      answer:
        "Generally, no as at Custom Pair we offer a full-service experience, starting with the careful selection of products and then proceeding to branding and customization. In rare cases, we can design your own sneakers. Price should be determined accordingly."
    },
    {
      question:
        "Is it possible to order a product that is not in Custom Pair's catalog?",
      answer:
        "If you have a specific product in mind that you don't see in our catalog, we encourage you to contact us at hello@custompair.dk for more information. We might be currently working on adding that product, and we'll be happy to discuss any product proposals that align with Custom Pair's values and requirements."
    },
    {
      question: "How can I suggest my products or brand to Custom Pair?",
      answer:
        "Our Product Team is always open to considering new products that align with our standards and criteria. If you believe your products meet our quality and values, please reach out to our Product Team at hello@custompair.dk to discuss the possibility of adding them to our catalog. Your suggestions are valuable to us, and we appreciate your interest in collaborating with Custom Pair."
    }
  ];

  const faqDataPAYMENTS = [
    {
      question: "Which payment methods does Custom Pair accept?",
      answer:
        "At Custom Pair, we offer the convenience of two payment methods. You can make payments through bank transfer or by using a credit card. When using a credit card, we accept Visa, Mastercard, American Express, Discover, JCB, Diners Club, China UnionPay, debit cards."
    },
    {
      question: "When is the payment due for different types of orders?",
      answer:
        "For sample orders, payment is required before we can send the samples to you. You have the flexibility to make the payment online at the time of order or choose to pay later via bank transfer. However, for custom orders, we kindly request that you proceed with the payment after our team sends you the quotation. It's essential to note that the production of your custom order will commence once we've received your payment, or have written agreement otherwise."
    },
    {
      question:
        "Is the full payment required immediately for all orders at Custom Pair?",
      answer:
        "Custom Pair's policy is to receive the full payment before initiating the production of your order. This ensures a seamless and efficient process for both parties."
    }
  ];
  const faqDataSHIPPING = [
    {
      question: "How much do shipping costs at Custom Pair?",
      answer:
        "For orders of up to 10 pairs, you can easily view the shipping costs at checkout and pay for them along with your order. However, if your order exceeds 10 pairs, you have the option to request a shipping quote. We will send this quote to you via email once we've secured the best deal from our logistic partner. In this scenario, shipping for orders of 10 or more pairs will be paid after we've obtained the most competitive quote from our supplier."
    },
    {
      question:
        "Can I have my orders shipped to multiple addresses at Custom Pair?",
      answer:
        "Certainly! To have your orders shipped to multiple addresses, please specify this requirement during the checkout process when submitting your order request. Our Team will reach out to you to gather all the necessary addresses and related information."
    },
    {
      question: "Do you offer international shipping at Custom Pair?",
      answer:
        "Yes, we have the capability to ship to almost anywhere in the world even though our focus is on Europe and the United States."
    },
    {
      question: "What is the estimated delivery time for an order?",
      answer:
        "The lead time for each product may vary. You can find an estimate of the lead time indicated on the product page. However, please be aware that the lead time can fluctuate based on availability and seasonal factors. Feel free to contact us for more information about the availability of a specific product."
    },
    {
      question:
        "Is the lead time measured in working days or regular days at Custom Pair?",
      answer: "The lead time we provide is expressed in working days."
    },
    {
      question: "Do you offer express shipping services at Custom Pair?",
      answer:
        "Yes, we do offer express services, but it's important to note that this service is available for select products and specific periods during the year. To determine if this service can be applied to your case, we recommend contacting our Team for assistance."
    },
    {
      question:
        "What are the costs associated with international shipments outside the EU?",
      answer:
        "For shipments outside the EU, recipients are responsible for customs fees. All shipments are sent under DAP (Delivered at Place) incoterms, and the customs fees are borne by the recipient. These fees should be paid to the shipping company prior to delivery."
    },
    {
      question: "Where can I access your Terms & Conditions?",
      answer:
        "All the details regarding our Terms & Conditions are readily available on our website."
    },
    {
      question: "Do you offer a Return Policy?",
      answer:
        "Please note that, due to the custom and tailor-made nature of our products, we do not accept returns."
    },
    {
      question: "How is personal and private data handled at Custom Pair?",
      answer:
        "At Custom Pair, we strictly adhere to our Privacy Policy, which outlines the comprehensive approach we take to managing personal and private data."
    }
  ];

  return (
    <div>
      <h1 className="text-5xl font-[HUltraLight] text-center my-12 ">
        Our Team
      </h1>
      <div className="flex flex-wrap gap-9 justify-center items-start	my-14">
        <Card
          style={{ width: 300, border: "none" }}
          cover={<Image alt="Johannes" src={image1} />}
        >
          <Meta
            title="Johannes"
            description={
              <div>
                <span className="font-bold "> Meet Johannes</span>
                <br />
                Chief Executive Officer & Co-founder As the co-founder and
                integral part of our team
                <br /> Johannes is the driving force behind seamless order
                management and client relationships
                <br /> With his talent and passion for customer satisfaction
                <br />
                He ensures that each order is handled with utmost care and
                efficiency <br />
                From personalized consultations to timely deliveries
                <br /> Johannes is committed to providing a smooth and
                delightful experience for every client
                <br />
                <br />
              </div>
            }
          />
        </Card>
        <Card
          style={{ width: 300 }}
          className="bg-[#01562f] py-24 shadow-lg shadow-white border-0"
        >
          <div className="text-slate-200 ">
            <span className="font-bold text-xl ">
              Together <br />
            </span>
            <span className="font-bold text-lg">Johannes</span> and{" "}
            <span className="font-bold text-lg">Polina</span> form the dynamic
            duo behind Custom Pair
            <br /> Infusing their expertise and vision into every aspect of our
            business
            <br /> With their complementary strengths
            <br /> They ensure that our clients receive not only exceptional
            products but also a personalized and memorable journey with us
          </div>
        </Card>
        <Card
          style={{ width: 300, border: "none" }}
          cover={<Image alt="poli" src={image2} />}
        >
          <Meta
            title="Polina "
            description={
              <div>
                <span className="font-bold "> Meet Polina</span>
                <br /> our co-founder and the creative genius behind our designs
                and production execution
                <br /> With an artistic flair and keen eye for detail, she
                transforms concepts into captivating realities
                <br /> From customizing each design to overseeing the meticulous
                production process
                <br /> Polina brings her passion for innovation and quality to
                every step of the journey
                <br /> Her dedication to excellence elevates our creations,
                making them truly one-of-a-kind
                <br />
              </div>
            }
          />
        </Card>
      </div>

      <div>
        <h1 className="text-2xl font-semibold my-10 text-center">
          Frequently Asked Questions
        </h1>
        <Row justify="center">
          <Col span={20} className="my-4">
            <Card title="ORDERING" bordered={false}>
              {faqDataORDERING.map((faq, index) => (
                <Faq key={index} {...faq} />
              ))}
            </Card>
          </Col>
          <Col span={20} className="my-4">
            <Card title="PRICING" bordered={false}>
              {" "}
              {faqDataPRICING.map((faq, index) => (
                <Faq key={index} {...faq} />
              ))}
            </Card>
          </Col>
          <Col span={20} className="my-4">
            <Card title="CUSTOMIZATION" bordered={false}>
              {" "}
              {faqDataCUSTOMIZATION.map((faq, index) => (
                <Faq key={index} {...faq} />
              ))}
            </Card>
          </Col>
          <Col span={20} className="my-4">
            <Card title="PRODUCTS" bordered={false}>
              {" "}
              {faqDataPRODUCTS.map((faq, index) => (
                <Faq key={index} {...faq} />
              ))}
            </Card>
          </Col>
          <Col span={20} className="my-4">
            <Card title="PAYMENTS" bordered={false}>
              {" "}
              {faqDataPAYMENTS.map((faq, index) => (
                <Faq key={index} {...faq} />
              ))}
            </Card>
          </Col>
          <Col span={20} className="my-4">
            <Card title="SHIPPING" bordered={false}>
              {" "}
              {faqDataSHIPPING.map((faq, index) => (
                <Faq key={index} {...faq} />
              ))}
            </Card>
          </Col>
        </Row>
      </div>
      <div className="my-20 flex justify-center">
        <iframe
          // className="rounded-2xl"
          width="75%"
          height="415"
          src="https://www.youtube-nocookie.com/embed/XBIZbf8FTLg"
          title="Custom Pair"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        {/* <ReactPlayer
          width="530px"
          height="300px"
          url="https://www.youtube-nocookie.com/embed/XBIZbf8FTLg"
          light="/static/normal-sarong-0007.jpg"
        /> */}
      </div>
    </div>
  );
};

export default About;
