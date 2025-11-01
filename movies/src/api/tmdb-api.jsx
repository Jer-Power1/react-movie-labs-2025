export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};


export const getMovie = (args) => {
  //console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};


  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTrendingThisWeek=() => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
  .then((response) => {
    if(!response.ok){
      return response.json().then((error) => {
        throw new Error(error.status_message|| "Something wnt wrong");
      });

    }
    return response.json();
  })
  .catch((error) => {throw error; });
};

export const getCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
     `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.status_message || "Failed to fetch credits");
      }
      return res.json();
    });
};

export const getTopRatedMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then(async (res) => {
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.status_message || "Something went wrong");
      }
      return res.json();
    });
};

export const getLowestRatedMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&sort_by=vote_average.asc&vote_count.gte=200&page=1`
  )
    .then(async (res) => {
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.status_message || "Something went wrong");
      }
      return res.json();
    });
};

export const getRecommendations = ({ queryKey }) => {
  const [, { id }] = queryKey;
   return fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
   )
   .then(async (res) => {
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.status_message || "Failed to fetch recommendations");
    }
    return res.json();
    });
};

export const getPerson = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then(async (res) => {
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.status_message || "Failed to fetch person");
    }
    return res.json();
  });
};

export const getPersonMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then(async (res) => {
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.status_message || "Failed to fetch person credits");
    }
    return res.json();
  });
};
