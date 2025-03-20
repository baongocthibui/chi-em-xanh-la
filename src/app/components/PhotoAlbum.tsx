/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { dancing } from '../fonts';
import ImagePreview from './ImagePreview';

const PhotoAlbum: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const photos = [
    { url: '/images/wedding/wedding-1.jpg', alt: 'Wedding Photo 1' },
    { url: '/images/wedding/wedding-2.jpg', alt: 'Wedding Photo 2' },
    { url: '/images/wedding/wedding-3.jpg', alt: 'Wedding Photo 3' },
    { url: '/images/wedding/wedding-4.jpg', alt: 'Wedding Photo 4' },
    { url: '/images/wedding/wedding-5.jpg', alt: 'Wedding Photo 5' },
    { url: '/images/wedding/wedding-6.jpg', alt: 'Wedding Photo 6' },
    { url: '/images/wedding/wedding-7.jpg', alt: 'Wedding Photo 7' },
    { url: '/images/wedding/wedding-8.jpg', alt: 'Wedding Photo 8' },
    { url: '/images/wedding/wedding-9.jpg', alt: 'Wedding Photo 9' }
  ];

  const gridGalleryPhotos = [
    { url: '/images/grid/grid-1.jpg', alt: '' },
    { url: '/images/grid/grid-2.jpg', alt: '' },
    { url: '/images/grid/grid-3.jpg', alt: '' },
    { url: '/images/grid/grid-4.jpg', alt: '' },
    { url: '/images/grid/grid-5.jpg', alt: '' },
    { url: '/images/grid/grid-6.jpg', alt: '' },
    { url: '/images/grid/grid-7.jpg', alt: '' },
    { url: '/images/grid/grid-8.jpg', alt: '' },
    { url: '/images/grid/grid-9.jpg', alt: '' },
    { url: '/images/grid/grid-10.jpg', alt: '' },
    { url: '/images/grid/grid-11.jpg', alt: '' },
    { url: '/images/grid/grid-12.jpg', alt: '' },
    { url: '/images/grid/grid-13.jpg', alt: '' },
    { url: '/images/grid/grid-14.jpg', alt: '' }

  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const resetAutoplayTimer = useCallback(() => {
    setAutoplayPaused(true);
    setTimeout(() => {
      setAutoplayPaused(false);
    }, 5000);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!autoplayPaused) {
      timer = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % photos.length);
      }, 5000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoplayPaused, photos.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % photos.length);
    resetAutoplayTimer();
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
    resetAutoplayTimer();
  };

  const getVisiblePhotos = () => {
    const visiblePhotos = [];
    const numPhotos = isMobile ? 1 : 3;
    for (let i = 0; i < numPhotos; i++) {
      const index = (currentSlide + i) % photos.length;
      visiblePhotos.push(photos[index]);
    }
    return visiblePhotos;
  };

  const getMobilePhotoList = () => {
    const reorderedPhotos = [...photos];
    const currentIndex = currentSlide;
    
    // Rotate array so current photo is first
    const rotatedPhotos = [
      ...reorderedPhotos.slice(currentIndex),
      ...reorderedPhotos.slice(0, currentIndex)
    ];
    
    return rotatedPhotos;
  };

  return (
    <>
      <Container id="album">
        <AlbumHeader>
          <LeafIcon />
          <Title>Bộ Sưu Tập Kỷ Niệm</Title>
        </AlbumHeader>

        <MobileGridGallery>
          <TopPhotoGrid
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MainPhotoColumn>
              <MainPhoto
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onClick={() => setSelectedImage(gridGalleryPhotos[0].url)}
              >
                <img src={gridGalleryPhotos[0].url} alt={gridGalleryPhotos[0].alt} />
              </MainPhoto>
            </MainPhotoColumn>
            <SecondaryPhotoColumn>
              {gridGalleryPhotos.slice(1, 3).map((photo, index) => (
                <SecondaryPhoto
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  onClick={() => setSelectedImage(photo.url)}
                >
                  <img src={photo.url} alt={photo.alt} />
                </SecondaryPhoto>
              ))}
            </SecondaryPhotoColumn>
          </TopPhotoGrid>

          <ReversedPhotoGrid
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <SecondaryPhotoColumn>
              {gridGalleryPhotos.slice(3, 5).map((photo, index) => (
                <SecondaryPhoto
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                  onClick={() => setSelectedImage(photo.url)}
                >
                  <img src={photo.url} alt={photo.alt} />
                </SecondaryPhoto>
              ))}
            </SecondaryPhotoColumn>
            <MainPhotoColumn>
              <MainPhoto
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.2 }}
                onClick={() => setSelectedImage(gridGalleryPhotos[5].url)}
              >
                <img src={gridGalleryPhotos[5].url} alt={gridGalleryPhotos[5].alt} />
              </MainPhoto>
            </MainPhotoColumn>
          </ReversedPhotoGrid>

          <BottomPhotoGrid>
            {gridGalleryPhotos.slice(6).map((photo, index) => (
              <BottomGridItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.4 + index * 0.2 }}
                onClick={() => setSelectedImage(photo.url)}
              >
                <img src={photo.url} alt={photo.alt} />
              </BottomGridItem>
            ))}
          </BottomPhotoGrid>
        </MobileGridGallery>

        <SlideContainer>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <SlideWrapper
              key={currentSlide}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? '100%' : '-100%',
                  position: 'absolute'
                }),
                center: {
                  x: 0,
                  position: 'relative'
                },
                exit: (direction: number) => ({
                  x: direction < 0 ? '100%' : '-100%',
                  position: 'absolute'
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", duration: 0.8, ease: "easeInOut" },
                position: { delay: 0.3 }
              }}
            >
              {getVisiblePhotos().map((photo, index) => (
                <SlideItem 
                  key={index}
                  onClick={() => setSelectedImage(photo.url)}
                >
                  <img src={photo.url} alt={photo.alt} />
                </SlideItem>
              ))}
            </SlideWrapper>
          </AnimatePresence>
          <SlideButton onClick={prevSlide} style={{ left: 10 }}>❮</SlideButton>
          <SlideButton onClick={nextSlide} style={{ right: 10 }}>❯</SlideButton>
          <SlideIndicators>
            {photos.map((_, index) => (
              <SlideIndicator 
                key={index}
                $active={index === currentSlide}
                onClick={() => {
                  setCurrentSlide(index);
                  resetAutoplayTimer();
                }}
              />
            ))}
          </SlideIndicators>
        </SlideContainer>

        {isMobile && (
          <MobilePhotoList>
            <PhotoListWrapper>
              {getMobilePhotoList().map((photo, index) => (
                <PhotoListItem 
                  key={index}
                  onClick={() => {
                    setCurrentSlide((currentSlide + index) % photos.length);
                    resetAutoplayTimer();
                  }}
                  $active={index === 0}
                >
                  <img src={photo.url} alt={photo.alt} />
                </PhotoListItem>
              ))}
            </PhotoListWrapper>
          </MobilePhotoList>
        )}
      </Container>
      
      {selectedImage && (
        <ImagePreview 
          src={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </>
  );
};

const Container = styled.section`
  padding: 1rem 2rem 4rem 2rem;
  background-color: #f7e7e7;
`;

const AlbumHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const LeafIcon = styled.span`
  width: 100px;
  height: 100px;
  display: block;
  background-image: url('/images/flower.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: -1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h2`
  font-family: ${dancing.style.fontFamily};
  color: rgb(120, 120, 120);
  font-size: 2rem;
  font-weight: 400;
  margin: 0;
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 600px;
  margin: 0 auto;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const SlideWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

const SlideItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  background: white;
  padding: 8px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
`;

const SlideIndicator = styled.div<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
`;

const MobilePhotoList = styled.div`
  display: none;
  width: 100%;
  overflow-x: auto;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const PhotoListWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const PhotoListItem = styled.div<{ $active: boolean }>`
  flex: 0 0 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  border: ${props => props.$active ? '2px solid #fff' : 'none'};
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MobileGridGallery = styled.div`
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 1rem;
  }

  @media (min-width: 769px) {
    max-width: 1200px;
    margin: 0 auto 2rem;
    padding: 0 2rem;
  }
`;

const TopPhotoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  @media (min-width: 769px) {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const MainPhotoColumn = styled.div`
  height: 100%;
`;

const SecondaryPhotoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
`;

const MainPhoto = styled(motion.div)`
  width: 100%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  
  &:before {
    content: '';
    display: block;
    padding-top: calc(133.34% + 0.5rem); // Tổng của 2 ảnh SecondaryPhoto (66.67% * 2) + gap
  }
  
  @media (min-width: 769px) {
    &:before {
      padding-top: calc(133.34% + 1rem); // Điều chỉnh theo gap lớn hơn trên desktop
    }
  }
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.02);
  }
`;

const SecondaryPhoto = styled(motion.div)`
  width: 100%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  
  &:before {
    content: '';
    display: block;
    padding-top: 66.67%; // Tỷ lệ 3:2 cho desktop
  }
  
  @media (max-width: 768px) {
    &:before {
      padding-top: 66.67%; // Giữ tỷ lệ 3:2 cho mobile
    }
  }
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 0 20%;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.02);
  }
`;

const BottomPhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  width: 100%;

  @media (min-width: 769px) {
    gap: 1rem;
  }
`;

const BottomGridItem = styled(motion.div)`
  width: 100%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  
  &:before {
    content: '';
    display: block;
    padding-top: 100%; // Tỷ lệ 1:1
  }
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 0 20%;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ReversedPhotoGrid = styled(TopPhotoGrid)`
  margin-bottom: 0.5rem;
`;

export default PhotoAlbum;