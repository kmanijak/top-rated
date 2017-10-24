import fetchPage from './fetch';

const metacritic = 'http://www.metacritic.com/browse/movies/score/metascore/all/filtered';

const metacriticParser = (rawPage) => {
    const parseMovie = (row) => {
        const rank = row
            .getElementsByClassName('rank_wrapper')[0]
            .getElementsByTagName('a')[0]
            .innerHTML;
        const rating = row.getElementsByClassName('metascore_w')[0].innerHTML;
        const titleLinkElement = row
            .getElementsByClassName('title')[0]
            .getElementsByTagName('a')[0];
        const link = 'metacritic.com' + titleLinkElement.getAttribute('href');
        const title = titleLinkElement.innerHTML;
        const year = row
            .getElementsByClassName('date_wrapper')[0]
            .getElementsByTagName('span')[0]
            .innerHTML
            .split(', ')[1];

        return { rank, rating, link, title, year };
    };

    const parser = new DOMParser();
    const page = parser.parseFromString(rawPage, "text/html");
    const rows = page.getElementsByClassName('summary_row');

    return Array.prototype.map.call(rows, parseMovie);
};

export default () => fetchPage(metacritic, metacriticParser);