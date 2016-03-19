var test = require('tape');
var serializer = require('./urlSerializer');

test('returns empty string for missing param', function(t) {
    t.plan(1);

    t.equal(serializer(), '');
});

test('returns empty string for empty object', function(t) {
    t.plan(1);

    t.equal(serializer({}), '');
});

test('returns a proper scheme (protocol)', function(t) {
    t.plan(3);

    t.equal(serializer({scheme: 'http'}), 'http://');
    t.equal(serializer({scheme: 'ftp'}), 'ftp://');
    t.equal(serializer({scheme: 'http://'}), 'http://');
});

test('returns a proper user:pass', function(t) {
    t.plan(2);

    t.equal(serializer({user: 'user', pass: 'pass'}), 'user:pass@');
    t.equal(serializer({user: 'anotherUsername', pass: 'anotherPass'}), 'anotherUsername:anotherPass@');
});

test('returns a proper host', function(t) {
    t.plan(4);

    t.equal(serializer({host: 'some-hostname'}), 'some-hostname');
    t.equal(serializer({host: 'some-hostname/'}), 'some-hostname');
    t.equal(serializer({host: '/some-hostname'}), 'some-hostname');
    t.equal(serializer({host: '/some-hostname/'}), 'some-hostname');
});

test('returns a proper port', function(t) {
    t.plan(4);

    t.equal(serializer({port: '6000'}), ':6000');
    t.equal(serializer({port: '100'}), ':100');
    t.equal(serializer({port: 6000}), ':6000');
    t.equal(serializer({port: ':6000'}), ':6000');
});

test('returns a proper path', function(t) {
    t.plan(4);

    t.equal(serializer({path: '/some/fancy/path'}), '/some/fancy/path');
    t.equal(serializer({path: '/some/fancy/path/'}), '/some/fancy/path');
    t.equal(serializer({path: 'some/fancy/path/'}), '/some/fancy/path');
    t.equal(serializer({path: 'some/fancy/path'}), '/some/fancy/path');
});

test('returns a proper query', function(t) {
    t.plan(3);

    t.equal(serializer({query: '?this=blah&that=blubb'}), '?this=blah&that=blubb');
    t.equal(serializer({query: 'this=blah&that=blubb'}), '?this=blah&that=blubb');
    t.equal(serializer({query: '&this=blah'}), '?this=blah');
});

test('returns a proper fragment (hash)', function(t) {
    t.plan(2);

    t.equal(serializer({fragment: '#hacketyHash'}), '#hacketyHash');
    t.equal(serializer({fragment: 'hacketyHash'}), '#hacketyHash');
});