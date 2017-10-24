import fetchPage from './fetch';

const filmweb = 'http://www.filmweb.pl/ranking/film';

const filmwebPraser = (rawPage) => {
    const parseMovie = (row) => {
        const titleLinkElement = row.getElementsByClassName('film__link')[0];
        const rank = row.getElementsByClassName('ranking__position')[0].innerHTML;
        const rating = row.getElementsByClassName('rate__value')[0].innerHTML;
        const link = 'filmweb.pl' + titleLinkElement.getAttribute('href');
        const titlePL = titleLinkElement.innerHTML;
        const originalTitleElement = row.getElementsByClassName('film__original')[0];
        const title = originalTitleElement ? originalTitleElement.innerHTML : titlePL;
        const year = row
            .getElementsByClassName('film__production-year')[0]
            .innerHTML
            .replace('(', '')
            .replace(')', '');

        return { rank, rating, link, title, titlePL, year };
    };

    const parser = new DOMParser();
    const page = parser.parseFromString(rawPage, "text/html");
    const rows = page.getElementsByClassName('place');

    return Array.prototype.map.call(rows, parseMovie);
};

export default () => fetchPage(filmweb, filmwebPraser);