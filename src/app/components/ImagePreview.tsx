'use client';

import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
`;

interface ImagePreviewProps {
  src: string;
  onClose: () => void;
}

export default function ImagePreview({ src, onClose }: ImagePreviewProps) {
  return (
    <Overlay onClick={onClose}>
      <CloseButton onClick={onClose}>
        <IoClose />
      </CloseButton>
      <Image src={src} alt="Image Preview" onClick={(e) => e.stopPropagation()} />
    </Overlay>
  );
} 