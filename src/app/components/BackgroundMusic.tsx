'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Chờ user tương tác với trang web trước khi phát nhạc
    const audio = audioRef.current; // Lưu ref vào biến local
    
    const playAudio = () => {
      if (audio && !isPlaying) {
        audio.play();
        setIsPlaying(true);
      }
      document.removeEventListener('click', playAudio);
    };

    document.addEventListener('click', playAudio);
    return () => document.removeEventListener('click', playAudio);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current; // Lưu ref vào biến local
    
    const handleEnded = () => {
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    if (audio) {
      audio.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <MusicContainer>
      <audio ref={audioRef} loop>
        <source src="/mp3/background-music.mp3" type="audio/mp3" />
      </audio>
      <MusicButton onClick={togglePlay} $isPlaying={isPlaying}>
        {isPlaying ? '🔊' : '🔇'}
      </MusicButton>
    </MusicContainer>
  );
};

const pulse = keyframes`
  0% {
    background: rgba(255, 192, 203, 0.4);
    transform: scale(1);
  }
  25% {
    background: rgba(135, 206, 235, 0.4);
    transform: scale(1.1);
  }
  50% {
    background: rgba(152, 251, 152, 0.4); 
    transform: scale(1);
  }
  75% {
    background: rgba(238, 130, 238, 0.4);
    transform: scale(1.1);
  }
  100% {
    background: rgba(255, 192, 203, 0.4);
    transform: scale(1);
  }
`;

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(8deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-8deg); }
  100% { transform: rotate(0deg); }
`;

const MusicContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
`;

const MusicButton = styled.button<{ $isPlaying: boolean }>`
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite ease-in-out;

  ${props => props.$isPlaying && css`
    animation: ${pulse} 2s infinite ease-in-out, ${shake} 0.5s infinite ease-in-out;
  `}

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  @media (max-width: 430px) {
    width: 53px;
    height: 53px;
    font-size: 2.0rem;
  }

  @media (max-width: 375px) {
    width: 43px;
    height: 43px;
    font-size: 1.6rem;
  }
`;

export default BackgroundMusic;
