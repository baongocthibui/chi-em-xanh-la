'use client';

import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { dancing } from '../fonts';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GiftModal: React.FC<GiftModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <CloseButton onClick={onClose}>×</CloseButton>
           
            <Subtitle>X❤</Subtitle>

            <GiftSection>
              <GiftColumn>
                <GiftTitle></GiftTitle>
                <QRImage src="" alt="" />
              </GiftColumn>

              <GiftColumn>
                <GiftTitle></GiftTitle>
                <QRImage src="" alt="" />
              </GiftColumn>
            </GiftSection>
          </ModalContent>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  position: relative;

  @media (max-width: 480px) {
    width: 89%;
    padding: 0rem;
  }

  @media (max-width: 375px) {
    width: 85%;
    height: 95%;
    padding: 0rem;
    
    img {
      width: 60%;
      height: auto;
    }

    p {
      margin-bottom: 0.2rem;
      font-size: 1rem;
    }
    h3 {
      margin: 0.2rem;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Title = styled.h2`
  font-family: ${dancing.style.fontFamily};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Subtitle = styled.p`
  width: 80%;
  margin: 0 auto;
  font-family: ${dancing.style.fontFamily};
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const GiftSection = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 375px) {
    gap: 1.2rem;
  }
`;

const GiftColumn = styled.div`
  flex: 1;
  min-width: 250px;
  text-align: center;

  @media (max-width: 375px) {
    min-width: 150px;
  }
`;

const GiftTitle = styled.h3`
  font-family: ${dancing.style.fontFamily};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const QRImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export default GiftModal; 