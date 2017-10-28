import deburr from 'lodash/deburr';

const normalize = (string) => deburr(string.toLowerCase().replace(/[^A-Z0-9]/ig, ''));

export const compare = (string1, string2) => (
    normalize(string1) === normalize(string2)
);

export const countMovies = (movies, service) => movies.filter(movie => Boolean(movie[service])).length;