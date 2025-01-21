import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import './VideoPlayer.css' // 가정하는 CSS 파일 경로
const playButtonImage = '/xrshowroom-ref/assets/images/play.png'

const VideoPlayer = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  // videoUrl 변경 감지 및 재생 상태 리셋
  useEffect(() => {
    setIsPlaying(false)
  }, [videoUrl])

  const handlePlayButton = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <div className="video-player-container" style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        className="video-player"
        src={videoUrl}
        type="video/webm"
        controls={isPlaying} // 재생 중일 때만 컨트롤 표시
      ></video>

      {!isPlaying && <img src={playButtonImage} alt="Play" className="play-button" onClick={handlePlayButton} />}
    </div>
  )
}

// PropTypes를 사용하여 props의 타입을 지정
VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
}

export default VideoPlayer
