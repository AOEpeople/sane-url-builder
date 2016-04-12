"use strict";

var Get = function() {
    return this;
};

Get.prototype.getScheme = function() {
    return this._sanitizedUrlParts.scheme;
};

Get.prototype.getUser = function() {
    return this._sanitizedUrlParts.user;
};

Get.prototype.getPass = function() {
    return this._sanitizedUrlParts.pass;
};

Get.prototype.getHost = function() {
    return this._sanitizedUrlParts.host;
};

Get.prototype.getPort = function() {
    return this._sanitizedUrlParts.port;
};

Get.prototype.getPath = function() {
    return this._sanitizedUrlParts.path;
};

Get.prototype.getQuery = function() {
    return this._sanitizedUrlParts.query;
};

Get.prototype.getFragment = function() {
    return this._sanitizedUrlParts.fragment;
};

module.exports = Get;