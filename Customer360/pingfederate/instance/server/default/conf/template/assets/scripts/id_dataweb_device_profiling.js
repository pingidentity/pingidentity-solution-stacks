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

function uuid() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += "-"
        }

        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}

// Corresponds to the Cookie Name field in the ID DataWeb IdP Adapter configuration (must match).
var cookieName = "idwUUID";

eraseCookie(cookieName);

var uuid = uuid();

var deviceProfilingScriptUrl =
    "https://content.maxconnector.com/fp/tags.js?" +
    "org_id=716kkpe1&" +
    "api_key=bvrbl1ev61nw7zq7&" +
    "pageid=verify&" +
    "session_id=";

var deviceProfilingScript = document.createElement("script");
deviceProfilingScript.src = deviceProfilingScriptUrl + uuid;
document.getElementsByTagName("head")[0].appendChild(deviceProfilingScript);

setCookie(cookieName, uuid, 1);

