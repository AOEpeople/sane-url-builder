"use strict";

var isArray = require('isarray');
var loop = require("simple-loop");
var concat = require('array-concat');

var Set = function() {
    return this;
};

Set.prototype.setScheme = function(scheme) {
    scheme = (scheme.indexOf(':') === -1) ? scheme + '://' : scheme.substr(0, scheme.indexOf(':')) + '://';
    this._sanitizedUrlParts.scheme = [scheme];
    return this;
};

Set.prototype.setUser = function(user) {
    this._sanitizedUrlParts.user = [user];
    return this;
};

Set.prototype.setPass = function(pass) {
    this._sanitizedUrlParts.pass = [pass];
    return this;
};

Set.prototype.setHost = function(host) {
    if (host.substr(0, 1) === '/') host = host.substr(1);
    if (host.substr(-1, 1) === '/') host = host.substr(0, (host.length - 1));
    this._sanitizedUrlParts.host = [host];
    return this;
};

Set.prototype.setPort = function(port) {
    this._sanitizedUrlParts.port = [port];
    return this;
};

Set.prototype.setPath = function(path) {
    this._sanitizedUrlParts.path = [path];
    return this;
};

Set.prototype.setQuery = function(query, isEncoded) {
    if (typeof isEncoded !== 'boolean') {
        isEncoded = false;
    }

    // string has to be encoded, no other option
    if (typeof query === 'string') {
        if (query.indexOf('?') === 0) {
            query = query.substr(1);
        }

        var queryArr = query.indexOf('&') !== -1 ? query.split('&') : [query];

        loop(queryArr, function(keyValue) {
            var key = keyValue.split('=')[0];
            var value = keyValue.split('=')[1];

            if (isArray(this._sanitizedUrlParts.query[key])) {
                this._sanitizedUrlParts.query[key].push(value);
            } else {
                this._sanitizedUrlParts.query[key] = [value];
            }
        }, this);
    }

    // values can be encoded or not, specify via param and we encode
    if (typeof query === 'object') {
        loop(query, function(valueOrValues, key) {
            /*
            // use this for update
            if (isArray(this._sanitizedUrlParts.query[key])) {
                if (isArray(valueOrValues)) {
                    this._sanitizedUrlParts.query[key] = concat(this._sanitizedUrlParts.query[key], valueOrValues);
                } else {
                    this._sanitizedUrlParts.query[key].push(valueOrValues);
                }
            } else {
            */
            if (isArray(valueOrValues)) {
                this._sanitizedUrlParts.query[key] = isEncoded ? valueOrValues : encodeArrayValues(valueOrValues);
            } else {
                this._sanitizedUrlParts.query[key] = isEncoded ? [valueOrValues] : encodeArrayValues([valueOrValues]);
            }
        }, this);
    }

    return this;
};

function encodeArrayValues(values) {
    return values.map(function(value) {
        return encodeURIComponent(value);
    });
}

Set.prototype.setFragment = function(fragment) {
    this._sanitizedUrlParts.fragment = [fragment];
    return this;
};

module.exports = Set;