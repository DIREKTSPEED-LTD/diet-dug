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
		   /*
		   	CHECK root set if yes :
		   	CHECK if has .pug if yes
		   	CHECK file exists with pathname
		   	? CHECK file exists with pathname +  root
		   	case no
		   	CHECK file exists with pathname + pug
		   	? CHECK file exists with pathname +  root + pug
		   	CHECK if it renders as string
		   	
		   	CHECK root set if no :
		   	CHECK file exists no try render string
		   */
		   var context = merge(clone($, false, 1), $.data)
		    
		   if(!pathname || (pathname && pathname.indexOf(/\n|\r/) != -1)){
    			// if has option path hornor it to all calls init new instance without for other 
		    	if (!options.path === null) pathname = options.path + '/' + pathname
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
