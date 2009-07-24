var route = {};

route.override = function(el){
	/* POST */
		/* override form submits */
			var myPostActions = $('form').each(function(i,el){
				var myPostAction = $(el).attr('action');
				myPostAction = '#' + myPostAction;
				route.register(el,myPostAction,'HTML','REMOTE');
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
				route.register(el,myGetAction,'HTML');
				//override "href" with onclick handler
				$(el).click(function(e){
					route.next($(this));
					return false;
				});
			});
}

route.next = function(el){
	/* trigger before aspect */

	/* copy route data from jQuery once, as to limit $ calls */
	var myRoute = $(el).data('route');

	/* determine type of route we are working with */
	switch(myRoute.type)
	{
		case 'LOCAL':
		// we are going to retrieve local data
		break;
		case 'REMOTE': 
		// we are going to get remote data
		break;
		default:
		break;
	}

	switch(myRoute.returnType)
	{
		case 'JSON': 
			/* TODO: hook jquery.template.js here */
			/* render html into targetOutput dom */
			$(myRoute.targetOutput).html('JSON gets sent here and then microtemplated with jquery.template.js');
		break;
		case 'HTML': 
			/* render html into targetOutput dom */
			$(myRoute.targetOutput).html('Here we can remote to ' + myRoute.path +' and get back a rendered html fragment or JSON that can be microtemplated with jquery.template.js');
		break;
		default:
		break;
	}




	/* update browser's url bar */
	location.hash = $(el).data('route').path;

	/* trigger after aspect */

};

route.previous = function(e){
	console.log(e)	
};

route.register = function(el,path,type,returnType){
	/* replace form action with location.hash reference */
	/* TODO: strip out hostnames such as ("http://","www.","domainname",".com",".net","/") */
	
	/* you could also do REGEX replacements here */
	//myPostAction = myPost.replace( new RegExp( 'searchStringWithRegex', 'gi' ), 'replacementText');
	$(el).data('route', { 
		path: path, 
		type: type, 
		returnType: returnType,
		targetOutput: '#output', 
		previousRoutes:''
	});

};
		
var outputTarget = "#output";