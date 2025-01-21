import React from 'react'
import PropTypes from 'prop-types'
import './VideoListItem.css' // 가정하는 CSS 파일 경로
let thumbnail_root = '/xrshowroom-ref/assets/images/'

const VideoListItem = ({ video, onVideoSelect }) => {
  return (
    <div className="video-list-item" onClick={() => onVideoSelect(video)}>
      <img className="video-thumbnail" src={thumbnail_root + video.thumbnail_filename} alt={video.video_menu_title} />
    </div>
  )
}

// PropTypes를 사용하여 props의 타입을 지정
VideoListItem.propTypes = {
  video: PropTypes.shape({
    video_desc_title: PropTypes.string.isRequired,
    video_desc_content1: PropTypes.string,
    video_desc_content2: PropTypes.string,
    thumbnail_filename: PropTypes.string.isRequired,
  }).isRequired,
  onVideoSelect: PropTypes.func.isRequired,
}

export default VideoListItem
