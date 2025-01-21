import React from 'react';
const rightArrowIcon='/assets/images/arrow_white_right.png';
const leftArrowIcon='/assets/images/arrow_white_left.png';
const rightHoverArrowIcon='/assets/images/arrow_blue_right.png';
const leftHoverArrowIcon='/assets/images/arrow_blue_left.png';

const ArrowButton = ({ direction }) => {
  // 상태를 사용하여 현재 이미지를 관리할 수 있습니다.
  const [currentIcon, setCurrentIcon] = React.useState(rightArrowIcon);

  const handleMouseEnter = () => {
    setCurrentIcon(rightHoverArrowIcon);
  };

  const handleMouseLeave = () => {
    setCurrentIcon(rightArrowIcon);
  };

  return (
    <button
      className="arrow-button-right"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundImage: `url(${currentIcon})` }}
    >
      {/* 이미지 태그는 필요 없습니다. */}
    </button>
  );
};

export default ArrowButton;
