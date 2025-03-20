'use client';

import React from 'react';
import styled from 'styled-components';
import { dancing } from '../fonts';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const InvitationContent: React.FC = () => {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('guest') || 'Tên người mời';

  return (
    <InvitationSection>
      <ContentWrapper
        as={motion.div}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <LeafIcon
          as={motion.span}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <Title
          as={motion.h2}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Trân Trọng Kính Mời
        </Title>
        <GuestName
          as={motion.h3}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {decodeURIComponent(guestName)}
        </GuestName>
        <InvitationText
          as={motion.p}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          Đến dự buổi tiệc chung vui cùng chị em xanh lá
        </InvitationText>
        <InvitationText
          as={motion.p}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
         </InvitationText>
      </ContentWrapper>
    </InvitationSection>
  );
};

// Tách component chính ra để wrap bằng Suspense
const Invitation: React.FC = () => {
  return (
    <React.Suspense fallback={<InvitationSkeleton />}>
      <InvitationContent />
    </React.Suspense>
  );
};

// Component skeleton loading
const InvitationSkeleton = () => {
  return (
    <InvitationSection>
      <ContentWrapper>
        <LeafIcon />
        <Title>Trân Trọng Kính Mời</Title>
        <GuestName>Đang tải...</GuestName>
        <InvitationText>Đến dự buổi tiệc chung vui cùng gia đình.</InvitationText>
        <InvitationText>Sự hiện diện của quý khách là niềm vinh dự cho gia đình chúng tôi !</InvitationText>
      </ContentWrapper>
    </InvitationSection>
  );
};

const InvitationSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f7e7e7;

  @media (max-width: 768px) {
    margin-top: -82px;
  }
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
  margin: 0 0 1.5rem 0;
`;

const GuestName = styled.h3`
  font-family: ${dancing.style.fontFamily};
  color: #D4AF37;
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const InvitationText = styled.p`
  font-family: ${dancing.style.fontFamily};
  color: rgb(120, 120, 120);
  font-size: 1.5rem;
  margin-top: 1rem;
  font-weight: 400;
`;

export default Invitation; 