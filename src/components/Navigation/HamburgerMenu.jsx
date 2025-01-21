import React, { useState, useEffect } from 'react'
import './HamburgerMenu.css' // 가정하는 CSS 파일 경로
const menuImage = '/xrshowroom-ref/assets/images/hamburger.png'
const menuCloseImage = '/xrshowroom-ref/assets/images/close.png'
const HamburgerMenu = ({ isOpen, toggleMenu, metaInfo, onMenuSelect }) => {
  return (
    <div>
      <button className="menu-button" onClick={toggleMenu}>
        <img src={menuImage} alt="menu_button" />
      </button>

      {isOpen && (
        <div className="menu-list-section">
          <div>
            <button className="menu-close-button" onClick={toggleMenu}>
              <img src={menuCloseImage} alt="menu_close" />
            </button>
          </div>
          <div>
            {Object.entries(metaInfo).map(([menuIdx, videoList]) => {
              return (
                <div key={menuIdx}>
                  <div
                    className="menu-button-category"
                    onClick={() => {
                      toggleMenu()
                      onMenuSelect(videoList.menuName, videoList.videos)
                    }}
                  >
                    {videoList.menuName}
                  </div>
                  <ul className="menu-button-video-ul">
                    {videoList.videos.map((video) => (
                      <ul key={video.video_menu_title}>{video.video_menu_title}</ul>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default HamburgerMenu
