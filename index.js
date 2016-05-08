const fs = require('fs');
const dug = require('dug')

/*
 * Usage:
 * var dug = require('diet-dug')({ path: app.path+'/static/dug' })
 * var jade = require('diet-dug')({ path: app.path+'/static/jade' })
 * app.header(dug)
 *
 * $.render('index') => $.render('index.jade')
 *
 */

module.exports = function(options) {
  var options = options || {}

  return function($) {
    $.render = function(filename) {
      $.header('Content-Type', 'text/html; charset=UTF-8')
      console.log(filename);
      // give depricated warning if .jade is used
      
      // filename var is set and yeld WARNING if it is set to .jade
      filename ? (filename.indexOf('.jade')>-1 ? (console.log('WARNING: Will try to render .dug file NOT .jade IT is DEPRICATED!')) : ($.error('No .dug file specified'))
      // check if filename is dug or jade if not append dug
      filename.indexOf('.dug')>-1 ? (options.file = filename) : (filename.indexOf('.jade')>-1 ? (options.file = filename) : (options.file = filename. + '.dug'))
      
      var path = (options.path.slice(-1) === '/') ? options.path : options.path + '/'
      var fn = jade.compileFile(path + options.file, {
        pretty: true,
      })
      var html = fn($.data)
      // console.log(html);
      $.end(html)
    }
    $.return()
  }
}
