import React, { useState, useEffect } from 'react'
import VideoList from '../../components/VideoList/VideoList'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import VideoDescription from '../../components/VideoDescription/VideoDescription'
import HamburgerMenu from '../../components/Navigation/HamburgerMenu'
import './Home.css' // 홈 페이지 전용 스타일
const logo = '/xrshowroom-ref/assets/images/AiVATAR_logo.png' // 로고 이미지 경로를 올바르게 설정하세요
let video_root = 'https://azureasset.aivatar.ai/aivatar/xrshowroom/'
const Home = () => {
  const [metaInfo, setMetaInfo] = useState([]) // 비디오 목록 상태
  const [videos, setVideos] = useState([]) // 비디오 목록 상태
  const [selectedVideo, setSelectedVideo] = useState(null) // 선택된 비디오 상태
  const [menuOpen, setMenuOpen] = useState(false) // 메뉴 상태
  const [selectedMenuIdx, setSelectedMenuIdx] = useState(null)
  const [selectedMenuName, setSelectedMenuName] = useState(null)
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then(function (registration) {
          console.log('Service Worker registered with scope:', registration.scope)
        })
        .catch(function (error) {
          console.log('Service Worker registration failed:', error)
        })
    }
  }, [])

  useEffect(() => {
    if (metaInfo.length > 0) {
      // 첫 번째 메뉴의 정보를 가져옵니다.
      const firstMenu = metaInfo[0]
      setSelectedMenuName(firstMenu.menuName)
      setVideos(firstMenu.videos)
      if (firstMenu.videos.length > 0) {
        setSelectedVideo(firstMenu.videos[0]) // 첫 번째 메뉴의 첫 번째 비디오를 선택합니다.
      }
    }
  }, [metaInfo]) // 의존성 배열에 metaInfo를 포함
  useEffect(() => {
    fetch('/assets/video_meta.json')
      .then((response) => response.json())
      .then((data) => {
        const metaArray = Object.entries(data).map(([menuName, videos], menuIdx) => {
          const transformedVideos = videos.map((video) => {
            return {
              video_menu_title: video.video_menu_title,
              video_desc_content1: video.video_desc_content1,
              video_desc_content2: video.video_desc_content2,
              thumbnail_filename: video.thumbnail_filename,
              video_desc_title: video.video_desc_title,
              video_desc_keywords: video.video_desc_keywords,
              video_filename: video.video_filename,
            }
          })

          return {
            menuIdx,
            menuName,
            videos: transformedVideos,
          }
        })
        console.log('&&&&', metaArray[0]['videos'])
        console.log('&&&&')
        setMetaInfo(metaArray)
        setVideos(metaArray[0]['videos'])
      })
      .catch((error) => console.error('Error fetching video data:', error))
  }, [])

  const handleVideoSelect = (video) => {
    setSelectedVideo(video) // 비디오 선택 처리
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen) // 메뉴 토글 처리
  }

  const handleMenuSelect = (menuName, videos) => {
    setSelectedMenuName(menuName)

    const selectedMenuVideos = videos
    console.log('Selected Menu Videos////////////:', selectedMenuVideos) // 여기에서 값 확인

    if (selectedMenuVideos && selectedMenuVideos.length > 0) {
      setSelectedVideo(selectedMenuVideos[0])
    } else {
      setSelectedVideo(null)
    }
  }

  return (
    <div className="home">
      <header>
        <div className="header-logo">
          <img src={logo} alt="Logo" />
        </div>
        <HamburgerMenu isOpen={menuOpen} toggleMenu={toggleMenu} metaInfo={metaInfo} onMenuSelect={handleMenuSelect} />
      </header>

      <main>
        <div className="body-background">
          <div className="video-content">
            {selectedVideo && (
              <>
                <div className="video-player-section">
                  <VideoPlayer videoUrl={video_root + '/' + selectedVideo.video_filename} />
                </div>
                <div className="video-description-section">
                  <VideoDescription
                    video_desc_keywords={selectedVideo.video_desc_keywords}
                    video_desc_title={selectedVideo.video_desc_title}
                    video_desc_content1={selectedVideo.video_desc_content1}
                    video_desc_content2={selectedVideo.video_desc_content2}
                  />
                </div>
              </>
            )}
          </div>
          {/* 선택된 메뉴에 해당하는 비디오 목록을 표시 */}

          {selectedMenuName &&
            (console.log(
              'Filtered Videos for Selected Menu:',
              videos.find((video) => video.menuName === selectedMenuName)?.videos || []
            ),
            (<VideoList videos={videos} onVideoSelect={handleVideoSelect} />))}
        </div>
      </main>
    </div>
  )
}

export default Home
