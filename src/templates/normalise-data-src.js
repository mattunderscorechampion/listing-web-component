
function normaliseDataSrc(dataSrc) {
    if (dataSrc) {
        var match = dataSrc.match(/https:\/\/gist.github.com(.+)/);
        if (match) {
            if (match[1].endsWith('/')) {
                return 'https://gist.githubusercontent.com' + match[1] + 'raw/';
            }
            else {
                return 'https://gist.githubusercontent.com' + match[1] + '/raw/';
            }
        }
    }
    return dataSrc;
}
