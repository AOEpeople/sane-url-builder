var test = require('tape');
var Get = require('./Get');

test('get methods return url parts', function(t) {
    t.plan(8);
    
    var getMethods = new Get();
    var unsanitizedUrlParts = {
        scheme: ['http://'],
        user: ['john'],
        pass: ['doe'],
        host: ['my-host.host'],
        port: ['1234'],
        path: ['/some/path'],
        query: ['?some=query'],
        fragment: ['#someFragment']
    };

    getMethods._sanitizedUrlParts = unsanitizedUrlParts;

    t.equal(getMethods.getScheme(),   unsanitizedUrlParts.scheme,   'getScheme');
    t.equal(getMethods.getUser(),     unsanitizedUrlParts.user,     'getUser');
    t.equal(getMethods.getPass(),     unsanitizedUrlParts.pass,     'getPass');
    t.equal(getMethods.getHost(),     unsanitizedUrlParts.host,     'getHost');
    t.equal(getMethods.getPort(),     unsanitizedUrlParts.port,     'getPort');
    t.equal(getMethods.getPath(),     unsanitizedUrlParts.path,     'getPath');
    t.equal(getMethods.getQuery(),    unsanitizedUrlParts.query,    'getQuery');
    t.equal(getMethods.getFragment(), unsanitizedUrlParts.fragment, 'getFragment');
});
