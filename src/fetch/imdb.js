import trim from 'lodash/trim'
import fetchPage from './fetch';

const imdb = 'http://www.imdb.com/chart/top';

const imdbParser = (rawPage) => {
    const parseMovie = (row) => {
        const rankTitleYearElement = row.getElementsByClassName('titleColumn')[0];
        const titleYearElement = rankTitleYearElement.getElementsByTagName('a')[0];
        const rank = trim(rankTitleYearElement.textContent.split('.')[0]);
        const rating = row
            .getElementsByClassName('ratingColumn')[0]
            .getElementsByTagName('strong')[0]
            .innerHTML;
        const link = titleYearElement.getAttribute('href');
        const title = titleYearElement.innerHTML;
        const year = rankTitleYearElement
            .getElementsByClassName('secondaryInfo')[0]
            .innerHTML
            .replace('(', '')
            .replace(')', '');

        return { rank, rating, link, title, year };
    };

    const parser = new DOMParser();
    const page = parser.parseFromString(rawPage, "text/html");
    const table = page.getElementsByClassName('lister-list')[0];
    const rows = table.getElementsByTagName('tr');

    return Array.prototype.map.call(rows, parseMovie);
};

export default () => fetchPage(imdb, imdbParser);