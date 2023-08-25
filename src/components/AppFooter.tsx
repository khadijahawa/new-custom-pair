import React from "react";
import footerLogo from "../utils/images/WhiteLogo.png";
import Link from "next/link";
import Image from "next/image";
import before from "../utils/images/before-removebg-preview.png";
import after from "../utils/images/after-removebg-preview.png";
import before2 from "../utils/images/before2-removebg-preview.png";

const AppFooter = () => {
  const contentStyle: React.CSSProperties = {
    maxWidth: "100%",
    width: "100%"
  };

  return (
    <footer className="text-center bottom-0 w-full bg-gray-200 p-4 h-full">
      <div className="w-60">
        <Link href="/">
          <Image src={footerLogo} alt="Logo" />
        </Link>
        {/* <div className="mt-2 ">
          <div className="">
            <Image src={before} style={contentStyle} alt="before" />
          </div>
          <div>
            <Image src={before2} style={contentStyle} alt="before2" />
          </div>
          <div>
            <Image src={after} style={contentStyle} alt="after" />
          </div>
        </div> */}
        {/* <div className="grid gap-2">
          <div>
            <Image
              src={before}
              alt="before"
              className="h-auto max-w-full rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Image
                src={before}
                alt="before2"
                className="h-auto max-w-full rounded-lg"
              />
            </div>
            <div>
              <Image
                src={before2}
                alt="before2"
                className="h-auto max-w-full rounded-lg"
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg"
                src={after}
                alt=""
              />
            </div>
   
          </div>
        </div> */}
      </div>
      <div></div>
    </footer>
  );
};

export default AppFooter;
