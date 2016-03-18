# sane-url-builder
## why
When concatenating urls in javascript it starts easy but ends up looking similar to this

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

If you have to change a value, just set it again
```javascript
var sub = new SaneUrlBuilder;

sub.protocol(window.location.protocol).host(config.host).path(config.endpoint).query('param=value');
sub.value();
// yields: http://some.host/endpoint?param=value

sub.protocol('ftp').host('different.host');
sub.value();
// yields: ftp://different.host/endpoint?param=value
```

url: scheme://user:pass@host:port/path?query#fragment
