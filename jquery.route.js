var route = {};

route.override = function(el){
	/* POST */
		/* override form submits */
			var myPostActions = $('form').each(function(i,el){
				var myPostAction = $(el).attr('action');
				myPostAction = '#' + myPostAction;
				route.connect(el,myPostAction,'HTML','REMOTE');
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
				route.connect(el,myGetAction,'HTML','REMOTE');
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

	/* determine type of route we are working with */
	switch(myRoute.type)
	{
		case 'LOCAL':
		// we are going to retrieve local data
		break;
		case 'REMOTE': 
		// we are going to get remote data
			switch(myRoute.format)
			{
				case 'JSON': 
					/* request JSON from REMOTE server */
					/* TODO: hook jquery.template.js here */
					$(myRoute.targetOutput).html('JSON gets sent here and then microtemplated with jquery.template.js');
				break;
				case 'HTML': 
					/* request HTML fragment from REMOTE server */

					/*$.get('http://www.google.com',function(data){
						$(myRoute.targetOutput).html(data);										 
					});*/
					$(myRoute.targetOutput).html();				  
				break;
				default:
				break;
			}
		break;
		default:
		break;
	}
	
	/* update browser's url bar */
	location.hash = $(el).data('route').path;

	/* TODO: add aspects (after aspect) */
};

route.previous = function(e){
	console.log(e)	
};

route.register = function(el,f,e){
	$(el).bind(f,e);
};

route.connect = function(el,path,format,type){
	/* TODO: strip out hostnames such as ("http://","www.","domainname",".com",".net","/") */
	/* you could also do REGEX replacements here */
	//path = path.replace( new RegExp( 'searchStringWithRegex', 'gi' ), 'replacementText');
	$(el).data('route', { 
		path: path, 
		format: format, 
		type: type,
		targetOutput: '#output', 
		previousRoutes:''
	});
};
var outputTarget = "#output";