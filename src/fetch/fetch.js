export default (url, parser) =>
    fetch(url)
        .then(data => data.text())
        .then(page => parser(page));