$(document).ready(function() {

	var url = location.href;
	var query = decodeURIComponent(url.substring(url.indexOf('?')+7, url.length));
		console.log(query);	
	$.getJSON(query, function (c) {
		var head = c.head.vars;
		var hLength = head.length;

		var body = c.results.bindings;
		var bLength = body.length;
		var result = "{ \"items\" : [";
		for(var i=0; i<bLength; i++){
			result += "{\"id\" : \"" + i + "\",";
			result += "\"label\" : \"" + i + "\",";
			for(var j=0; j<hLength; j++){
				var v = body[i];
				if(v[head[j]].value.indexOf("http") != -1)
					result += "\"" + head[j] + "\" : \"" + "<a href='" + v[head[j]].value + "'>" + v[head[j]].value + "</a>";
				else
					result += "\"" + head[j] + "\" : \"" + v[head[j]].value;

				if(j < hLength -1)
					result += "\",";
				else
					result += "\"";
				//console.log(v[head[j]].value);
			}
			if(i < bLength-1)
				result += "},";
			else
				result += "} ],";
		}
		result += "\"types\" : \"record(s)\",";
		result += "\"properties\" : {";
		for(var i=0; i<hLength; i++){
			result += "\"" + head[i] + "\" : { \"valueType\" : \"text\""
			if(i < hLength-1)
				result += "},";
			else
				result += "}}}";
		}
		c = JSON.parse(result);
		
		var b = [];
		$.each(c.properties, function (a) {
			b.push(a);
		});
		var d = $.map(b, function (a) {
			return "." + a;
		}).join(","), e = b.join(","), f = $.map(b, function () {
			return "list";
		}).join(",");
		$(".loading").empty();
		$(".exhibit-content").append($(document.createElement("div")).attr("ex:role", "exhibit-viewPanel").append($(document.createElement("div")).attr("ex:role", "exhibit-view").attr("ex:viewClass", "Exhibit.TabularView").attr("ex:label", "Table").attr("ex:columns", d).attr("ex:columnLabels", e).attr("ex:columnFormats", f).attr("ex:sortColumn", "0").attr("ex:sortAscending", "false")));
		$.each(c.properties, function (a) {
			console.log(a);
			$(".exhibit-options").append($(document.createElement("div")).attr("id", a + "-facet").attr("ex:role", "exhibit-facet").attr("ex:expression", "." + a).attr("ex:facetLabel", a))
		});

		window.database = Exhibit.Database.create();
		window.database.loadData(c);
		window.exhibit = Exhibit.create();
		window.exhibit.configureFromDOM()

	});		
});

function strip_tags (input, allowed) {
	allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	});
}
//$.holdReady(false); 

