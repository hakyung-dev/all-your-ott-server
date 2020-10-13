const axios = require('axios');

exports.getResult = async (req, res, next) => {
  try {
    const movieInfo = await axios.get(
      `https://openapi.naver.com/v1/search/movie.json`,
      {
        params: {
          query: req.body.title,
          display: 28,
        },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
      }
    );

    res.status(200).json({
      result: movieInfo.data.items,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
