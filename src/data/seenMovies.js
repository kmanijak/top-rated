import remove from 'lodash/remove';

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