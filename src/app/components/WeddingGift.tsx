/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface BankAccount {
  bank: string;
  accountName: string;
  accountNumber: string;
  branch: string;
}

const WeddingGift: React.FC = () => {
  const bankAccounts: BankAccount[] = [
    {
      bank: "Vietcombank",
      accountName: "NGUYEN XUAN THINH",
      accountNumber: "1234567890",
      branch: "Chi nhánh Nghệ An"
    },
    {
      bank: "MB Bank",
      accountName: "NGUYEN THI DIEM HANG",
      accountNumber: "0987654321",
      branch: "Chi nhánh Hà Nội"
    }
  ];

  const handleCopyClick = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Đã sao chép số tài khoản!');
    } catch (err) {
      console.error('Không thể sao chép:', err);
    }
  };

  return (
    <GiftSection>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Mừng Cưới
      </motion.h2>
      <p className="gift-intro">
        Sự hiện diện của bạn là niềm vinh hạnh với gia đình chúng tôi.
        Nếu bạn muốn gửi quà mừng, vui lòng tham khảo thông tin bên dưới:
      </p>

      <BankAccountsGrid>
        {bankAccounts.map((account, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <BankCard>
              <BankLogo>
                <img 
                  src={`/images/${account.bank.toLowerCase()}-logo.png`} 
                  alt={account.bank} 
                />
              </BankLogo>
              <BankInfo>
                <h4>{account.bank}</h4>
                <p><strong>Chủ tài khoản:</strong> {account.accountName}</p>
                <p><strong>Số tài khoản:</strong> {account.accountNumber}</p>
                <p><strong>Chi nhánh:</strong> {account.branch}</p>
              </BankInfo>
              <CopyButton onClick={() => handleCopyClick(account.accountNumber)}>
                Sao chép STK
              </CopyButton>
            </BankCard>
          </motion.div>
        ))}
      </BankAccountsGrid>

      <QRCodeSection>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Quét mã QR
        </motion.h3>
        <div className="qr-codes">
          {bankAccounts.map((account, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="qr-code"
            >
              <img 
                src={`/images/${account.bank.toLowerCase()}-qr.png`} 
                alt={`QR Code ${account.bank}`} 
              />
              <p>{account.bank}</p>
            </motion.div>
          ))}
        </div>
      </QRCodeSection>
    </GiftSection>
  );
};

const GiftSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;
  text-align: center;

  h2 {
    margin-bottom: 1.5rem;
  }

  .gift-intro {
    max-width: 600px;
    margin: 0 auto 3rem;
    color: #666;
  }
`;

const BankAccountsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const BankCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BankLogo = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const BankInfo = styled.div`
  text-align: left;
  width: 100%;
  margin: 1rem 0;

  h4 {
    color: #D4AF37;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }
`;

const CopyButton = styled.button`
  background-color: #D4AF37;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #B4941F;
  }
`;

const QRCodeSection = styled.div`
  margin-top: 3rem;

  h3 {
    margin-bottom: 2rem;
  }

  .qr-codes {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 0 1rem;
  }

  .qr-code {
    img {
      width: 180px;
      height: 180px;
      margin-bottom: 0.8rem;

      @media (max-width: 480px) {
        width: 150px;
        height: 150px;
      }
    }
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    
    .qr-codes {
      gap: 1rem;
    }
  }
`;

export default WeddingGift; 