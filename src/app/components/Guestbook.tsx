'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { dancing, openSans } from '../fonts';
import Toast from './Toast';

interface Wish {
  name: string;
  message: string;
  date: string;
}

interface NewWish {
  name: string;
  message: string;
}

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      name: "Văn A",
      message: "!",
      date: "2024-03-15"
    }
  ]);

  const [newWish, setNewWish] = useState<NewWish>({
    name: '',
    message: ''
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'guestbook',
          data: {
            ...newWish,
            date: new Date().toISOString()
          }
        }),
      });

      if (response.ok) {
        const wish: Wish = {
          ...newWish,
          date: new Date().toISOString().split('T')[0]
        };
        setWishes([wish, ...wishes]);
        setNewWish({ name: '', message: '' });
        setToastMessage(' ❤️');
        setToastType('success');
        setShowToast(true);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setToastMessage('Có lỗi xảy ra, vui lòng thử lại sau! 😢');
      setToastType('error');
      setShowToast(true);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GuestbookSection>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      <ContentWrapper>
        <LeafIcon />
        <Title>Sổ Lưu Bút</Title>
        <WishForm onSubmit={handleSubmit}>
          <FormGroup>
            <input
              type="text"
              placeholder="Tên của bạn"
              value={newWish.name}
              onChange={(e) => setNewWish({...newWish, name: e.target.value})}
              required
            />
          </FormGroup>
          <FormGroup>
            <textarea
              placeholder="Lời chúc"
              value={newWish.message}
              onChange={(e) => setNewWish({...newWish, message: e.target.value})}
              required
              rows={4}
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Đang gửi lời chúc...' : 'Gửi Lời Chúc'}
          </SubmitButton>
        </WishForm>
      </ContentWrapper>
    </GuestbookSection>
  );
};

const GuestbookSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f7e7e7;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const LeafIcon = styled.span`
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
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
  margin: 0 0 2rem 0;
`;

const WishForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  input, textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: ${openSans.style.fontFamily};

    &:focus {
      outline: none;
      border-color: #D4AF37;
    }
  }
`;

const SubmitButton = styled.button`
  background-color: #D4AF37;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #B4941F;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default Guestbook; 
