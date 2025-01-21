import React from 'react';
import PropTypes from 'prop-types';
import './VideoDescription.css'; // 가정하는 CSS 파일 경로
const desc_line='/assets/images/desc_line.png';

const VideoDescription = ({video_desc_keywords, video_desc_title, video_desc_content1, video_desc_content2 }) => {
  return (
    <div className="video-description-container">

      <div className="keyword-tag">{video_desc_keywords}</div>
      <div className="video-desc-title">{video_desc_title}</div>
      <div className="video-desc-content1">{video_desc_content1}</div>
      <div className="video-description-line">
        <img src={desc_line} alt="line" />
      </div>
      <div className="video-desc-content2">{video_desc_content2}</div>
      {/* 여기에 추가적인 메타데이터를 표시할 수 있는 요소들을 넣을 수 있습니다. */}
    </div>
  );
};

// PropTypes를 사용하여 props의 타입을 지정
VideoDescription.propTypes = {
  video_desc_title: PropTypes.string.isRequired,
  video_desc_content1: PropTypes.string,
  video_desc_content2: PropTypes.string
};

export default VideoDescription;
