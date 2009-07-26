var route = {};
route.startState = function(el,path,eventTrigger){
	/* TODO: strip out hostnames such as ("http://","www.","domainname",".com",".net","/") */
	/* you could also do REGEX replacements here */
	//path = path.replace( new RegExp( 'searchStringWithRegex', 'gi' ), 'replacementText');
	$(el).data('route', { 
		path: path,
		eventTrigger: eventTrigger
	});

	/* invert control of event to accepting state 
	   http://en.wikipedia.org/wiki/Hollywood_Principle
	   "Don't call us, we'll call you"
	*/
	switch(eventTrigger)
		{
			case 'hover':
				$(el).hover(events[theEvent][0],events[theEvent][1]);		
			break;
			default:
				$(el).bind(eventTrigger,function(){
					route.enterState(path);
				});
			break;
		}
};

route.acceptState = function(el,path,type,returnFormat,uri){
		var myRoute = {
			type: type,
			returnFormat: returnFormat,
			uri: uri
		};
		$(el).data(path,myRoute);
		return;
};


route.enterState = function(startState){
	var myRoutes = $(':data('+startState+')');
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
							//console.log;
							$(e).html(('Do Get Request to ' + myRoute.uri) + ' and fill up with the response HTML fragment.')
							/*$.get('http://www.google.com',function(data){
								$(myRoute.targetOutput).html(data);										 
							});*/
							//$(myRoute.targetOutput).html();				  
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
	return;
}; 

route.override = function(el){
	/* POST */
		/* override form submits */
			var myPostActions = $('form').each(function(i,el){
				var myPostAction = $(el).attr('action');
				myPostAction = '#' + myPostAction;
				route.startState(el,myPostAction,'click');
				$(el).attr('action',myPostAction);
				//override form action with onsubmit handler
				$(el).submit(function(e){
//					route.next($(this));
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
	//				route.next($(this));
					return false;
				});
			});
}
