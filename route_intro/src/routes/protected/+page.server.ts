/** @type {import('./$types').PageServerLoad} */
/** @type {import('./$types').Actions} */
import { TMDB_API_KEY } from "$env/static/private";
// import "dotenv/config";

// load function from pageserverload
export const load = async () => {
  //   console.log(cookies); only returns the functoins associated with cookies

  console.log("Server Load Ran");
  const fetchMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
      );
      const data = await res.json();
      return data.results;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return {
    movies: await fetchMovies(), // returning in this mannser allows to return multiple async functions which run parallely to prevent waterfall
  };
};
