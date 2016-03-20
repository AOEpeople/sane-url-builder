# sane-url-builder
## why
When concatenating urls in javascript always starts pretty easy but ends up looking similar to this

```javascript
let config = {
    host: 'some.host',
    endpoint: 'endpoint'
}

let baseUrl =
    window.location.protocol + "//" +
    config.host + "/" +
    config.endpoint;
    
if (baseUrl.indexOf('?') === -1) {
    baseUrl += '?';
} else {
    baseUrl += '&';
}
baseUrl += 'param=value';

// yields: http://some.host/endpoint?param=value
```

## solution
Just build your url using sane-url-builder which provides a clean interface for creating urls. For the above example it would look like:

```javascript
var sub = new SaneUrlBuilder;
var url = sub.protocol(window.location.protocol)
             .host(config.host).path(config.endpoint).query('param=value').value();
// yields: http://some.host/endpoint?param=value
```

If you have to change a value, just set it again (doesn't work for path, query, fragment/hash - read on)
```javascript
sub.protocol('ftp').host('different.host').value();
// yields: ftp://different.host/endpoint?param=value
```

If you have to change a path, query or fragment/hash first delete it, then set it again
```javascript
sub.path('some/path').path(false).path('the/new/path').value();
// yields: ftp://different.host/the/new/path?param=value
```

If you want to append something to a path, query or fragment/hash, just call the method again
```javascript
sub.path('something').path('and/even/more').value();
// yields: ftp://different.host/the/new/path/something/and/even/more?param=value
```

## methods
A url is made of the following parts:
`[scheme]`://`[user]`:`[pass]`@`[host]`:`[port]`/`[path]`?`[query]`#`[fragment]`

sane-url-builder provides all of those `[parts]` as methods PLUS two aliases, which are `protocol()` (alias for `scheme()`) and `hash()` (alias for `fragment()`). All methods can be chained (except for `value()` as it returns the built url) and called with Boolean `false` to clear the current value. If calling `path()`, `query()`, `fragment()` / `hash()` multiple times they will append the passed value to the current value. If calling the other methods multiple times they will simply override the current value. All methods take a simple `string` as parameter.

## environmental support
Currently supports commonjs (e. g. using it in node or via browserify in the browser). The compiled version (build/saneUrlBuilder.js) can be used in the browser (f. e. just loaded via script-tag).

### node / browserify
Just do a `npm install sane-url-browser` first, then in your code:
```
var SaneUrlBuilder = require('sane-url-builder');

var sub = new SaneUrlBuilder();
    sub.host('my-host')........value();
```

### browser
Just download the compiled javascript (https://github.com/AOEpeople/sane-url-builder/blob/master/build/saneUrlBuilder.js), then do:
```
<script src="saneUrlBuilder.js"></script>
<script>
    var sub = new SaneUrlBuilder();
    sub.host('my-host')........value();
</script>
```

