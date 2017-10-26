import trim from 'lodash/trim';
import fetchPage from './fetch';

const rottenTomatoes = 'https://www.rottentomatoes.com/top/bestofrt/';

const rottenTomatoesParser = (rawPage) => {
    const parseMovie = (row) => {
        const rank = row.getElementsByClassName('bold')[0].innerHTML.replace('.', '');
        const rating = row.getElementsByClassName('tMeterScore')[0].innerHTML.replace('&nbsp;', '').replace('%', '');
        const titleYearElement = row.getElementsByClassName('articleLink')[0];
        const titleYear = titleYearElement.innerHTML;
        const link = 'rottentomatoes.com' + titleYearElement.getAttribute('href');
        const title = trim(titleYear.split('(')[0]);
        const year = trim(titleYear.match(/(?:\()(\d+)(?:\))$/)[1]);

        return { rank, rating, link, title, year };
    };

    const parser = new DOMParser();
    const page = parser.parseFromString(rawPage, "text/html");
    const rows = page
        .getElementsByClassName('table')[0]
        .getElementsByTagName('tbody')[0]
        .getElementsByTagName('tr');

    return Array.prototype.map.call(rows, parseMovie);
};

export default () => fetchPage(rottenTomatoes , rottenTomatoesParser);