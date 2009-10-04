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

  route.js enables you to create "routes" based on a unique path
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

  REGEX MATCHING:

  When calling route(path) you may specify a REGEX string for path.


  WHERE THE ROUTES AT? 
  
  All routes are stored globally in window['routes']
  console.log(window['routes']);
  
  PROTIP: Use a Dispatcher!

  var Biggie={};
  Biggie._hashchange_last = '';
  Biggie._onhashchange=function(){
    if(Biggie._hashchange_last!=location.hash){
      Biggie._hashchange_last=location.hash;
	  route(location.hash).run();
    }
  }

  setInterval(function () {Biggie._onhashchange();}, 50);
  

  Now, instead of calling route('#/websites').run() directly
  you could simply modify the location.hash to #/websites and 
  the route would trigger its events!

*************************************************************************/

var route=function(path){
  return new route.fn.init(path);
}
route.fn = route.prototype = {
  init: function(path) {
    /* lazy init window['routes'] */
    if(typeof window['routes'] == 'undefined'){window['routes']={};}
    if(typeof path=='undefined'){return;}

    /* wrap path as whole word match */
    this.path='\b'+path+'\b';
    this.events=new Array();

    for(r in window['routes']){ /* iterate through all existing routes */
      if(r.search(new RegExp(this.path, 'i'))==0){ /* search existing route based on path REGEX */

        /* a match has been found, assign matched route to current route instance */
        this.path=r;

        /* lazy init window['routes'][path].events */
        if(typeof window['routes'][this.path].events == 'undefined'){window['routes'][this.path].events=new Array();}
        this.events=window['routes'][this.path].events;
        return;
      }
    }

    /* since no matches were found lazy init empty route based on path */		
    window['routes'][this.path]={};
    window['routes'][this.path].events=new Array();
  },
  bind: function(fn) {
    if(typeof fn == 'function'){
      window['routes'][this.path].events.push(fn);
    }
  },
  run: function() {
    for(var i=0; i<this.events.length; i++){
      this.events[i]();  
    }
  },
  events: new Array()
};
route.fn.init.prototype = route.fn;
