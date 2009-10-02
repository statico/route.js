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
  route('#/websites').bind(customMethod2);			
			
  route('#/account').run();
  route('#/websites').run();
			
*************************************************************************/