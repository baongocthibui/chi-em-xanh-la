'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { dancing, openSans, play } from '../fonts';
import ImagePreview from './ImagePreview';
import { motion } from 'framer-motion';

const OurStory: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const timelineData = [
    {
      image: '/images/our-story/lovestory-1.jpg',
      alt: 'First Met',
      date: '',
      heading: 'Lần đầu gặp nhau',
      text: 'Nhóm chị em có cuộc sống khác biệt tình cờ gặp nhau trong một lớp Zumba, nơi những điệu nhảy sôi động đã hòa trộn họ thành một. Từ những buổi tập đầy mồ hôi và tiếng cười, họ dần khám phá ra "tần số chung" - không chỉ trong nhịp điệu mà còn trong tâm hồn. Khi cuộc sống bên ngoài có muôn vàn thử thách, sàn nhảy Zumba trở thành nơi trú ẩn an toàn, nơi họ tiếp thêm sức mạnh cho nhau bằng những động tác đồng điệu. Mỗi bước nhảy là một câu chuyện được kể, mỗi buổi tập là một kết nối sâu sắc thêm, và dù khác biệt thế nào, họ luôn tìm thấy nhau trong cùng một nhịp đập. "Chị Em Xanh Lá" không chỉ là một nhóm bạn nhảy, mà là một gia đình thứ hai, nơi niềm vui được nhân lên và nỗi buồn được sẻ chia qua những vũ điệu đầy năng lượng'
    },
    {
      image: '/images/our-story/lovestory-2.jpg', 
      alt: 'Từ Zumba đến cuộc sống',
      date: '',
      heading: 'Từ Zumba đến cuộc sống',
      text: 'Những buổi tụ tập ăn uống sau giờ tập Zumba của nhóm chị em luôn tràn ngập tiếng cười với những màn "bóc phốt" nghề nghiệp không thể hài hước hơn. Bàn tiệc biến thành "sân khấu hài kịch" khi mỗi người đều có cách kể chuyện dở khóc dở cười về công việc chuyên môn của mình. Những kinh nghiệm sống được chia sẻ theo kiểu "cười ra nước mắt",  cả nhóm vừa được giải trí vừa học được bài học mà không ai cảm thấy bị thuyết giáo. Không có gì tạo nên tình bạn bền chặt hơn việc cùng nhau cười nghiêng ngả trước những thử thách cuộc sống, biến những áp lực thường ngày thành những câu chuyện vui vẻ để kể lại mỗi khi hội ngộ.'
    },
    {
      image: '/images/our-story/lovestory-3.jpg',
      alt: 'Cười cùng nhau', 
      date: '',
      heading: 'Cùng nhau tạo kỷ niệm',
      text: 'Mỗi chị em đều là những "nghệ sĩ" tài năng trong việc tạo ra những kỷ niệm vui nhộn.Những buổi tối họp mặt, họ biến phòng khách thành sân khấu karaoke, nơi mà giọng hát "oanh vàng" của mỗi thành viên luôn là tiết mục được mong chờ nhất. Cô đôi thượng ngàn, nhóm thiên thần bóng tối,.. chắc sẽ là những tiết mục không chị em nào có thể quên. Những kỷ niệm ấy không chỉ mang lại tiếng cười mà còn là chất keo gắn kết tình bạn của họ thêm bền chặt.'
    },
    {
      image: '/images/our-story/lovestory-4.jpg',
      alt: 'Mãi bên nhau bạn nhé',
      date: '',
      heading: 'Mãi bên nhau bạn nhé',
      text: 'Mãi bên nhau bạn nhé! Chúng ta sẽ luôn là nhóm nhảy vui nhộn nhất, dù không ai nhớ nổi bước nhảy. Cùng nhau tạo thêm nhiều kỷ niệm hài hước và cười lăn lộn nhé! Chúng mình cùng già đi rồi cùng nhau nhìn lại kỷ niệm. Chúng ta chọn hạnh phúc dù trong bất kỳ hoàn cảnh nào" 😄 '
    }
  ];

  return (
    <>
      <StorySection id="story">
        <ContentWrapper>
          <LeafIcon />
          <Title>Our Friendship Story</Title>
          
          <TimelineWrapper>
            {timelineData.map((item, index) => (
              <TimelineItem key={index}>
                <motion.div
                  className="timeline-image"
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.5 }}
                >
                  <TimelineImage 
                    src={item.image} 
                    alt={item.alt}
                    onClick={() => setSelectedImage(item.image)}
                  />
                </motion.div>
                <motion.div
                  className="timeline-content"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.5 }}
                >
                  <TimelineContent>
                    <TimelineDate>{item.date}</TimelineDate>
                    <TimelineHeading>{item.heading}</TimelineHeading>
                    <TimelineText>{item.text}</TimelineText>
                  </TimelineContent>
                </motion.div>
              </TimelineItem>
            ))}
          </TimelineWrapper>
        </ContentWrapper>
      </StorySection>

      {selectedImage && (
        <ImagePreview 
          src={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </>
  );
};

const StorySection = styled.section`
  padding: 0rem 2rem 2rem 2rem;
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

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
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

const TimelineWrapper = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background-color: #b45b35;
  }
`;

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 4rem;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 0rem;
  }
  
  &::after {
    content: '❤️';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #b45b35;
    font-size: 24px;
    background: white;
    padding: 5px;
  }

  .timeline-content {
    grid-column: 2;
    text-align: left;
  }
  .timeline-image {
    grid-column: 1;
  }
`;

const TimelineImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: 0 20%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    height: 140px;
    object-position: 0 20%;
  }

  &:hover {
    transform: scale(1.02);
  }
`;

const TimelineContent = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${openSans.style.fontFamily};
  font-size: 18px;
`;

const TimelineDate = styled.div`
  font-size: 1.2rem;
  color: #b45b35;
  margin-bottom: 0.5rem;
  font-family: ${openSans.style.fontFamily};

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const TimelineHeading = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 1rem;
  font-family: ${play.style.fontFamily};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TimelineText = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
  font-family: ${openSans.style.fontFamily};

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export default OurStory;
