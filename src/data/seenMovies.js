import remove from 'lodash/remove';
import { compare } from './utils';

const LOCAL_STORAGE_KEY = 'seenMovies';

export const addMovieToSeen = (movie) => {
    const currentMovies = getSeen();
    currentMovies.push(movie);
    localStorage.setItem('seenMovies', JSON.stringify(currentMovies));
    return getSeen();
};

export const removeMovieFromSeen = (movie) => {
    const currentMovies = getSeen();
    remove(currentMovies, title => title === movie);
    localStorage.setItem('seenMovies', JSON.stringify(currentMovies));
    return getSeen();
};

export const getSeen = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

export const markSeen = (movies, seenMovies) => movies.map(({ title, ...others }) => ({
    title,
    seen: seenMovies.findIndex(movie => compare(movie, title)) > -1,
    ...others,
}));