import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import dbConnect from '@/lib/mongodb'

// Sử dụng lại schema từ submit route
const submissionSchema = new mongoose.Schema({
  type: String,
  data: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  }
})

const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema)

export async function GET() {
  try {
    await dbConnect()
    
    // Lấy tất cả submissions có type là 'guestbook'
    const submissions = await Submission.find({ type: 'guestbook' })
      .sort({ timestamp: -1 }) // Sắp xếp theo thời gian mới nhất
      .lean() // Chuyển đổi sang plain JavaScript objects

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching guestbook entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guestbook entries' },
      { status: 500 }
    )
  }
}
