import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
const fadeImages = [
  {
    url: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/2bb7a35b10444cf2.png?q=20",
    caption: "First Slide",
  },
  {
    url: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9d97b44069ee0e57.jpeg?q=20",
    caption: "Second Slide",
  },
  {
    url: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5ad5ba37c3ae2aaa.jpeg?q=20",
    caption: "Third Slide",
  },
];

const buttonStyle = {
  // width: "30px",
  // background: 'white',
  border: "0px",
};

const properties = {
  prevArrow: (
    <button style={{ ...buttonStyle }}>
      <svg
        stroke="currentColor"
        fill="#fff"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="3em"
        width="3em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
      </svg>
    </button>
  ),
  nextArrow: (
    <button style={{ ...buttonStyle }}>
      <svg
        stroke="currentColor"
        fill="#fff"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="3em"
        width="3em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
      </svg>
    </button>
  ),
};
const Slideshow = () => {
  return (
    <div className="slide-container ">
      <Fade {...properties}>
        {fadeImages.map((fadeImage, index) => (
          <div
            key={index}
            className=" md:h-[400px] h-screen w-full flex items-center justify-center"
          >
            <img style={{ width: "100%" }} src={fadeImage.url} alt={fadeImage.caption} />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
