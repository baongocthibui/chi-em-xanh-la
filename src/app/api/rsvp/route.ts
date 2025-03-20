import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import dbConnect from '@/lib/mongodb'

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
    
    // Lấy tất cả submissions có type là 'rsvp'
    const submissions = await Submission.find({ type: 'rsvp' })
      .sort({ timestamp: -1 })
      .lean()

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching RSVP entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RSVP entries' },
      { status: 500 }
    )
  }
}
