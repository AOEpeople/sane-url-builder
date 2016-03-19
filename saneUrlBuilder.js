var serializer = require('./urlSerializer');

var Sub = function() {
    this.url = {};

    return this;
};

Sub.prototype.scheme = function(scheme) {
    if (scheme) this.url.scheme = scheme;
    return this;
};

Sub.prototype.user = function(user) {
    if (user) this.url.user = user;
    return this;
};

Sub.prototype.pass = function(pass) {
    if (pass) this.url.pass = pass;
    return this;
};

Sub.prototype.host = function(host) {
    if (host) this.url.host = host;
    return this;
};

Sub.prototype.port = function(port) {
    if (port) this.url.port = port;
    return this;
};

Sub.prototype.path = function(path) {
    if (path) this.url.path = path;
    return this;
};

Sub.prototype.query = function(query) {
    if (query) this.url.query = query;
    return this;
};

Sub.prototype.fragment = function(fragment) {
    if (fragment) this.url.fragment = fragment;
    return this;
};

Sub.prototype.addPath = function(path) {
    //if (path) this.url.path = path;
    console.log('Not implemented yet.');
    return this;
};

Sub.prototype.addQuery = function(query) {
    //if (query) this.url.query = query;
    console.log('Not implemented yet.');
    return this;
};

Sub.prototype.addFragment = function(fragment) {
    //if (fragment) this.url.fragment = fragment;
    console.log('Not implemented yet.');
    return this;
};

Sub.prototype.value = function() {
    return serializer(this.url);
};

// aliases
Sub.prototype.protocol = Sub.prototype.scheme;
Sub.prototype.hash     = Sub.prototype.fragment;

module.exports = Sub;