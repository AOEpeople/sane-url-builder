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

test('throws if unknown property is used', function(t) {
    t.plan(1);

    t.throws(function() {serializer({unknown: '', properties: ''})});
});

test('returns a proper scheme (protocol)', function(t) {
    t.plan(5);

    t.equal(serializer({scheme: 'http'}), 'http://');
    t.equal(serializer({scheme: 'ftp'}), 'ftp://');
    t.equal(serializer({scheme: 'http:'}), 'http://');
    t.equal(serializer({scheme: 'http:/'}), 'http://');
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

test('returns a proper path (single)', function(t) {
    t.plan(4);

    t.equal(serializer({paths: ['/some/fancy funky/path']}), '/some/fancy funky/path');
    t.equal(serializer({paths: ['/some/fancy funky/path/']}), '/some/fancy funky/path');
    t.equal(serializer({paths: ['some/fancy funky/path/']}), '/some/fancy funky/path');
    t.equal(serializer({paths: ['some/fancy funky/path']}), '/some/fancy funky/path');
});

test('returns a proper path (multiple)', function(t) {
    t.plan(4);

    t.equal(serializer({paths: ['/some/fancy/path', 'other/stuff']}), '/some/fancy/path/other/stuff');
    t.equal(serializer({paths: ['/some/fancy/path/', 'other/stuff', '/and/more']}), '/some/fancy/path/other/stuff/and/more');
    t.equal(serializer({paths: ['some/fancy/path/', '/other/stuff/', '/and/more/']}), '/some/fancy/path/other/stuff/and/more');
    t.equal(serializer({paths: ['some/fancy/path', 'other/stuff', 'and/more']}), '/some/fancy/path/other/stuff/and/more');
});

test('returns a proper query (single)', function(t) {
    t.plan(3);

    t.equal(serializer({queries: ['?this=blah&that=blubb']}), '?this=blah&that=blubb');
    t.equal(serializer({queries: ['this=blah&that=blubb']}), '?this=blah&that=blubb');
    t.equal(serializer({queries: ['&this=blah']}), '?this=blah');
});

test('returns a proper query (multiple)', function(t) {
    t.plan(2);

    t.equal(serializer({queries: ['?this=blah&that=blubb blah', '?and=test&more=blubb boo']}), '?this=blah&that=blubb blah&and=test&more=blubb boo');
    t.equal(serializer({queries: ['this=blah&that=blubb', '?and=test&more=blubb', '&even=more']}), '?this=blah&that=blubb&and=test&more=blubb&even=more');
});

test('returns a proper fragment (hash) (single)', function(t) {
    t.plan(2);

    t.equal(serializer({fragments: ['#hackety Hash']}), '#hackety Hash');
    t.equal(serializer({fragments: ['hackety Hash']}), '#hackety Hash');
});

test('returns a proper fragment (hash) (multiple)', function(t) {
    t.plan(2);

    t.equal(serializer({fragments: ['#hacketyHash', '-more|', '+and even more']}), '#hacketyHash-more|+and even more');
    t.equal(serializer({fragments: ['hacketyHash', '-more|', '+and even more']}), '#hacketyHash-more|+and even more');
});