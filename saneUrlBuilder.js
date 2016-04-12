"use strict";

var Set    = require('./Set');
var Get    = require('./Get');
var Update = require('./Update');
var Delete = require('./Delete');

var Sub = function() {
    this._sanitizedUrlParts = {
        query: {}
    };

    return this;
};

// mixin functions into Sub prototype
Object.keys(Set.prototype).map(function(name) {
    Sub.prototype[name] = Set.prototype[name];
});
Object.keys(Get.prototype).map(function(name) {
    Sub.prototype[name] = Get.prototype[name];
});
Object.keys(Update.prototype).map(function(name) {
    Sub.prototype[name] = Update.prototype[name];
});
Object.keys(Delete.prototype).map(function(name) {
    Sub.prototype[name] = Delete.prototype[name];
});

module.exports = Sub;