/*
Copyright (c) 2009 Marak Squires
 
Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/


/*********************************************************************** 

  jquery.route.js enables you to create "routes" based on a unique URI
  routes are states that may have events bound to them  routes can be 
  triggered anywhere by calling route('/foo').run()
  this is a javascript implementation of Inversion of Control

  *** http://en.wikipedia.org/wiki/Inversion_of_control ***
     	    *** "Don't call us, we'll call you" ***

  USAGE:
	
  route('#/account').bind(customMethod);
  route('#/account').bind(customMethod2);			
			
  route('#/websites').bind(customMethod);
  route('#/websites').bind(customMethod2);			
			
  route('#/account').run();
  route('#/websites').run();
			
*************************************************************************/

var route=function(path){
  return new route.fn.init(path);
}
route.fn = route.prototype = {
  init: function(path) {
	  this.path = path;
	  return true;
  },
  bind: function(fn) {
    var routes = $(document).data('routes') || {};
	if(typeof routes[this.path] == 'undefined'){routes[this.path]={};}	
    if(typeof routes[this.path].events == 'undefined'){routes[this.path].events=new Array();}
	routes[this.path].events.push(fn);
	$(document).data('routes', routes);
 	return 'bind successful';
  },
  run: function() {
	/* routes stored globally using $(document).data() */  
	var routes = $(document).data('routes') || {};
	if(typeof routes[this.path] == 'undefined'){routes[this.path]={};}	
    if(typeof routes[this.path].events == 'undefined'){routes[this.path].events=new Array();}
	for(var i=0; i<routes[this.path].events.length; i++){
	  routes[this.path].events[i]();  
	}
	return 'run successful'; 
  }
};
route.fn.init.prototype = route.fn;