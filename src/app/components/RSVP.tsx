'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { dancing, openSans } from '../fonts';
import Toast from './Toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no';
  numberOfGuests: number;
}

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    attending: 'yes',
    numberOfGuests: 0,
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${baseUrl}/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'rsvp',
          data: formData
        }),
      });

      if (response.ok) {
        setToastMessage('Cảm ơn bạn đã xác nhận tham dự! 🎉');
        setToastType('success');
        setShowToast(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          attending: 'yes',
          numberOfGuests: 0,
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setToastMessage('Có lỗi xảy ra, vui lòng thử lại sau! 😢');
      setToastType('error');
      setShowToast(true);
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <RSVPSection id="rsvp-section">
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      <ContentWrapper>
        <LeafIcon />
        <Title>Xác Nhận Tham Dự</Title>
        <Note>
          Còn chần chờ chi nũa mà không giơ cánh tay lên vote tham gia vui cùng chúng tôi, chị em xanh lá ♥️
        </Note>
        <RSVPForm onSubmit={handleSubmit}>
          <FormGroup>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <select
              name="attending"
              value={formData.attending}
              onChange={handleChange}
            >
              <option value="yes">Sẽ tham dự</option>
              <option value="no">Có việc bận không thể tham dự</option>
            </select>
          </FormGroup>
          {formData.attending === 'yes' && (
            <FormGroup>
              <input
                type="number"
                name="numberOfGuests"
                placeholder="Số người đi cùng (nếu có)"
                value={formData.numberOfGuests || ''}
                onChange={handleChange}
                min="0"
                max="10"
              />
            </FormGroup>
          )}
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                Đang gửi xác nhận
                <LoadingDot>.</LoadingDot>
                <LoadingDot>.</LoadingDot>
                <LoadingDot>.</LoadingDot>
              </>
            ) : (
              'Xác Nhận'
            )}
          </SubmitButton>
        </RSVPForm>
      </ContentWrapper>
    </RSVPSection>
  );
};

const RSVPSection = styled.section`
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

const RSVPForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;

  input, select, textarea {
    width: 100%;
    /* max-width: 400px; */
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: ${openSans.style.fontFamily};
    color: #666;
    background-color: white;
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #D4AF37;
    }
  }

  select {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
    padding-right: 2.5rem;

    option {
      padding: 0.8rem;
      font-size: 1rem;
      color: #666;
    }
  }

  @media (max-width: 768px) {
    input, select, textarea {
      font-size: 16px;
      max-width: 100%;
    }
  }
`;

const LoadingDot = styled.span`
  @keyframes blink {
    0% { opacity: .2; }
    20% { opacity: 1; }
    100% { opacity: .2; }
  }

  animation: blink 1.4s infinite both;
  &:nth-child(2) { animation-delay: .2s; }
  &:nth-child(3) { animation-delay: .4s; }
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
  min-width: 120px;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #B4941F;
  }
`;

const Note = styled.p`
  font-family: ${openSans.style.fontFamily};
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 0.5rem;
  }
`;

export default RSVP; 