module.exports = function(url) {
    if (typeof url !== 'object') url = {};

    return Object.keys(url).map(function(propertyName) {
        var val = url[propertyName];

        switch(propertyName) {
            case 'scheme'   : return schema(val);
            case 'user'     : return user(val);
            case 'pass'     : return pass(val);
            case 'host'     : return host(val);
            case 'port'     : return port(val);
            case 'path'     : return path(val);
            case 'query'    : return query(val);
            case 'fragment' : return fragment(val);
            default         : return '';
        }
    }).join('');

    function schema(scheme) {
        if (scheme.indexOf('://') === -1) scheme += '://';
        return scheme;
    }

    function user(username) {
        if (username.substr(-1) !== ':') username += ':';
        return username;
    }

    function pass(password) {
        if (password.substr(-1) !== '@') password += '@';
        return password;
    }

    function host(host) {
        if (host.substr(0, 1) === '/') host = host.substr(1);
        if (host.substr(-1, 1) === '/') host = host.substr(0, (host.length - 1));
        return host;
    }

    function port(port) {
        port = port + '';
        if (port.substr(0, 1) !== ':') port = ':' + port;
        return port;
    }

    function path(path) {
        if (path.substr(0, 1) !== '/') path = '/' + path;
        if (path.substr(-1, 1) === '/') path = path.substr(0, (path.length - 1));
        return path;
    }

    function query(query) {
        if (query.substr(0, 1) === '&') query = '?' + query.substr(1);
        if (query.substr(0, 1) !== '?') query = '?' + query;
        return query;
    }

    function fragment(fragment) {
        if (fragment.substr(0, 1) !== '#') fragment = '#' + fragment;
        return fragment;
    }
};