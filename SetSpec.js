var test = require('tape');
var Set = require('./Set');

test('simple sets', function(t) {
    t.plan(7);

    var setMethods = new Set();
    setMethods._sanitizedUrlParts = {
        query: {}
    };

    setMethods.setScheme('http:');
    setMethods.setUser('john');
    setMethods.setPass('doe');
    setMethods.setHost('my-host.host');
    setMethods.setPort('1234');
    setMethods.setPath('some/path/here');
    setMethods.setFragment('#some-fragment');

    t.equal(setMethods._sanitizedUrlParts.scheme[0], 'http://');
    t.equal(setMethods._sanitizedUrlParts.user[0], 'john');
    t.equal(setMethods._sanitizedUrlParts.pass[0], 'doe');
    t.equal(setMethods._sanitizedUrlParts.host[0], 'my-host.host');
    t.equal(setMethods._sanitizedUrlParts.port[0], '1234');
    t.equal(setMethods._sanitizedUrlParts.path[0], 'some/path/here');
    t.equal(setMethods._sanitizedUrlParts.fragment[0], '#some-fragment');
});

test('set query takes string w. single param=value', function(t) {
    t.plan(1);

    var setMethods = new Set();
    setMethods._sanitizedUrlParts = {
        query: {}
    };

    setMethods.setQuery('name=jane%20%26%20joe');


    t.deepEqual(setMethods._sanitizedUrlParts,
        {
            query: {
                name: ['jane%20%26%20joe']
            }
        }
    );
});

test('set query takes string w. multi param=value', function(t) {
    t.plan(1);

    var setMethods = new Set();
    setMethods._sanitizedUrlParts = {
        query: {}
    };

    setMethods.setQuery('?name=john&name=jane%20%26%20joe&name=tom%20%26%20jerry&surname=doe');

    t.deepEqual(setMethods._sanitizedUrlParts,
        {
            query: {
                name: ['john', 'jane%20%26%20joe', 'tom%20%26%20jerry'],
                surname: ['doe']
            }
        }
    );
});


test('set query takes object w. unencoded values and encodes', function(t) {
    t.plan(1);

    var setMethods = new Set();
    setMethods._sanitizedUrlParts = {
        query: {}
    };

    setMethods.setQuery({name: ['john', 'jane & joe', 'tom & jerry'], surname: 'doe + dee'});

    t.deepEqual(setMethods._sanitizedUrlParts.query,
        {
            name: ['john', 'jane%20%26%20joe', 'tom%20%26%20jerry'],
            surname: ['doe%20%2B%20dee']
        }
    );
});

test('set query takes object w. encoded values and does not encode', function(t) {
    t.plan(1);

    var setMethods = new Set();
    setMethods._sanitizedUrlParts = {
        query: {}
    };

    setMethods.setQuery({name: ['john', 'jane%20%26%20joe', 'tom%20%26%20jerry'], surname: 'doe%20%2B%20dee'}, true);

    t.deepEqual(setMethods._sanitizedUrlParts.query,
        {
            name: ['john', 'jane%20%26%20joe', 'tom%20%26%20jerry'],
            surname: ['doe%20%2B%20dee']
        }
    );
});