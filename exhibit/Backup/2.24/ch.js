var popupStatus = 0;

$(document).on("click", '.chThumbnail', function(e) {
	centerPopup();
	loadPopup();

	var id = $(this).attr('ex:itemid');
		$.getJSON("http://lod.datahub.kr/endpoint/kch?query=DESCRIBE+<"+id+">&output=json&jsonp=&key=", function (c) {	
//	$.getJSON("http://localhost/TheSeoul/endpoint/kch.php?query=DESCRIBE+<"+id+">&output=json&jsonp=&key=", function (c) {
		var i, j, item;
		var result = c;
		var html = "";
		var cFlag = 0;
		var title = "";
		var keys = Object.keys(result[id]);
		html += "<table class=\"table table-striped\">";
		html += "<tr><th width=\"30%\">Label</th><th width=\"70%\">Value</th></tr>";
		for(i = 0; i < keys.length; i++) {
			for(var k=0; k < prefix.length; k++){
				if(keys[i].indexOf(prefix[k].string) != -1){
					html += "<tr><td><a href=\"" + keys[i] + "\">" + prefix[k].value + "</a></td><td>";	
					cFlag = 1;
				}				
			}
			if(cFlag == 1)
				cFlag = 0;
			else
				html += "<tr><td><a href=\"" + keys[i] + "\">" + keys[i] + "</a></td><td>";

			for(j = 0; j < result[id][keys[i]].length; j++) {
				if(keys[i].indexOf("label") != -1)
					title += result[id][keys[i]][j].value + "<br>";
				if(result[id][keys[i]][j].value.indexOf("http") != -1){
					html += "<a href=\"" + result[id][keys[i]][j].value + "\">" + result[id][keys[i]][j].value + "</a><br>";
				}
				else
					html += result[id][keys[i]][j].value + "<br>";
			}
			html += "</td></tr>";
		}			
		html += "</table>"

		$("#titleText").text("");
		$("#titleText").append(title);
		$("#contactArea").text("");
		$("#contactArea").append(html);
	});
});

function loadPopup(){
	if(popupStatus==0){
		$("#backgroundPopup").css({
			"opacity": "0.7"
		});
		$("#backgroundPopup").fadeIn("slow");
		$("#popupContact").fadeIn("slow");
		popupStatus = 1;
	}
}

function disablePopup(){
	if(popupStatus==1){
		$("#backgroundPopup").fadeOut("slow");
		$("#popupContact").fadeOut("slow");
		popupStatus = 0;
	}
}

//centering popup
function centerPopup(){
	var windowHeight = document.documentElement.clientHeight;
	var iHeight = (document.body.clientHeight / 2) - 600 / 2 + document.body.scrollTop;
	var iWidth = (document.body.clientWidth / 2) - 500 / 2 + document.body.scrollLeft;

	var popupHeight = $("#popupContact").height();
	var popupWidth = $("#popupContact").width();
	
	//centering
	$("#popupContact").css({
		"position": "absolute",
		"top": iHeight,
		"left": iWidth
	});
	$("#backgroundPopup").css({
		"height": windowHeight
	});
}

$(document).ready(function() {
	$.getJSON("./kch.json", function (c) {		
		
		var i, j, object, key;
		var result = c;
		var input = {
			items : [],
			types : {},
			properties : {}
		};
		alert(result.results.bindings.length);
		for(i = 0; i < result.results.bindings.length; i++) {
			object = result.results.bindings[i];
			var temp = {};
			for(j = 0; j < result.head.vars.length; j++) {
				key = result.head.vars[j];
				if(object[key] != null) {
					temp[key] = object[key].value;
				}
				else {
					temp[key] = null;
				}
			}
			input.items.push(temp);
		}

		var c = input;

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