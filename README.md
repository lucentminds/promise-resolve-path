# promise-resolve-path
NodeJs module that resolves a file path or a list of file paths.

### Useage:

```js
var resolvePath = require( 'promise-resolve-path' );

var aPaths = [
    '.',
    '..',
    './documents/test.txt'
];

resolve( aPaths, true )
.then(function( aResolved ){

    console.log( 'All paths resolved!' );

})
.fail(function( err ){

    console.log( 'Oops!' );

});
```

Or for a single file.

```js
resolve( './documents/test.txt', true )
.then(function( cResolved ){

    console.log( 'Resolved path:', cResolved );

})
.fail(function( err ){

    console.log( 'Oops!' );

});
```