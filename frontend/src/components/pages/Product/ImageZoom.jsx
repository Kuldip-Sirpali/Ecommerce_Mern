// import React, { useEffect, useRef } from 'react';

// const ImageZoom = ({ src }) => {
//   const imgRef = useRef(null);
//   const resultRef = useRef(null);
//   const lensRef = useRef(null);

//   useEffect(() => {
//     if (!src) return; // Exit if there's no image source

//     const img = imgRef.current;
//     const result = resultRef.current;

//     // Clear existing lens if any
//     if (lensRef.current) {
//       lensRef.current.remove();
//     }

//     // Create lens element
//     const lens = document.createElement('div');
//     lens.setAttribute('class', 'img-zoom-lens');
//     lensRef.current = lens;
//     img.parentElement.insertBefore(lens, img);

//     const cx = result.offsetWidth / lens.offsetWidth;
//     const cy = result.offsetHeight / lens.offsetHeight;

//     result.style.backgroundImage = `url(${img.src})`;
//     result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

//     const moveLens = (e) => {
//       e.preventDefault();
//       const pos = getCursorPos(e, img);
//       let x = pos.x - lens.offsetWidth / 2;
//       let y = pos.y - lens.offsetHeight / 2;

//       // Prevent lens from going outside image boundaries
//       if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
//       if (x < 0) x = 0;
//       if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
//       if (y < 0) y = 0;

//       lens.style.left = `${x}px`;
//       lens.style.top = `${y}px`;
//       result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
//     };

//     const getCursorPos = (e, img) => {
//       const a = img.getBoundingClientRect();
//       const x = e.pageX - a.left - window.screenX;
//       const y = e.pageY - a.top - window.screenY;
//       return { x, y };
//     };

//     // Add event listeners for mouse and touch events with passive option
//     lens.addEventListener('mousemove', moveLens);
//     img.addEventListener('mousemove', moveLens);
//     lens.addEventListener('touchmove', moveLens, { passive: true });
//     img.addEventListener('touchmove', moveLens, { passive: true });

//     return () => {
//       // Cleanup event listeners
//       lens.removeEventListener('mousemove', moveLens);
//       img.removeEventListener('mousemove', moveLens);
//       lens.removeEventListener('touchmove', moveLens);
//       img.removeEventListener('touchmove', moveLens);
//       lens.remove();
//     };
//   }, [src]); // Re-run the effect when the image source changes

//   return (
//     // <div className="relative">
//     //   <img ref={imgRef} src={src} width={width} height={height} alt="Zoomable" />
//     //   <div ref={resultRef} className="  ml-80 top-0 border-2 border-red-500 absolute w-[500px] h-[500px]"></div>
//     // </div>
//     <div className="relative flex border-[1px] border-[#70e000]  ">
//       <img
//         ref={imgRef}
//         src={src}
//         alt="zoom"
//         className="bg-no-repeat"
//       />
//       <div
//         ref={resultRef}
//         className="img-zoom-result md:hidden  bg-white bg-no-repeat fixed top-24  right-8 border-[1px] border-[#70e000]  md:w-[836px] md:h-[500px]">
//       </div>
//     </div>
//   );
// };

// export default ImageZoom;

import React, { useEffect, useRef, useState } from "react";

const ImageZoom = ({ src, zoom = 2, lensSize = 80 }) => {
  const imgRef = useRef(null);
  const resultRef = useRef(null);
  const lensRef = useRef(null);
  const [showLens, setShowLens] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = imgRef.current;
    const result = resultRef.current;

    // Remove old lens if exists
    if (lensRef.current) {
      lensRef.current.remove();
    }

    // Create lens
    const lens = document.createElement("div");
    lens.setAttribute("class", "img-zoom-lens");
    lens.style.position = "absolute";
    lens.style.border = "2px solid #e9bbc5";
    lens.style.width = `${lensSize}px`;
    lens.style.height = `${lensSize}px`;
    lens.style.opacity = "0.4";
    lens.style.background = "#fff";
    lens.style.pointerEvents = "none";
    lens.style.display = showLens ? "block" : "none";
    lensRef.current = lens;
    img.parentElement.style.position = "relative";
    img.parentElement.insertBefore(lens, img);

    // Calculate zoom ratios
    const cx = (result.offsetWidth / lens.offsetWidth) * zoom;
    const cy = (result.offsetHeight / lens.offsetHeight) * zoom;

    result.style.backgroundImage = `url(${img.src})`;
    result.style.backgroundRepeat = "no-repeat";
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

    function getCursorPos(e) {
      e = e.touches ? e.touches[0] : e;
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    }

    function moveLens(e) {
      e.preventDefault();
      setShowLens(true);
      lens.style.display = "block";
      result.style.display = "block";

      const pos = getCursorPos(e);
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;

      // Clamp lens position
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (y > img.height - lens.offsetHeight)
        y = img.height - lens.offsetHeight;

      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;

      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }

    function hideLens() {
      setShowLens(false);
      lens.style.display = "none";
      result.style.display = "none";
    }

    // Mouse events
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mouseleave", hideLens);
    lens.addEventListener("mouseleave", hideLens);

    // Touch events
    img.addEventListener("touchmove", moveLens, { passive: false });
    lens.addEventListener("touchmove", moveLens, { passive: false });
    img.addEventListener("touchend", hideLens);
    lens.addEventListener("touchend", hideLens);

    // Show lens on mouse enter
    img.addEventListener("mouseenter", () => {
      setShowLens(true);
      lens.style.display = "block";
      result.style.display = "block";
    });

    // Hide lens on mouse leave
    img.addEventListener("mouseleave", hideLens);

    // Cleanup
    return () => {
      img.removeEventListener("mousemove", moveLens);
      lens.removeEventListener("mousemove", moveLens);
      img.removeEventListener("mouseleave", hideLens);
      lens.removeEventListener("mouseleave", hideLens);
      img.removeEventListener("touchmove", moveLens);
      lens.removeEventListener("touchmove", moveLens);
      img.removeEventListener("touchend", hideLens);
      lens.removeEventListener("touchend", hideLens);
      img.removeEventListener("mouseenter", () => setShowLens(true));
      img.removeEventListener("mouseleave", hideLens);
      lens.remove();
    };
    // eslint-disable-next-line
  }, [src, lensSize, zoom, showLens]);

  return (
    <div className="relative flex border-[1px] border-main">
      <img
        ref={imgRef}
        src={src}
        alt="zoom"
        className="bg-no-repeat"
        style={{ display: "block", maxWidth: "100%", cursor: "zoom-in" }}
        draggable={false}
      />
      <div
        ref={resultRef}
        className="img-zoom-result bg-white bg-no-repeat fixed  right-8 border-[1px] border-main"
        style={{
          width: 800,
          height: 500,
          display: showLens ? "block" : "none",
          zIndex: 1000,
        }}
      ></div>
      <style>{`
        .img-zoom-lens {
          transition: opacity 0.2s;
          border-radius: 8px;
        }
        .img-zoom-result {
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}


export default ImageZoom;
