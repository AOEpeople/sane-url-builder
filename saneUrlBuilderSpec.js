var test = require('tape');
var SaneUrlBuilder = require('./saneUrlBuilder');

test('has set methods', function(t) {
    t.plan(8);

    t.equal(typeof new SaneUrlBuilder().setScheme,   'function', 'setScheme');
    t.equal(typeof new SaneUrlBuilder().setUser,     'function', 'setUser');
    t.equal(typeof new SaneUrlBuilder().setPass,     'function', 'setPass');
    t.equal(typeof new SaneUrlBuilder().setHost,     'function', 'setHost');
    t.equal(typeof new SaneUrlBuilder().setPort,     'function', 'setPort');
    t.equal(typeof new SaneUrlBuilder().setPath,     'function', 'setPath');
    t.equal(typeof new SaneUrlBuilder().setQuery,    'function', 'setQuery');
    t.equal(typeof new SaneUrlBuilder().setFragment, 'function', 'setFragment');
});

test('has get methods', function(t) {
    t.plan(8);

    t.equal(typeof new SaneUrlBuilder().getScheme,   'function', 'getScheme');
    t.equal(typeof new SaneUrlBuilder().getUser,     'function', 'getUser');
    t.equal(typeof new SaneUrlBuilder().getPass,     'function', 'getPass');
    t.equal(typeof new SaneUrlBuilder().getHost,     'function', 'getHost');
    t.equal(typeof new SaneUrlBuilder().getPort,     'function', 'getPort');
    t.equal(typeof new SaneUrlBuilder().getPath,     'function', 'getPath');
    t.equal(typeof new SaneUrlBuilder().getQuery,    'function', 'getQuery');
    t.equal(typeof new SaneUrlBuilder().getFragment, 'function', 'getFragment');
});

test('has update methods', function(t) {
    t.plan(4);

    t.equal(typeof new SaneUrlBuilder().addQueryParams,    'function', 'addQueryParams');
    t.equal(typeof new SaneUrlBuilder().modifyQueryParams, 'function', 'modifyQueryParams');
    t.equal(typeof new SaneUrlBuilder().addFragment,       'function', 'addFragment');
    t.equal(typeof new SaneUrlBuilder().addPath,           'function', 'addPath');
});

test('has delete methods', function(t) {
    t.plan(9);

    t.equal(typeof new SaneUrlBuilder().deleteScheme,      'function', 'deleteScheme');
    t.equal(typeof new SaneUrlBuilder().deleteUser,        'function', 'deleteUser');
    t.equal(typeof new SaneUrlBuilder().deletePass,        'function', 'deletePass');
    t.equal(typeof new SaneUrlBuilder().deleteHost,        'function', 'deleteHost');
    t.equal(typeof new SaneUrlBuilder().deletePort,        'function', 'deletePort');
    t.equal(typeof new SaneUrlBuilder().deletePath,        'function', 'deletePath');
    t.equal(typeof new SaneUrlBuilder().deleteQuery,       'function', 'deleteQuery');
    t.equal(typeof new SaneUrlBuilder().deleteQueryParams, 'function', 'deleteQueryParams');
    t.equal(typeof new SaneUrlBuilder().deleteFragment,    'function', 'deleteFragment');
});