const cheerio = require('cheerio');
const rp = require('request-promise-native');

// replace special characters with hyphens
const normaliseKey = key => key.replace(/\/|\./g, '-');

class SFCinemaCity {

  /*
  Takes a cinema ID and returns the showtimes for them as a JS object
  */
  getShowtimes(cinemaId) {
    return new Promise((resolve, reject) => {
      const options = {
        uri: `https://booking.sfcinemacity.com/visPrintShowTimes.aspx?visLang=1&visCinemaId=${cinemaId}`,
        transform: (body) => cheerio.load(body),
      };

      rp(options)
      /*
      First extract the movie data from the booking.sfcinemacity.com site
      and return an object that has
      title -> date -> times

      e.g.

      'FANTASTIC BEASTS AND WHERE TO FIND THEM (E/ATMOS) [G]':
      { 'Sun 27 Nov': '17:40, 20:30, 23:20',
      'Mon 28 Nov': '12:00, 14:50, 17:40, 20:30, 23:20',
      'Tue 29 Nov': '12:00, 14:50, 17:40, 20:30, 23:20',
      'Wed 30 Nov': '12:00, 14:50, 17:40, 20:30, 23:20' },
      */
      .then(($) => {
        const movieData = {};
        let currentMovie;
        let currentDate;
        $('#tblShowTimes td').each(function process() {
          if ($(this).hasClass('PrintShowTimesFilm')) {
            currentMovie = $(this).text();
            movieData[currentMovie] = {};
          } else if ($(this).hasClass('PrintShowTimesDay')) {
            currentDate = $(this).text();
          } else if ($(this).hasClass('PrintShowTimesSession')) {
            movieData[currentMovie][currentDate] = $(this).text();
          }
        });

        return movieData;
      })
      /*
      Next coalesce the same movies with different languages and sound systems.
      So we have
      movieTitle -> showTimes -> date -> movietype -> times
      */
      .then((movieData) => {
        const coalescedMovieData = {};
        for (const movieName of Object.keys(movieData)) {
          const titleAndLanguage = movieName.match(/(.+) \((.+)\)/);
          const movieTitle = titleAndLanguage[1];
          const language = normaliseKey(titleAndLanguage[2]);
          if (!coalescedMovieData[movieTitle]) {
            coalescedMovieData[movieTitle] = {};
            coalescedMovieData[movieTitle].title = movieTitle;
            coalescedMovieData[movieTitle].showTimes = {};
          }
          for (const movieDate of Object.keys(movieData[movieName])) {
            if (!coalescedMovieData[movieTitle].showTimes[movieDate]) {
              coalescedMovieData[movieTitle].showTimes[movieDate] = {};
            }

            // eslint-disable-next-line max-len
            coalescedMovieData[movieTitle].showTimes[movieDate][language] = movieData[movieName][movieDate];
          }
        }

        resolve(coalescedMovieData);
      })
      .catch((error) => {
        reject(`SF Cinema City error: ${error}`);
      });
    });
  }
}

module.exports = new SFCinemaCity();
