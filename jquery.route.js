var route = {};
route.override = function(el){
	/* POST */
		/* override form submits */
			var myPostActions = $('form').each(function(i,el){
				var myPostAction = $(el).attr('action');
				myPostAction = '#' + myPostAction;
				route.register(el,myPostAction);
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
			route.register(el,myGetAction);
			//override "href" with onclick handler
			$(el).click(function(e){
			route.next($(this));
			return false;
		});
	});
}

route.next = function(el){
	$($(el).data('targetOutput')).html($(el).data('route'));
	location.hash = $(el).data('route');
};

route.previous = function(e){
	console.log(e)	
};

route.register = function(el,route){
	/* replace form action with location.hash reference */
	/* TODO: strip out hostnames such as ("http://","www.","domainname",".com",".net","/") */
	
	/* you could also do REGEX replacements here */
	//myPostAction = myPost.replace( new RegExp( 'searchStringWithRegex', 'gi' ), 'replacementText');
	$(el).data('route',route);
	$(el).data('previousRoutes','');
	$(el).data('targetOutput','#output');
};
		
var outputTarget = "#output";