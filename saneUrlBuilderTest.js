var test = require('tape');
var SaneUrlBuilder = require('./saneUrlBuilder');
var EMPTY_STRING = '';

test('returns an empty string per default', function(t) {
    t.plan(1);

    var sub = new SaneUrlBuilder();

    t.equal(typeof sub.value(), 'string');
});

test('provides chainable methods', function(t) {
    t.plan(1);

    var sub = new SaneUrlBuilder();

    t.doesNotThrow(function() {
        sub.protocol().scheme().user().pass().host().port()
           .path().query().hash().fragment().value()
    });
});

test('alias methods are working', function(t) {
    t.plan(1);

    var sub = new SaneUrlBuilder();

    t.equal(sub.protocol('http').hash('#somehash').value(),
        'http://#somehash'
    );
});

test('provides useful url', function(t) {
    t.plan(3);

    var sub;

    sub = new SaneUrlBuilder();
    t.equal(sub.scheme('http').user('john').pass('doe').host('my-host.host').port('2000')
               .path('this/is/some/path').query('?somequery=value').fragment('#somehash').value(),
            'http://john:doe@my-host.host:2000/this/is/some/path?somequery=value#somehash'
    );

    sub = new SaneUrlBuilder();
    t.equal(sub.scheme('http').host('my-host.host').port('2000')
            .path('this/is/some/path').query('?somequery=value').fragment('#somehash').value(),
        'http://my-host.host:2000/this/is/some/path?somequery=value#somehash'
    );

    sub = new SaneUrlBuilder();
    t.equal(sub.scheme('http').host('my-host.host').path('this/is/some/path').fragment('#somehash').value(),
        'http://my-host.host/this/is/some/path#somehash'
    );
});

test('path clearing and adding works', function(t) {
    t.plan(1);

    var sub = new SaneUrlBuilder();

    t.equal(sub.path('this/is/some/path').path(false).path('/another/path').path('and/something/more').value(),
        '/another/path/and/something/more'
    );
});

test('fragment clearing and adding works', function(t) {
    t.plan(1);

    var sub = new SaneUrlBuilder();

    t.equal(sub.fragment('#somehash').fragment(false).fragment('#anotherhash').fragment('-more-stuff').value(),
        '#anotherhash-more-stuff'
    );
});

test('query clearing and adding works', function(t) {
    t.plan(1);

    var sub = new SaneUrlBuilder();

    t.equal(sub.query('?some-query').query(false).query('&some=other&query=yes').query('?more=true').value(),
        '?some=other&query=yes&more=true'
    );
});

test('clears values', function(t) {
    t.plan(8);

    var sub;

    sub = new SaneUrlBuilder();

    t.equal(sub.scheme('http').scheme(false).value(), EMPTY_STRING);
    t.equal(sub.user('someuser').user(false).value(), EMPTY_STRING);
    t.equal(sub.pass('somepath').pass(false).value(), EMPTY_STRING);
    t.equal(sub.host('some-host.host').host(false).value(), EMPTY_STRING);
    t.equal(sub.port('123').port(false).value(), EMPTY_STRING);
    t.equal(sub.path('/some/path').path(false).value(), EMPTY_STRING);
    t.equal(sub.fragment('#someFragment').fragment(false).value(), EMPTY_STRING);
    t.equal(sub.query('?someQuery').query(false).value(), EMPTY_STRING);
});

test('clears everything', function(t) {
    t.plan(1);

    var sub = new SaneUrlBuilder();

    t.equal(sub.scheme('http').user('john').pass('doe').host('my-host.host').port('2000')
               .path('this/is/some/path').query('?somequery=value').fragment('#somehash').clear().value(), EMPTY_STRING
    );
});

test('clones url', function(t) {
    t.plan(2);

    var sub = new SaneUrlBuilder();
    var sub2;

    sub.scheme('http').host('host-one').port(5000).path('some-path');
    sub2 = sub.clone().scheme('ftp').port(6000);

    t.equal(sub.value(), 'http://host-one:5000/some-path', 'first should be unchanged');
    t.equal(sub2.value(), 'ftp://host-one:6000/some-path', 'second should be changed');
});