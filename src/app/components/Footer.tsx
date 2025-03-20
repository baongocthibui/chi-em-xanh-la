'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { dancing } from '../fonts';

const Footer: React.FC = () => {
  const photos = [
    '/images/wedding/wedding-1.jpg',
    '/images/wedding/wedding-2.jpg',
    '/images/wedding/wedding-3.jpg',
    '/images/wedding/wedding-4.jpg',
    '/images/wedding/wedding-5.jpg',
    '/images/wedding/wedding-6.jpg',
    '/images/wedding/wedding-7.jpg',
    '/images/wedding/wedding-8.jpg',
    '/images/wedding/wedding-9.jpg'


  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Chuyển ảnh sau mỗi 3 giây

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <FooterSection>
      <BackgroundImage url={photos[currentPhotoIndex]} />
      <Overlay />
      <ContentWrapper>
        <ThankYou>Thank You !</ThankYou>
        <Names>Đông Anh & Minh Quyên</Names>
        <Date>23.02.2025</Date>
      </ContentWrapper>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.div<{ url: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  transition: opacity 1s ease-in-out;
  animation: zoomEffect 20s infinite;

  @keyframes zoomEffect {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  width: 100%;
  padding: 0 2rem;
`;

const ThankYou = styled.h2`
  font-family: ${dancing.style.fontFamily};
  color: #FFD700;
  font-size: 4rem;
  font-weight: 400;
  margin: 0 0 1rem 0;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
  animation: pulseText 2s ease-in-out infinite;

  @keyframes pulseText {
    0% {
      transform: scale(1);
      text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
    }
    50% {
      transform: scale(1.1);
      color: #FFA500;
      text-shadow: 3px 3px 25px rgba(255, 215, 0, 0.8);
    }
    100% {
      transform: scale(1);
      text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
    }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Names = styled.p`
  font-family: ${dancing.style.fontFamily};
  color: #FFFFFF;
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  animation: glowText 3s ease-in-out infinite;

  @keyframes glowText {
    0% {
      opacity: 1;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    50% {
      opacity: 0.9;
      text-shadow: 2px 2px 20px rgba(255, 215, 0, 0.8);
      color: #FFD700;
    }
    100% {
      opacity: 1;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Date = styled.p`
  font-family: 'Muli', sans-serif;
  color: white;
  font-size: 1.2rem;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default Footer; 