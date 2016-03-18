var test = require('tape');
var SaneUrlBuilder = require('./saneUrlBuilder');

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
           .path().query().hash().fragment().addPath().addQuery().addFragment().value()
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