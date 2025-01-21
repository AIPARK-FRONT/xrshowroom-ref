import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import VideoListItem from './VideoListItem/VideoListItem';
import './VideoList.css'; // VideoList 전용 CSS

const rightArrowIcon='/assets/images/arrow_white_right.png';
const leftArrowIcon='/assets/images/arrow_white_left.png';
const VideoList = ({ videos, onVideoSelect }) => {
  const listRef = useRef(null);
  // 스크롤 함수 정의
  const scroll = (direction) => {
    const { current } = listRef;
    if (current) {
        const scrollDistance = window.innerWidth /4.39 ;
      current.scrollBy({ left: direction === 'left' ? -scrollDistance : scrollDistance, behavior: 'smooth' });
    }
  };

  return (
    <div className="video-list-background">
    <div className="video-list-container">
    <button className="arrow-button-left" onClick={() => scroll('left')}>
      <img src={ArrowButton} alt="Left" />
    </button>
    <div className="video-list" ref={listRef}>
        {videos.map(video => (
        <VideoListItem
            video={video}
            onVideoSelect={onVideoSelect}
        />
        ))}
    </div>

    
    <button className="arrow-button-right" onClick={() => scroll('right')}>
    <img src={ArrowButton} alt="Left" />

    </button>
    </div>
    </div>
  );
};

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    video_desc_title: PropTypes.string.isRequired,
    video_desc_content1: PropTypes.string,
    video_desc_content2: PropTypes.string,
    thumbnail_filename: PropTypes.string.isRequired
  })).isRequired,
  onVideoSelect: PropTypes.func.isRequired
};
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


export default VideoList;
