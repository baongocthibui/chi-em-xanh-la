'use client';

import React from 'react';
import styled from 'styled-components';
import { dancing, openSans } from '../fonts';

const Message: React.FC = () => {
  return (
    <MessageSection>
      <ContentWrapper>
        <LeafIcon />
        <Title>Lời Ngỏ</Title>
        <MessageText>
        Chị em phụ nữ chung tần số là những người bạn không chỉ hiểu bạn mà còn giúp bạn trở nên tốt hơn mỗi ngày. .
          <br /><br />
          Họ là những người bạn cùng bạn cười đến đau bụng, cùng bạn vượt qua mọi thử thách và cùng nhau phát triển. Tình bạn này giống như một cuộc hành trình đầy màu sắc, nơi mỗi ngày đều là một cơ hội để học hỏi và tiến bộ
          <br /><br />
          Một lần nữa, chân thành cảm ơn tất cả các chị em đã dành cho nhau góc nào đó cùng hiện diện với nhau trong cuộc sống.一期一会, cuộc sống là vô thường, nhất kỳ nhất hội, hãy trân trọng những người bạn hiện diện quanh ta  ❤️
        </MessageText>
      </ContentWrapper>
    </MessageSection>
  );
};

const MessageSection = styled.section`
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

const MessageText = styled.p`
  font-family: ${openSans.style.fontFamily};
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

export default Message; 