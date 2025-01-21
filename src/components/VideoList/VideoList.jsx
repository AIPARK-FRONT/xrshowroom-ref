import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import VideoListItem from './VideoListItem/VideoListItem';
import './VideoList.css';

const rightArrowIcon = '/assets/images/arrow_white_right.png';
const leftArrowIcon = '/assets/images/arrow_white_left.png';
const rightHoverArrowIcon = '/assets/images/arrow_blue_right.png';
const leftHoverArrowIcon = '/assets/images/arrow_blue_left.png';

const ArrowButton = ({ direction, onClick }) => {
  const [currentIcon, setCurrentIcon] = useState(
    direction === 'right' ? rightArrowIcon : leftArrowIcon
  );

  const handleMouseEnter = () => {
    setCurrentIcon(
      direction === 'right' ? rightHoverArrowIcon : leftHoverArrowIcon
    );
  };

  const handleMouseLeave = () => {
    setCurrentIcon(
      direction === 'right' ? rightArrowIcon : leftArrowIcon
    );
  };

  return (
    <button
      className={`arrow-button-${direction}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={currentIcon} alt={direction} />
    </button>
  );
};

const VideoList = ({ videos, onVideoSelect }) => {
  const listRef = useRef(null);

  const scroll = (direction) => {
    const { current } = listRef;
    if (current) {
      const scrollDistance = window.innerWidth / 4.39;
      current.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="video-list-background">
      <div className="video-list-container">
        <ArrowButton direction="left" onClick={() => scroll('left')} />
        <div className="video-list" ref={listRef}>
          {videos.map((video, index) => (
            <VideoListItem
              key={index}
              video={video}
              onVideoSelect={onVideoSelect}
            />
          ))}
        </div>
        <ArrowButton direction="right" onClick={() => scroll('right')} />
      </div>
    </div>
  );
};

VideoList.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      video_desc_title: PropTypes.string.isRequired,
      video_desc_content1: PropTypes.string,
      video_desc_content2: PropTypes.string,
      thumbnail_filename: PropTypes.string.isRequired,
    })
  ).isRequired,
  onVideoSelect: PropTypes.func.isRequired,
};

export default VideoList;
