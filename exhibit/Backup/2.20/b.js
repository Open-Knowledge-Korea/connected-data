var popupStatus = 0;

$(document).on("click", '.cThumbnail', function(e) {
	var prefix = [{"string":"type","value":"타입"}, {"string":"name","value":"이름"}, {"string":"description","value":"설명"}, {"string":"openingHour","value":"오픈시간"}, {"string":"entryFee","value":"요금"}, {"string":"dayOff","value":"휴무"}, {"string":"url","value":"홈페이지"}, {"string":"image","value":"사진"}, {"string":"telephone","value":"전화번호"}, {"string":"x-coord","value":"x좌표(TM)"}, {"string":"y-coord","value":"y좌표(TM)"}, {"string":"lat","value":"위도"}, {"string":"long","value":"경도"}, {"string":"postalCode","value":"우편번호"}, {"string":"streetNameAddress","value":"도로명 주소"}, {"string":"landLotNumberAddress","value":"동 주소"}, {"string":"si","value":"시"}, {"string":"gu","value":"구"}, {"string":"dong","value":"동"}, {"string":"sidoCode","value":"시도 코드"}, {"string":"sigugunCode","value":"시구군 코드"}, {"string":"eupmyeondongCode","value":"읍면동 코드"},{"string":"san","value":"산"},{"string":"bonBun","value":"본분"},{"string":"serial","value":"시리얼"}, {"string":"facilityCode","value":"시설 코드"},{"string":"managementCode","value":"관리코드"},{"string":"subjectCode","value":"블라블라"},{"string":"themeCode","value":"테마 코드"}];

	centerPopup();
	loadPopup();
	var id = $(this).attr('ex:itemid');

	console.log($(this).attr('ex:itemid'));
//		$.getJSON("http://lod.datahub.kr/endpoint/cf?query=DESCRIBE+<"+id+">&output=json&jsonp=&key=", function (c) {	
	$.getJSON("http://localhost/TheSeoul/endpoint/cf.php?query=DESCRIBE+<"+id+">&output=json&jsonp=&key=", function (c) {	
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
	$.getJSON("http://localhost/TheSeoul/endpoint/cf.php?query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+schema%3A++%3Chttp%3A%2F%2Fschema.org%2F%3E%0D%0APREFIX+ad%3A++++++%3Chttp%3A%2F%2Flod.datahub.kr%2Fdef%2Fad%2F%3E%0D%0APREFIX+rdfs%3A++++%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+cf%3A++++++%3Chttp%3A%2F%2Flod.datahub.kr%2Fdef%2Fcf%2F%3E%0D%0A%0D%0ASELECT+%3Fid+%3Flabel+%3Ftype+%3Fgu+%3Fdong+%3FentryFee+%3Fimg+WHERE+%7B%0D%0A++%3Fid+rdfs%3Alabel+%3Flabel+.%0D%0A++%3Fid+rdf%3Atype+%3Ftype+.%0D%0A++%3Fid+ad%3Agu+%3Fgu+.%0D%0A++%3Fid+ad%3Adong+%3Fdong+.%0D%0A++%3Fid+cf%3AentryFee+%3FentryFee+.%0D%0A++%3Fid+schema%3Aimage+%3Fimg+.%0D%0A%7D+LIMIT+100000%0D%0A%0D%0A+%0D%0A&output=json&jsonp=&key=", function (c) {		
	//$.getJSON("http://lod.datahub.kr/endpoint/cf?query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+schema%3A++%3Chttp%3A%2F%2Fschema.org%2F%3E%0D%0APREFIX+ad%3A++++++%3Chttp%3A%2F%2Flod.datahub.kr%2Fdef%2Fad%2F%3E%0D%0APREFIX+rdfs%3A++++%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+cf%3A++++++%3Chttp%3A%2F%2Flod.datahub.kr%2Fdef%2Fcf%2F%3E%0D%0A%0D%0ASELECT+%3Fid+%3Flabel+%3Ftype+%3Fgu+%3Fdong+%3FentryFee+%3Fimg+WHERE+%7B%0D%0A++%3Fid+rdfs%3Alabel+%3Flabel+.%0D%0A++%3Fid+rdf%3Atype+%3Ftype+.%0D%0A++%3Fid+ad%3Agu+%3Fgu+.%0D%0A++%3Fid+ad%3Adong+%3Fdong+.%0D%0A++%3Fid+cf%3AentryFee+%3FentryFee+.%0D%0A++%3Fid+schema%3Aimage+%3Fimg+.%0D%0A%7D+LIMIT+100000%0D%0A%0D%0A+%0D%0A&output=json&jsonp=&key=", function (c) {		
		
		var i, j, object, key;
		var result = c;
		var input = {
			items : [],
			types : {},
			properties : {}
		};

		for(i = 0; i < result.results.bindings.length; i++) {
			object = result.results.bindings[i];
			var temp = {};
			for(j = 0; j < result.head.vars.length; j++) {
				key = result.head.vars[j];
				temp[key] = object[key].value;
			}
			input.items.push(temp);
		}

		var c = input;

/*
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
//		$(".exhibit-content").append($(document.createElement("div")).attr("ex:role", "exhibit-viewPanel").append($(document.createElement("div")).attr("ex:role", "exhibit-view").attr("ex:viewClass", "Exhibit.TabularView").attr("ex:label", "Table").attr("ex:columns", d).attr("ex:columnLabels", e).attr("ex:columnFormats", f).attr("ex:sortColumn", "0").attr("ex:sortAscending", "false")));
//		$.each(c.properties, function (a) {
//			console.log(a);
//			$(".exhibit-options").append($(document.createElement("div")).attr("id", a + "-facet").attr("ex:role", "exhibit-facet").attr("ex:expression", "." + a).attr("ex:facetLabel", a))
//		});
*/
		window.database = Exhibit.Database.create();
		window.database.loadData(c);
		window.exhibit = Exhibit.create();
		window.exhibit.configureFromDOM()

		$("a.exhibit-facet-value-link").each(function(){
			var subject = strip_tags($(this).text());
			$(this).text(subject);
		});

		$("table.exhibit-tabularView-body").each(function(){
		});

			$("#popupContactClose").click(function(){
			disablePopup();
		});
		$("#backgroundPopup").click(function(){
			disablePopup();
		});
		$(document).keypress(function(e){
			if(e.keyCode==27 && popupStatus==1){
			disablePopup();
			}
		});
	});		
});

function strip_tags (input, allowed) {
	allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	});
}
$.holdReady(false); 

