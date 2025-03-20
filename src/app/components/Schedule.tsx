'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { dancing, play, openSans } from '../fonts';

interface Event {
  date: string;
  time: string;
  title: string;
  location: string;
  mapUrl: string;
  description: string;
}

const Schedule: React.FC = () => {
  const events: Event[] = [
    {
      date: '',
      time: '',
      title: 'Địa điềm',
      location: '',
      mapUrl: '',
      description: ''
    },
    {
      date: '',
      time: '',
      title: '',
      location: '',
      mapUrl: '',
      description: ''
    }
  ];

  return (
    <ScheduleSection id="wedding-schedule">
      <ContentWrapper>
        <LeafIcon />
        <Title>Sự Kiện</Title>
        <Timeline>
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <EventItem>
                <div className="event-time">
                  <h3>{event.date}</h3>
                  <p>{event.time}</p>
                </div>
                <div className="event-content">
                  <EventTitle>{event.title}</EventTitle>
                  <LocationWrapper>
                    <MapLink href={event.mapUrl} target="_blank" rel="noopener noreferrer">
                      <MapIcon>📍</MapIcon>
                    </MapLink>
                    <EventText>{event.location}</EventText>
                  </LocationWrapper>
                  <EventText>{event.description}</EventText>
                </div>
              </EventItem>
            </motion.div>
          ))}
        </Timeline>
      </ContentWrapper>
    </ScheduleSection>
  );
};

const ScheduleSection = styled.section`
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

const Timeline = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding: 0 1rem;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    padding: 0 0.5rem;
    
    &::before {
      left: 20px;
    }
  }
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  p {
    margin: 0;
  }
`;

const MapLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`;

const MapIcon = styled.span`
  font-size: 1.2rem;
  cursor: pointer;
  display: inline-block;
  animation: ${shake} 1s ease-in-out infinite;

  &:hover {
    animation: none;
    transform: scale(1.2);
  }
`;

const EventTitle = styled.h4`
  font-family: ${play.style.fontFamily};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const EventText = styled.p`
  font-family: ${openSans.style.fontFamily};
  color: #666;
  margin-bottom: 0.3rem;
`;

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;

  .event-time {
    width: 45%;
    text-align: right;
    padding-right: 2rem;

    h3 {
      font-size: 1.2rem;
      color: #D4AF37;
      margin-bottom: 0.5rem;
    }
  }

  .event-content {
    width: 45%;
    text-align: left;
    padding-left: 2rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 3px solid #D4AF37;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 50px;
    margin-bottom: 2.5rem;

    .event-time,
    .event-content {
      width: 100%;
      text-align: left;
      padding: 0;
    }

    .event-time {
      margin-bottom: 0.5rem;
    }

    &::before {
      left: 20px;
    }
  }
`;

export default Schedule; 