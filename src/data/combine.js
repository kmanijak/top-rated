import { compare } from './utils';

const SERVICES = {
    FILMWEB: 'filmweb',
    IMDB: 'imdb',
    METACRITIC: 'metacritic',
    ROTTEN_TOMATOES: 'rottenTomatoes',
};

const TOP_SCORE = {
    METACRITIC: 10,
    ROTTEN_TOMATOES: 10,
};

const addMissingKeys = (key) => {
    if (key === SERVICES.FILMWEB) {
        return { [SERVICES.IMDB]: null, [SERVICES.METACRITIC]: null, [SERVICES.ROTTEN_TOMATOES]: null };
    }
    if (key === SERVICES.IMDB) {
        return { [SERVICES.FILMWEB]: null, [SERVICES.METACRITIC]: null, [SERVICES.ROTTEN_TOMATOES]: null };
    }
    if (key === SERVICES.METACRITIC) {
        return { [SERVICES.FILMWEB]: null, [SERVICES.IMDB]: null, [SERVICES.ROTTEN_TOMATOES]: null };
    }
    if (key === SERVICES.ROTTEN_TOMATOES) {
        return { [SERVICES.FILMWEB]: null, [SERVICES.IMDB]: null, [SERVICES.METACRITIC]: null };
    }
};

const updateBase = (currentBase, newList, key) => (
    newList.reduce((list, { title, year, ...others }) => {
        const index = list.findIndex(movie => compare(movie.title, title));

        if (index > -1) {
            list[index][key] = others;
        } else {
            list.push({
                title,
                year,
                [key]: others,
                ...addMissingKeys(key),
            })
        }
        return list;
    }, currentBase)
);

const getRating = (service) => service ? service.rating : '';

const calculateScore = (movies) => (
    movies.map(movie => {
        const { filmweb, imdb, metacritic, rottenTomatoes } = movie;
        const fw = getRating(filmweb).replace(',', '.') || '5';
        const id = getRating(imdb) || '5';
        const mc = getRating(metacritic) / TOP_SCORE.ROTTEN_TOMATOES || '5';
        const rt = getRating(rottenTomatoes) / TOP_SCORE.ROTTEN_TOMATOES || '5';

        const averageRating = ( Number(fw) + Number(id) + Number(mc) + Number(rt) ) / 4;

        return { ...movie, averageRating };
    })
);

export default ({ filmweb, imdb, metacritic, rottenTomatoes }) => {
    const withFilmweb = updateBase([], filmweb, SERVICES.FILMWEB);
    const withImdb = updateBase(withFilmweb, imdb, SERVICES.IMDB);
    const withMetacritic = updateBase(withImdb, metacritic, SERVICES.METACRITIC);
    const withRottenTomatoes = updateBase(withMetacritic, rottenTomatoes, SERVICES.ROTTEN_TOMATOES);

    return calculateScore(withRottenTomatoes);
};