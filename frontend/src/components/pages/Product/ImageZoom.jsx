
import React, { useEffect, useRef } from 'react';

const ImageZoom = ({ src, width = 300, height = 240 }) => {
  const imgRef = useRef(null);
  const resultRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    if (!src) return; // Exit if there's no image source

    const img = imgRef.current;
    const result = resultRef.current;

    // Clear existing lens if any
    if (lensRef.current) {
      lensRef.current.remove();
    }

    // Create lens element
    const lens = document.createElement('div');
    lens.setAttribute('class', 'img-zoom-lens');
    lensRef.current = lens;
    img.parentElement.insertBefore(lens, img);

    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = `url(${img.src})`;
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

    const moveLens = (e) => {
      e.preventDefault();
      const pos = getCursorPos(e, img);
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;

      // Prevent lens from going outside image boundaries
      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;

      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;
      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    };

    const getCursorPos = (e, img) => {
      const a = img.getBoundingClientRect();
      const x = e.pageX - a.left - window.screenX;
      const y = e.pageY - a.top - window.screenY;
      return { x, y };
    };

    // Add event listeners for mouse and touch events
    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('mousemove', moveLens);
    lens.addEventListener('touchmove', moveLens);
    img.addEventListener('touchmove', moveLens);

    return () => {
      // Cleanup event listeners
      lens.removeEventListener('mousemove', moveLens);
      img.removeEventListener('mousemove', moveLens);
      lens.removeEventListener('touchmove', moveLens);
      img.removeEventListener('touchmove', moveLens);
      lens.remove();
    };
  }, [src]); // Re-run the effect when the image source changes

  return (
    // <div className="relative">
    //   <img ref={imgRef} src={src} width={width} height={height} alt="Zoomable" />
    //   <div ref={resultRef} className="  ml-80 top-0 border-2 border-red-500 absolute w-[500px] h-[500px]"></div>
    // </div>
    <div className="relative flex border-[1px] border-slate-700  ">
      <img
        ref={imgRef}
        src={src}
        alt="zoom"
        className="bg-no-repeat"
      />
      <div
        ref={resultRef}
        className="img-zoom-result  bg-white bg-no-repeat left-full ml-52 border-[1px] border-slate-700 w-60 h-60 md:w-[800px] md:h-[500px]">
      </div>
    </div>
  );
};

export default ImageZoom;
