'use client';

import { useEffect, useState } from 'react';
import styles from './HeartRain.module.css';

interface Heart {
  id: string;
  left: number;
  animationDuration: number;
}

export default function HeartRain() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Tạo hiệu ứng burst ban đầu
    const createInitialBurst = () => {
      const TOTAL_HEARTS = 100; // Giảm xuống 100 tim
      const BATCH_SIZE = 20; // Giảm batch size để phù hợp với tổng số tim
      const TOTAL_BATCHES = Math.ceil(TOTAL_HEARTS / BATCH_SIZE);

      // Tạo hearts theo từng batch
      for (let batch = 0; batch < TOTAL_BATCHES; batch++) {
        setTimeout(() => {
          const start = batch * BATCH_SIZE;
          const end = Math.min(start + BATCH_SIZE, TOTAL_HEARTS);
          
          for (let i = start; i < end; i++) {
            const id = `${Date.now()}-${Math.random()}-${i}`;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2; // 2-5 giây
            
            setTimeout(() => {
              setHearts(prev => [...prev, { id, left, animationDuration }]);
              
              setTimeout(() => {
                setHearts(prev => prev.filter(heart => heart.id !== id));
              }, animationDuration * 1000);
            }, Math.random() * 600); // Giảm delay xuống 600ms
          }
        }, batch * 60); // Giảm thời gian giữa các batch xuống 60ms
      }
    };

    // Tạo hearts với tần suất thay đổi theo thời gian
    const createHeart = () => {
      const id = `${Date.now()}-${Math.random()}`;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;

      setHearts(prev => [...prev, { id, left, animationDuration }]);

      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== id));
      }, animationDuration * 1000);
    };

    // Tạo burst effect ngay khi component mount
    createInitialBurst();

    // Tạo hearts với tần suất giảm dần trong 5s đầu
    let interval: NodeJS.Timeout;
    let currentInterval = 100; // Bắt đầu với tần suất cao (100ms)
    const finalInterval = 300; // Tần suất cuối cùng (300ms)
    
    const startHeartCreation = () => {
      interval = setInterval(() => {
        createHeart();
        
        // Tăng dần interval trong 5s đầu
        if (currentInterval < finalInterval) {
          clearInterval(interval);
          currentInterval += 40; // Tăng dần interval
          startHeartCreation();
        }
      }, currentInterval);
    };

    startHeartCreation();

    // Sau 5s, chuyển sang tần suất ổn định
    setTimeout(() => {
      clearInterval(interval);
      interval = setInterval(createHeart, finalInterval);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {hearts.map(heart => (
        <div
          key={heart.id}
          className={styles.heart}
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.animationDuration}s`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
} 