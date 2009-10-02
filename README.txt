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