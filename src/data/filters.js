export const FILTERS = {
    ALL: 'ALL',
};

const filterAll = (movie) => ({
    add: true, fw: Boolean(movie.filmweb), id: Boolean(movie.imdb), mc: Boolean(movie.metacritic), rt: Boolean(movie.rottenTomatoes),
});

const getFilter = (filter) => {
    switch (filter) {
        case FILTERS.ALL:
            return filterAll;
        default:
            return filterAll;
    }
};

export const filter = (movies, filter) => {
    const filterFn = getFilter(filter);

    return movies.reduce((prev, movie) => {
        const { add, fw, id, mc, rt } = filterFn(movie);
        const { filmweb, imdb, metacritic, rottenTomatoes } = prev;

        if (add) {
            movies.push(movie);
        }

        return {
            movies,
            filmweb: fw ? filmweb + 1 : filmweb,
            imdb: id ? imdb + 1 : imdb,
            metacritic: mc ? metacritic + 1 : metacritic,
            rottenTomatoes: rt ? rottenTomatoes + 1 : rottenTomatoes,
        }
    }, { movies: [], filmweb: 0, imdb: 0, metacritic: 0, rottenTomatoes: 0 });
};