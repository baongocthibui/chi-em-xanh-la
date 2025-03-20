import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';

// Define Schema
const submissionSchema = new mongoose.Schema({
  type: String,
  data: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Get or create model
const SubmissionModel = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { type, data } = body;

    const submissionData = {
      type,
      data,
      timestamp: new Date().toISOString()
    };

    // Lưu dữ liệu sử dụng mongoose
    const submission = new SubmissionModel(submissionData);
    await submission.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
} 