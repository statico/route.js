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

  WHERE THE ROUTES AT? 
  
  All routes are stored globally in window['routes']
  console.log(window['routes']);

  ROUTE PATTERN MATCHING  (aka Sinatra routing):

  add docs here

  ASPECTS OF THE ROUTE (aka Apsect Oriented Programming)

  var myBefore = function(){
    alert('before()');
  };
	
  var myAfter = function(){
    alert('after()');
  };
	
  var myExit= function(){
    alert('exit()');
  };

  route('#/Learn/:topic').before(myBefore);
  route('#/Learn/:topic').after(myAfter);
  route('#/Learn/:topic').exit(myExit);

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