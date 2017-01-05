/**
 * 01-04-2017
 * The best app ever..
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jslint node: true */
/* global JSON:false */

var path = require( 'path' );
var fs = require( 'fs' );
var Q = require( 'q' );

var resolvePath = module.exports = function( aPaths, lExists ){
    var deferred = Q.defer();
    var i, l, cFullPath;
    var aSources;
    var aPromises;
    var cPathType = typeof aPaths;

    switch( true ) {
    case ( cPathType === 'string' ):
        aPaths = [aPaths];
        break;

    case Array.isArray( aPaths ):
        break;

    default:
        deferred.reject( 'Invalid path argument: '.concat( aPaths ) );
        return deferred.promise;

    }// /switch()

    // Determines a clone of the original array.
    aSources = aPaths.slice( 0 );

    // Determines the list of promises received from resolveOnePath.
    aPromises = [];

    /** 
     * Loop over each source path and resolve it.
     */
    for( i = 0, l = aSources.length; i < l; i++ ) {
        aPromises.push( resolveOnePath( aSources[ i ], lExists ) );

    }// /for()

    Q.all( aPromises ).done(
        // All resolved.
        function( aResolved ){
            if( cPathType === 'string' )  {
                deferred.resolve( aResolved[0] );
            }
            else {
                deferred.resolve( aResolved );
            }
        },

        // One rejected.
        function( cFullPath ){
            deferred.reject( 'Path does not exist: '.concat( cFullPath ) );
        });


    return deferred.promise;
};// /resolve()

var resolveOnePath = function( cPath, lExists ) {
    var deferred = Q.defer();
    var cFullPath = path.resolve( cPath );
    

    if( lExists ){
        fs.lstat( cFullPath, function( err ){
            if( err ) {
                deferred.reject( cFullPath );
            }
            else {
                deferred.resolve( cFullPath );
            }

        });
    }
    else {
        deferred.resolve( cFullPath );
    }

    return deferred.promise;
};// /resolveOnePath()

// var fileExists = function( cFile ) {
//     try{
//         fs.lstatSync( cFile );
//     }
//     catch( e ){
//         return false;
//     }

//     return true;
// };// /fileExists()