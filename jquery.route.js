/* 
 * this is a javascript implementation of Inversion of Control
 * http://en.wikipedia.org/wiki/Hollywood_Principle
 * "Don't call us, we'll call you"

 */
var route = {};
var routes = new Array();
/* this method will register a location.hash path with an element and an event
 * whenever that event is triggered on that element, all accepting states
 * that are also bound to the location.hash path will fire */
route.startState = function(el,path,eventTrigger){
	/* TODO: strip out hostnames such as ("http://","www.","domainname",".com",".net","/") */
	/* you could also do REGEX replacements here */
	//path = path.replace( new RegExp( 'searchStringWithRegex', 'gi' ), 'replacementText');
	
	/* register path and eventTrigger for element */
	$(el).data('route', { 
		path: path,
		eventTrigger: eventTrigger
	});

	/* here is where we invert control of the method */
	switch(eventTrigger)
		{
			/* we could add custom eventTriggers here */
			/* bind() will work well for events such as "click" */
			default:
				$(el).bind(eventTrigger,function(){
					route.enterState(path);
				});
			break;
		}
};

/* this method will register a route to be executed after a 
 * start state has been initated. 
 */
route.acceptState = function(el,path,type,returnFormat,uri){
		var myRoute = {
			type: type,
			returnFormat: returnFormat,
			uri: uri
		};
		var r = {};
		r[path] = myRoute;
		routes.push(r);
		$('#newStates').html($.toJSON(routes));
		$(el).data(path,myRoute);
		return false;
};

/* this method will execute when a state is triggered */
route.enterState = function(startState){

//	console.log(startState);
	/* use a custom data() selector to search for routes/states
	   http://github.com/Marak/jquery.dataSelector.js/ 	*/
	var myRoutes = $(':data('+startState+')');
	
	$('#currentState').html(startState);
	$.each(myRoutes,function(i,e){
		var myRoute = $(e).data(startState);
			/* determine type of route we are working with */
			switch(myRoute.type)
			{
				case 'LOCAL':
				// we are going to retrieve local data
				break;
				case 'REMOTE': 
				// we are going to get remote data
					switch(myRoute.returnFormat)
					{
						case 'JSON': 
							/* request JSON from REMOTE server */
							/* TODO: hook jquery.template.js here */
							//$(myRoute.targetOutput).html('JSON gets sent here and then microtemplated with jquery.template.js');
						break;
						case 'HTML': 
							/* request HTML fragment from REMOTE server */
							//$(e).html(('Do Get Request to ' + myRoute.uri) + ' and fill up with the response HTML fragment.')
							$.get(myRoute.uri,function(data){
								$(e).html(data);										 
							});
						break;
						case 'XML': 
						break;
						case 'PLAINTEXT': 
						break;
						case 'WDDX': 
						break;
						case 'CSV': 
						break;

						default:
						break;
					}
				break;
				default:
				break;
			}
	});

	/* update browser's url bar */
	location.hash = startState;
	return false;
}; 

route.override = function(){
	/* POST */
		/* override form submits */
			var myPostActions = $('form').each(function(i,el){
				var myPostAction = $(el).attr('action');
				myPostAction = '#' + myPostAction;
				route.startState(el,myPostAction,'click');
				$(el).attr('action',myPostAction);
				//override form action with onsubmit handler
				$(el).submit(function(e){
					return false;
				});
			});
	/* GET */
		/* override links */
			var myGetActions = $('a').each(function(i,el){
				var myGetAction = $(el).attr('href');
				myGetAction = '#' + myGetAction;
				route.startState(el,myGetAction,'click');
				//override "href" with onclick handler
				$(el).click(function(e){
					return false;
				});
			});
}
