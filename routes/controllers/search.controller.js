const axios = require('axios');
const Genre = require('../../data/genre.json');

exports.getResult = async (req, res, next) => {
  try {
    const results = [];
    const movieInfo = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.TMDB_KEY
      }&query=${encodeURI(req.body.query)}&language=ko`
    );

    movieInfo.data.results.map((result) => {
      results.push({
        type: `movie`,
        ...result,
      });
    });

    const tvInfo = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${
        process.env.TMDB_KEY
      }&query=${encodeURI(req.body.query)}&language=ko`
    );

    tvInfo.data.results.map((result) => {
      results.push({
        type: `tv`,
        ...result,
      });
    });

    res.status(200).json({
      result: results,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getGenre = async (req, res, next) => {
  try {
    let genre = [];
    const { type, ids } = req.body;
    const genreData = Genre[type];
    ids.map((id) => {
      const string = genreData.filter((g) => g.id === id)[0];
      if (string) return genre.push(string.name);
    });
    res.status(200).json({
      result: genre,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    const detailResult = await axios.get(
      `https://api.themoviedb.org/3/${req.params.type}/${req.params.content_id}?api_key=${process.env.TMDB_KEY}&append_to_response=videos,images&language=ko`
    );

    const videoResult = await axios.get(
      `https://api.themoviedb.org/3/${req.params.type}/${req.params.content_id}/videos?api_key=${process.env.TMDB_KEY}`
    );

    const imageResult = await axios.get(
      `https://api.themoviedb.org/3/${req.params.type}/${req.params.content_id}/images?api_key=${process.env.TMDB_KEY}`
    );

    const creditResult = await axios.get(
      `https://api.themoviedb.org/3/${req.params.type}/${req.params.content_id}/credits?api_key=${process.env.TMDB_KEY}&language=ko`
    );

    const detail = {
      type: req.params.type,
      id: detailResult.data.id,
      back_img: `https://image.tmdb.org/t/p/original${detailResult.data.backdrop_path}`,
      year: (
        detailResult.data.first_air_date || detailResult.data.release_date
      ).slice(0, 4),
      homepage: detailResult.data.homepage,
      genres: detailResult.data.genres,
      title: detailResult.data.name || detailResult.data.title,
      original_title:
        detailResult.data.original_name || detailResult.data.original_title,
      overview: detailResult.data.overview,
      poster_img: `https://image.tmdb.org/t/p/original${detailResult.data.poster_path}`,
      rating: detailResult.data.vote_average,
      runtime:
        detailResult.data.runtime || detailResult.data.episode_run_time[0],
      seasons:
        detailResult.data.seasons || detailResult.data.belongs_to_collection,
      networks: detailResult.data.networks || null,
      video: videoResult.data.results.find((v) => v.site === 'YouTube') || null,
      images: imageResult.data.backdrops || null,
    };

    const credit = {
      cast: creditResult.data.cast.slice(0, 10),
      director: creditResult.data.crew.find((c) => c.job === 'Director'),
      writer: creditResult.data.crew.find((c) => c.job === 'Screenplay'),
    };

    res.status(200).json({
      detail: detail,
      credit: credit,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
