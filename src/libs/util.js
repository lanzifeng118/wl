let util = {

};
util.title = function(title) {
    title = title ? `${title} - DOAPI` : 'DOAPI';
    window.document.title = title;
};

util.bytesToSize = function(bytes) {
    if (bytes === 0) {
        return '0B'
    }
    const SIZE = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const CELL = 1024
    let i = Math.floor(Math.log(bytes) / Math.log(CELL));
    return (bytes / Math.pow(CELL, i)).toFixed(2) + SIZE[i]; 
}

util.timeFormat = function(time) {
    
}
util.getCookie = function() {
    let cookie = document.cookie.replace(/ /g, '')
    let arr = cookie.split(';')
    let obj = {}
    arr.forEach((v, i) => {
        let arrV = v.split('=')
        obj[arrV[0]] = decodeURIComponent(arrV[1])
    })
    return obj
}

export default util;