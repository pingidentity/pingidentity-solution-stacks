function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

function split(string, size) {
    var re = new RegExp('.{1,' + size + '}', 'g');
    return string.match(re);
}

function eraseCookies(namePrefix) {
    document.cookie
        .split(";")
        .map(function (cookie) {
            return cookie.trim(); })
        .filter(function (cookie) {
            return cookie.startsWith(namePrefix);
        })
        .map(function (cookie) {
            var cookieName = cookie.split("=")[0];
            eraseCookie(cookieName);
        });
}

function setBbCookies(encodedBb, bbCookieNamePrefix) {
    // Our cookies should be 4096 bytes or less
    // Current bb max is 8001 bytes
    // So break the bb into 4002 byte chunks (leaving 94 bytes for the rest of the cookie)
    var chunkLength = 4002;

    var encodedBbChunks = split(encodedBb, chunkLength);

    encodedBbChunks.map(function (encodedBbChunk, index) {
        setCookie(bbCookieNamePrefix + index, encodedBbChunk, 1);
    });
}

var bbCookieNamePrefix = "iovation_bb";

window.io_global_object_name = "IGLOO";
window.IGLOO = window.IGLOO || {
    "enable_flash": false,
    "bb_callback": function (bb, complete) {
        eraseCookies(bbCookieNamePrefix);
        var encodedBb = btoa(bb);
        setBbCookies(encodedBb, bbCookieNamePrefix);
    },
    "loader": {
        "uri_hook": "/iojs",
        "subkey": "xz1wcI_mlev7ZyvfJj94rYhbKk9av1rsH3sDg5_JGsQ",
        "version": "general5"
    }
};
