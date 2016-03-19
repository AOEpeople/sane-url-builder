module.exports = function(url) {
    if (typeof url !== 'object') url = {};

    return Object.keys(url).map(function(propertyName) {
        var val = url[propertyName];

        switch(propertyName) {
            case 'scheme'    : return scheme(val);
            case 'user'      : return user(val);
            case 'pass'      : return pass(val);
            case 'host'      : return host(val);
            case 'port'      : return port(val);
            case 'paths'     : return path(val);
            case 'queries'   : return query(val);
            case 'fragments' : return fragment(val);
            default          : throw new Error('No handler for propertyName: ' + propertyName);
        }
    }).join('');

    function scheme(scheme) {
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

    // array
    function path(paths) {
        if (paths.length < 1) return '';
        return paths.map(function(path) {
            if (path.substr(0, 1) !== '/') path = '/' + path;
            if (path.substr(-1, 1) === '/') path = path.substr(0, (path.length - 1));
            return path;
        }).join('');
    }

    // tbd: array
    function query(queries) {
        if (queries.length < 1) return '';

        return queries.map(function(query, index) {
            if (index === 0) {
                if (query.substr(0, 1) === '&') query = '?' + query.substr(1);
                if (query.substr(0, 1) !== '?') query = '?' + query;
            } else {
                if (query.substr(0, 1) === '?') query = '&' + query.substr(1);
                if (query.substr(0, 1) !== '&') query = '&' + query;
            }
            return query;
        }).join('');
    }

    // array
    function fragment(fragments) {
        if (fragments.length < 1) return '';
        return fragments.map(function(fragment, index) {
            if (index === 0 && fragment.substr(0, 1) !== '#') fragment = '#' + fragment
            return fragment;
        }).join('');
    }
};