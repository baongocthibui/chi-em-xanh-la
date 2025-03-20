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

export async function DELETE(
  request: Request,
  { params } : { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    
    const { id } = await params;
    const result = await Submission.findByIdAndDelete(id)
    
    if (!result) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting RSVP entry:', error)
    return NextResponse.json(
      { error: 'Failed to delete entry' },
      { status: 500 }
    )
  }
}