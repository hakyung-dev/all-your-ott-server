const Review = require('../../models/Review');
const User = require('../../models/User');

exports.create = async (req, res, next) => {
  try {
    const review = { creator: req.params.user_id, ...req.body };
    const newReview = new Review(review);
    await newReview.save();
    const user = await User.findByIdAndUpdate(
      req.params.user_id,
      {
        $push: { my_review: newReview._id },
      },
      { new: true }
    ).populate('my_review');
    res.status(201).json({
      result: 'ok',
      review: user.my_review,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.review_id);
    res.status(201).json({
      result: 'ok',
      review: review,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
