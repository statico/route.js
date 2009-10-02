/* Copyright (c) 2009 Marak Squires - www.maraksquires.com
 
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

  jquery.route.js enables you to create "routes" based on a unique path
  a route can be considered a unique state
  a route may have multiple functions bound to them
  a route can be triggered by calling route('/foo').run()
  
  *** http://en.wikipedia.org/wiki/Inversion_of_control ***
     	    *** "Don't call us, we'll call you" ***

  USAGE:
	
  route('#/account').bind(customMethod);
  route('#/account').bind(customMethod2);			
			
  route('#/websites').bind(customMethod);
  route('#/websites').bind(function(){
	alert('custom closure');
  });			
			
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
  },
  run: function() {
	/* routes are stored globally using $(document).data() */  
	var routes = $(document).data('routes') || {};
	if(typeof routes[this.path] == 'undefined'){routes[this.path]={};}	
    if(typeof routes[this.path].events == 'undefined'){routes[this.path].events=new Array();}
	for(var i=0; i<routes[this.path].events.length; i++){
	  routes[this.path].events[i]();  
	}
  }
};
route.fn.init.prototype = route.fn;