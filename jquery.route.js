
var route = {};



route.connect = function(el,path,eventTrigger){
	/* TODO: strip out hostnames such as ("http://","www.","domainname",".com",".net","/") */
	/* you could also do REGEX replacements here */
	//path = path.replace( new RegExp( 'searchStringWithRegex', 'gi' ), 'replacementText');
	$(el).data('route', { 
		path: path,
		eventTrigger: eventTrigger
	});

	switch(eventTrigger)
		{
			case 'hover':
				$(el).hover(events[theEvent][0],events[theEvent][1]);		
			break;
			default:
				//console.log(el);
				
				/* inversion of control magic lookup
				   http://en.wikipedia.org/wiki/Hollywood_Principle
				*/
				
				/* find all elements that match this path */
				
				$(el).bind(eventTrigger,function(){
					//alert('h');
					route.enterState(path);
					//route.next(this);
				});
			break;
		}
};

route.register = function(el,path,type,returnFormat,uri){
		console.log(path);
		var myRoute = {
			type: type,
			returnFormat: returnFormat,
			uri: uri
		};
		//console.log($(el).data(path));
		$(el).data(path,myRoute);
		delete myRoute;
		return;
};


route.enterState = function(startState){
	//alert('p');
	//console.log(startState);
	
	//var acceptingStates = $(startState).attr('id');
	//console.log(startState);
	//return;
	/* find accepting states */
	console.log(startState);
	var myRoutes = $(':data('+startState+')');
	$.each(myRoutes,function(i,e){
		var myRoute = $(e).data(startState);
		
		console.log(e,$(e).data(startState).uri);
		//console.log(i,e);
			//console.log(myRoute,$(e).attr('id'));
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
	delete myRoutes;
	return;
}; 



route.override = function(el){
	/* POST */
		/* override form submits */
			var myPostActions = $('form').each(function(i,el){
				var myPostAction = $(el).attr('action');
				myPostAction = '#' + myPostAction;
				
				//route.connect('#area1','#/blog/another-post','click');

				route.connect(el,myPostAction,'click');
				
				$(el).attr('action',myPostAction);
				//override form action with onsubmit handler
				$(el).submit(function(e){
					route.next($(this));
					return false;
				});
			});
	/* GET */
		/* override links */
			var myGetActions = $('a').each(function(i,el){
				var myGetAction = $(el).attr('href');
				myGetAction = '#' + myGetAction;
				route.connect(el,myGetAction,'click');
				//override "href" with onclick handler
				$(el).click(function(e){
					route.next($(this));
					return false;
				});
			});
}

route.next = function(el){
	/* TODO: add aspects (before aspect) */
	/* copy route data from jQuery once, as to limit $ calls */
	var myRoute = $(el).data('route');
	console.log(myRoute);
	
	/* update browser's url bar */
	location.hash = $(el).data('route').path;

	/* TODO: add aspects (after aspect) */
};

route.previous = function(e){
	console.log(e)	
};


var outputTarget = "#output";