(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(factory) {
    'use strict';

    if (typeof define === 'function' && define.amd && define.amd.dust === true) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(function () {
    'use strict';

    var copyObject = function (sourceObject, destObject, keyList) {
        destObject = destObject || {};
        keyList = (Array.isArray(keyList)) ? keyList : Object.keys(sourceObject);

        keyList.forEach(function (key) {
            if (undefined !== sourceObject[key]) {
                destObject[key] = sourceObject[key];
            }
        });

        return destObject;
    };

    return copyObject;
}));

},{}],2:[function(require,module,exports){
var serializer = require('./urlSerializer');
var copy = require('copy-object');

var Sub = function() {
    this.url = {};

    return this;
};

Sub.prototype.scheme = function(scheme) {
    if (scheme === false) delete(this.url.scheme);
    if (scheme) this.url.scheme = scheme;
    return this;
};

Sub.prototype.user = function(user) {
    if (user === false) delete(this.url.user);
    if (user) this.url.user = user;
    return this;
};

Sub.prototype.pass = function(pass) {
    if (pass === false) delete(this.url.pass);
    if (pass) this.url.pass = pass;
    return this;
};

Sub.prototype.host = function(host) {
    if (host === false) delete(this.url.host);
    if (host) this.url.host = host;
    return this;
};

Sub.prototype.port = function(port) {
    if (port === false) delete(this.url.port);
    if (port) this.url.port = port;
    return this;
};

Sub.prototype.path = function(path) {
    if (path === false) delete(this.url.paths);
    if (path) {
        if (!(this.url.paths instanceof Array)) {
            this.url.paths = [];
        }
        this.url.paths.push(path);
    }
    return this;
};

Sub.prototype.query = function(query) {
    if (query === false) delete(this.url.queries);
    if (query) {
        if (!(this.url.queries instanceof Array)) {
            this.url.queries = [];
        }
        this.url.queries.push(query);
    }
    return this;
};

Sub.prototype.fragment = function(fragment) {
    if (fragment === false) delete(this.url.fragments);
    if (fragment) {
        if (!(this.url.fragments instanceof Array)) {
            this.url.fragments = [];
        }
        this.url.fragments.push(fragment);
    }
    return this;
};

Sub.prototype.value = function() {
    return serializer(this.url);
};

Sub.prototype.encodedValue = function() {
    return encodeURI(serializer(this.url));
};

Sub.prototype.clear = function() {
    this.url = {};
    return this;
};

Sub.prototype.clone = function() {
    var cloned = Object.create(this);
    cloned.url = copy(this.url);
    return cloned;
};

// aliases
Sub.prototype.protocol = Sub.prototype.scheme;
Sub.prototype.hash     = Sub.prototype.fragment;

module.exports = Sub;

if (typeof window === 'object') {
    window.SaneUrlBuilder = Sub;
}
},{"./urlSerializer":3,"copy-object":1}],3:[function(require,module,exports){
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
        scheme = (scheme.indexOf(':') === -1) ? scheme + '://' : scheme.substr(0, scheme.indexOf(':')) + '://';
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

    function path(paths) {
        if (paths.length < 1) return '';
        return paths.map(function(path) {
            if (path.substr(0, 1) !== '/') path = '/' + path;
            if (path.substr(-1, 1) === '/') path = path.substr(0, (path.length - 1));
            return path;
        }).join('');
    }

    function query(queries) {
        if (queries.length < 1) return '';

        return queries.map(function(query, index) {
            if (typeof query === 'object') {
                query = Object.keys(query).map(function(propertyName) {
                    var val = query[propertyName];
                    return '&' + propertyName + '=' + val;
                }).join('');
            }
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

    function fragment(fragments) {
        if (fragments.length < 1) return '';
        return fragments.map(function(fragment, index) {
            if (index === 0 && fragment.substr(0, 1) !== '#') fragment = '#' + fragment;
            return fragment;
        }).join('');
    }
};
},{}]},{},[2]);
