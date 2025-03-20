'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer>
      <ToastContent type={type}>
        <Icon>{type === 'success' ? '✨' : '❌'}</Icon>
        <Message>{message}</Message>
      </ToastContent>
    </ToastContainer>
  );
};

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  min-width: 300px;
  max-width: 90%;
`;

const ToastContent = styled.div<{ type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background: ${props => props.type === 'success' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 200, 200, 0.95)'};
  border-left: 5px solid ${props => props.type === 'success' ? '#D4AF37' : '#ff4444'};
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.3s ease-out;
  backdrop-filter: blur(5px);
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const Message = styled.p`
  margin: 0;
  color: #333;
  font-size: 1rem;
  font-family: 'Muli', sans-serif;
`;

export default Toast; 