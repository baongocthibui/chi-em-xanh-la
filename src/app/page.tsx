'use client'
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { dancing } from './fonts'
import Countdown from './components/Countdown'
import PhotoAlbum from './components/PhotoAlbum'
import RSVP from './components/RSVP'
import Guestbook from './components/Guestbook'
// import WeddingGift from './components/WeddingGift'
import Schedule from './components/Schedule'
import GiftModal from './components/GiftModal'
import OurStory from './components/OurStory'
import Message from './components/Message'
import Invitation from './components/Invitation'
import Footer from './components/Footer'
import BackgroundMusic from './components/BackgroundMusic'

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
`;

const Home: React.FC = () => {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  const backgroundImages = [
    '/images/hero-bg/hero-bg-1.jpg',
    '/images/hero-bg/hero-bg-2.jpg',
    '/images/hero-bg/hero-bg-3.jpg',
    '/images/hero-bg/hero-bg-4.jpg',
    '/images/hero-bg/hero-bg-5.jpg',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const scrollToSchedule = () => {
    const element = document.getElementById('wedding-schedule');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      let start: number | null = null;
      
      const duration = 2000; // Tăng thời gian lên 2 giây

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  };

  const scrollToRSVP = () => {
    const element = document.getElementById('rsvp-section');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      let start: number | null = null;
      
      const duration = 2000;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  };

  return (
    <PageWrapper>
      <BackgroundMusic />
      <HeroSection $currentImage={backgroundImages[currentBgIndex]}>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HappyWedding>CHỊ EM XANH LÁ</HappyWedding>
          <CoupleNames>Nhanh tay nhặt vé</CoupleNames>
          <WeddingDate></WeddingDate>
          <Countdown weddingDate="2025-04-15" />
          <ButtonGroup>
            <div>
              <EventButton onClick={scrollToSchedule}>
                <HeartIcon>❤️</HeartIcon>
                Sự Kiện
              </EventButton>
              <HeartIcons>❤️❤️❤️</HeartIcons>
              //<EventButton onClick={() => setIsGiftModalOpen(true)}>
                <GiftIcon>🎁</GiftIcon>
                
              </EventButton>
            </div>
            <div>
              <EventButton onClick={scrollToRSVP}>
                <HeartIcon>💌</HeartIcon>
                Xác Nhận Tham Dự
              </EventButton>
            </div>
          </ButtonGroup>
        </motion.div>
      </HeroSection>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Invitation />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <OurStory />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <PhotoAlbum />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Message />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Schedule />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <RSVP />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Guestbook />
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <WeddingGift />
      </motion.div> */}

      <GiftModal 
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Footer />
      </motion.div>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;

  html {
    scroll-behavior: smooth;
  }

  body {
    scroll-behavior: smooth;
  }
`

const HeroSection = styled.section<{ $currentImage: string }>`
  min-height: 70vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.$currentImage});
  background-size: auto 100%;
  background-position: center;
  background-repeat: repeat-x;
  padding: 0;
  margin: 0;
  overflow: hidden;
  transition: background-image 1s ease-in-out;

  .hero-content {
    text-align: center;
    width: 100%;
    padding: 0 1rem;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  @media (max-width: 768px) {
    min-height: 70vh;
    background-size: auto 100%;
    background-position: center -51px;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 51px;
      background: rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
  }

  @media (max-width: 375px) {
    min-height: 90vh;
  }
`

const HappyWedding = styled.h2`
  font-size: 5.5rem;
  color: #ffeaa6;
  font-family: ${dancing.style.fontFamily};
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  font-weight: 400;
  letter-spacing: 2px;
  animation: ${pulseAnimation} 2.5s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CoupleNames = styled.h1`
  font-size: 2.5rem;
  color: #FFD700;
  margin: 1rem 0;
  font-weight: 200;
  font-family: ${dancing.style.fontFamily};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  animation: glowText 3s ease-in-out infinite;

  @keyframes glowText {
    0% {
      opacity: 1;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    50% {
      opacity: 0.9;
      color: #FFA500;
      text-shadow: 2px 2px 20px rgba(255, 215, 0, 0.8);
    }
    100% {
      opacity: 1;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const WeddingDate = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin: 1rem 0;
  font-family: ${dancing.style.fontFamily};

  @media (max-width: 768px) {
    font-size: 1.0rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-direction: column;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const EventButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  border: 2px solid #D4AF37;
  background-color: white;
  color: #4e4e4e;
  border-radius: 25px;
  font-size: 1.3rem;
  font-family: ${dancing.style.fontFamily};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #D4AF37;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.8rem;
    font-size: 1rem;
    border-radius: 20px;
  }
`;

const HeartIcon = styled.span`
  font-size: 1.2rem;
`;

const GiftIcon = styled.span`
  font-size: 1.2rem;
`;

const HeartIcons = styled.span`
  color: #D4AF37;
  font-size: 1.2rem;
  margin: 0 0.5rem;
`;

export default Home;