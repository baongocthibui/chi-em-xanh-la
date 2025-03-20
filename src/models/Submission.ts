import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  type: String,
  data: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema); 