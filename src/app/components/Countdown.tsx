'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  weddingDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(weddingDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <CountdownWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="countdown-container"
      >
        <div className="countdown-item">
          <span className="number">{timeLeft.days}</span>
          <span className="label">Ngày</span>
        </div>
        <div className="countdown-item">
          <span className="number">{timeLeft.hours}</span>
          <span className="label">Giờ</span>
        </div>
        <div className="countdown-item">
          <span className="number">{timeLeft.minutes}</span>
          <span className="label">Phút</span>
        </div>
        <div className="countdown-item">
          <span className="number">{timeLeft.seconds}</span>
          <span className="label">Giây</span>
        </div>
      </motion.div>
    </CountdownWrapper>
  );
};

const CountdownWrapper = styled.div`
  margin: 2rem 0;

  .countdown-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }

  .countdown-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    min-width: 80px;

    .number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #fff;
    }

    .label {
      font-size: 0.9rem;
      color: #fff;
      margin-top: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    .countdown-container {
      gap: 1rem;
    }

    .countdown-item {
      min-width: 60px;
      padding: 0.8rem;

      .number {
        font-size: 1.8rem;
      }

      .label {
        font-size: 0.8rem;
      }
    }
  }
`;

export default Countdown; 