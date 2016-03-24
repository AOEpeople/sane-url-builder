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