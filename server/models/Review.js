const { Schema } = require('mongoose');

const reviewSchema = new Schema(
  {
    reviews: {
      type: String,
      required: true,
      maxlength: 200
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    //   get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);
const Review = model('Review', reviewSchema);

module.exports = Review;
