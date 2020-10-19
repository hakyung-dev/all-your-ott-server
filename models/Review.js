const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    content: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
);

module.exports = mongoose.model('Review', reviewSchema);
