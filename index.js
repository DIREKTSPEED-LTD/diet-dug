// ECT based diet plugin for rendering Dynamic HTML files

// Dependencies
var fs = require('fs')
var pug = require('pug')
var merge = require('merge')
var clone = require('clone')

module.exports = function(options){
	
	var options = options || {}
	var renderer = pug(merge({ 
		root : options.path, 
		ext: '.pug', 
		open: '{{', close: '}}',
		cache: true,
		watch: true,
		gzip: true,
		pretty: true,
		compileDebug: false,
	}, options))
	
	return function($){
		$.htmlModule = function(pathname){
		    //check if file exist in r
		    var context = merge(clone($, false, 1), $.data)
		    // if has new line or start with < 
		    // will fail if your filename has < in it (need other way to check if it is a html string)
		    if(!pathname || (pathname && pathname.indexOf(/\n|\r|</) != -1)){
    			pathname ? ( pathname.indexOf('.pug')>-1 ? ( var path = pathname ) : ( var path = pathname + '.pug' ) ) : var path = 'index.pug'
    			// var path = pathname ? pathname : 'index.pug'
    			var html = renderer.renderFile(path, context)
    			$.response.end(html)
			} else if (pathname) {
			    renderer.render(pathname, context)
			}
			
			$.nextRoute() // call next route
		}
		$.return()
	}
}
