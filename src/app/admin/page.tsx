'use client'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

interface Submission {
  _id: string
  type: string
  data: {
    name: string
    message: string
    email: string
    attending: string
    numberOfGuests: number
  }
  timestamp: string
}

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

const AdminPage = () => {
  const [guestbookEntries, setGuestbookEntries] = useState<Submission[]>([])
  const [rsvpEntries, setRsvpEntries] = useState<Submission[]>([])
  const [activeTab, setActiveTab] = useState<'guestbook' | 'rsvp'>('guestbook')

  useEffect(() => {
    // Fetch guestbook entries
    fetch(`${baseUrl}/api/guestbook`)
      .then(res => res.json())
      .then(data => {
        // Handle empty response or error response
        if (!data) {
          console.error('No guestbook data received')
          setGuestbookEntries([])
          return
        }

        // If data is an object with error message
        if (data.error) {
          console.error('Error in guestbook data:', data.error)
          setGuestbookEntries([])
          return
        }

        // Ensure data is an array before setting state
        const entries = Array.isArray(data) ? data : []
        setGuestbookEntries(entries)
      })
      .catch(err => {
        console.error('Error fetching guestbook entries:', err)
        setGuestbookEntries([])
      })

    // Fetch RSVP entries
    fetch(`${baseUrl}/api/rsvp`)
      .then(res => res.json())
      .then(data => {
        // Handle empty response or error response
        if (!data) {
          console.error('No RSVP data received')
          setRsvpEntries([])
          return
        }

        // If data is an object with error message
        if (data.error) {
          console.error('Error in RSVP data:', data.error)
          setRsvpEntries([])
          return
        }

        // Ensure data is an array before setting state
        const entries = Array.isArray(data) ? data : []
        setRsvpEntries(entries)
      })
      .catch(err => {
        console.error('Error fetching RSVP entries:', err)
        setRsvpEntries([])
      })
  }, [])

  const handleDeleteGuestbook = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này?')) {
      try {
        await fetch(`${baseUrl}/api/guestbook/${id}`, {
          method: 'DELETE',
        })
        setGuestbookEntries(entries => entries.filter(entry => entry._id !== id))
      } catch (error) {
        console.error('Error deleting guestbook entry:', error)
      }
    }
  }

  const handleDeleteRSVP = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này?')) {
      try {
        await fetch(`${baseUrl}/api/rsvp/${id}`, {
          method: 'DELETE',
        })
        setRsvpEntries(entries => entries.filter(entry => entry._id !== id))
      } catch (error) {
        console.error('Error deleting RSVP entry:', error)
      }
    }
  }

  return (
    <AdminContainer>
      <Header>
        <h1>Trang Quản Trị</h1>
        <TabContainer>
          <Tab 
            key="guestbook-tab"
            $active={activeTab === 'guestbook'} 
            onClick={() => setActiveTab('guestbook')}
          >
            Sổ Lưu Bút
          </Tab>
          <Tab 
            key="rsvp-tab"
            $active={activeTab === 'rsvp'} 
            onClick={() => setActiveTab('rsvp')}
          >
            Xác Nhận Tham Dự
          </Tab>
        </TabContainer>
      </Header>

      {activeTab === 'guestbook' && (
        <Section>
          <h2>Danh Sách Lưu Bút ({guestbookEntries.length})</h2>
          <Table>
            <thead>
              <tr>
                <Th>Tên</Th>
                <Th>Lời Nhắn</Th>
                <Th>Thời Gian</Th>
                <Th>Hành Động</Th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(guestbookEntries) && guestbookEntries.map((entry, index) => (
                <tr key={`guestbook-${entry._id}-${index}`}>
                  <Td>{entry.data.name}</Td>
                  <Td>{entry.data.message}</Td>
                  <Td>{new Date(entry.timestamp).toLocaleString('vi-VN')}</Td>
                  <Td>
                    <DeleteButton onClick={() => handleDeleteGuestbook(entry._id)}>
                      Xóa
                    </DeleteButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      )}

      {activeTab === 'rsvp' && (
        <Section>
          <h2>Danh Sách Xác Nhận Tham Dự ({rsvpEntries.length})</h2>
          <Table>
            <thead>
              <tr>
                <Th>Tên</Th>
                <Th>Email</Th>
                <Th>Tham Dự</Th>
                <Th>Số Khách</Th>
                <Th>Lời Nhắn</Th>
                <Th>Thời Gian</Th>
                <Th>Hành Động</Th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(rsvpEntries) && rsvpEntries.map((entry, index) => (
                <tr key={`rsvp-${entry._id}-${index}`}>
                  <Td>{entry.data.name}</Td>
                  <Td>{entry.data.email}</Td>
                  <Td>{entry.data.attending === 'yes' ? 'Có' : 'Không'}</Td>
                  <Td>{entry.data.numberOfGuests}</Td>
                  <Td>{entry.data.message}</Td>
                  <Td>{new Date(entry.timestamp).toLocaleString('vi-VN')}</Td>
                  <Td>
                    <DeleteButton onClick={() => handleDeleteRSVP(entry._id)}>
                      Xóa
                    </DeleteButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      )}
    </AdminContainer>
  )
}

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.header`
  margin-bottom: 2rem;
  text-align: center;
`

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${props => props.$active ? '#D4AF37' : '#f0f0f0'};
  color: ${props => props.$active ? 'white' : 'black'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$active ? '#D4AF37' : '#e0e0e0'};
  }
`

const Section = styled.section`
  margin-top: 2rem;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: #f8f8f8;
  border-bottom: 2px solid #eee;
`

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc0000;
  }
`

export default AdminPage