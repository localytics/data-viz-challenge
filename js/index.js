/*
	Start localserver: python -m SimpleHTTPServer
	Open in web: http://localhost:8000/
*/


/*
	http://data-viz-challenge.localytics.com/

	Task: You're the resident data expert at BootLoader. You'd like to create a 
	visualization that helps answer: what kinds of users would be interested in the 
	bicycle project?

	Bicyle project
		"category": "Sports" and "Environment"
		"event_name": "View Project" and "Fund Project"

	-Because we know that people who have viewed or funded in category "Sports" and
	"Environment" will definitely like the bicycle project, 
	we can try deducing the based on state, age, gender, and marital_status. 

	1) Get all JSON objects from "category" of "Sports" and "Environment"
	2) Get the percentage of each of the elements I mentioned above from these objects
		-For example, 55% of "Sports" data are in the age of "25-34", etc..
	3) This way we can also assume that other users in age group 25-34 would also
		be interested in bicycle project


	age_range: one of ['18-24', '25-34', '35-44', '45-54', '55+']		|| 5
	gender: one of ['M', 'F', 'U'] (Male, Female, Unspecified)			|| 3
	location: 
		city:
		state:   || 50 - (possibly too many...)


	Donut charts for all the options. Clicking each comparison method will
	dynamically change the percentage size. 
	And use sunburst for state and cities..  
	Fade text in the middle when hover over a region

	{
	  "event_name": "View Project",
	  "gender": "M",
	  "marital_status": "single",
	  "session_id": "98ccfbe8c29845c0a44f8e56213d1def",
	  "device": "android",
	  "category": "Technology",
	  "age": "25-34",
	  "client_time": 1393632024,
	  "location": {
	    "latitude": 33.786594,
	    "city": "Covina",
	    "state": "CA",
	    "longitude": -118.298662,
	    "zip_code": "91723"
	  }
	}
*/
//////////////////////////////////////////////////////////////
///////////////////////// constants //////////////////////////
var categories = {"age":['18-24', '25-34', '35-44', '45-54', '55+'],"gender":['M', 'F', 'U'],
				"marital_status":['single', 'married'], "device":['iOS', 'android']};
// var description = {"age":"The breakdown by age for all users who participated in any event related to Sports and Environment"};
var mainData;


//////////////////////////////////////////////////////////////
///////////////////// main function //////////////////////////
$(document).ready(function(){


//////////////////////////////////////////////////////////////
//////////////////// initialization //////////////////////////
domain = getDomain("age");
// act = parseDay("day",dataList.activities);

var svg = d3.select("#div_container")
	.append("svg")
	.append("g");

var s = d3.select("#div_container");
svg.append("g")
	.attr("class", "slices");
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");

// var width = $(".div_leftGraph").width()/2,
//     height = $(".div_leftGraph").height()*2/3,
var width = $("#div_container").width(),
    height = $("#div_container").height(),
	radius = Math.min(width, height)/2;

//determines the values
var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width/2 + "," + height/2 + ")");

/*
	color is randomly generated depending on the number of
	categories
*/
var color = setColor(domain);


$.getJSON('data.json', function(data){
	mainData = getNeccessaryData(data.data, "all");
	triggerChange(mainData, "age");
});

////////////////////////////////////////////////////////////////
//////////////////// event listeners ///////////////////////////

$(".btn-category button").click(function(){
	if($($(this)[0]).hasClass("dropdown-toggle")){ return }
	var cateid = $($(this)[0]).attr("id");
	$(".btn-category button").removeClass("active");
	$($(this)[0]).addClass("active");
	var eventid= $(".btn-event .active").attr("id");
	var categorySpecific = getNeccessaryData(mainData, eventid);
	triggerChange(categorySpecific, cateid);
});

$(".btn-event button").click(function(){
	var eventid = $($(this)[0]).attr("id"),
		cateid= $(".btn-category .active").attr("id");
	$(".btn-event button").removeClass("active");
	$($(this)[0]).addClass("active");
	var eventSpecific = getNeccessaryData(mainData, eventid);
	triggerChange(eventSpecific, cateid);
});


//////////////////////////////////////////////////////////////////
////////////////////// helper functions //////////////////////////
function triggerChange(d, cate){
	// domain = getDomain(type),
	// color = setColor(domain);
	setLabel(cate);
	var parsed = parseData(d, cate);
	change(parsed);
}

function setColor(domain){
	return d3.scale.ordinal().domain(domain[0]).range(domain[1]);
}
function setLabel(label){
	$("#span_label").text(label);
}

//used for generating a random color 
function generateHex(){
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}



function getDomain(type){
	var color = [], totalcate = [];
	for(cate in categories){
		for(var j=0; j<categories[cate].length; j++){
			totalcate.push(categories[cate][j]);
			color.push(generateHex());
		}
	}
	return [totalcate, color];
}


function change(data) {
	var totalValue = 0;
	for(var i=0; i<data.length; i++){
		totalValue+=data[i].value;
	}

	var key = function(d){ return d.data.label };

	/* ------- PIE SLICES -------*/
	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(data), key);

	slice.enter()
		.insert("path")
		.style("fill", function(d) { 
			return color( d.data.label ); 
		})
		.attr("class", "slice");

	slice		
		.transition().duration(1000)
		.attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})

	slice.exit()
		.remove();
	/* ------- TEXT LABELS -------*/

	var text = svg.select(".labels").selectAll("text")
		.data(pie(data), key);

	text.enter()
		.append("text")
		.attr("dy", ".35em")
		.text(function(d) {
			return d.data.label +"("+getPercentage(d.value/totalValue)+")";
		});
	
	//additional handler for label and text change for updates..
	//append("text") only works for the first load
	d3.select(".labels").selectAll("text")
		.text(function(d){
			return d.data.label +" ("+getPercentage(d.value/totalValue)+")";
		});

	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(1000)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});

	text.exit()
		.remove();

	/* ------- SLICE TO TEXT POLYLINES -------*/

	var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(data), key);
	
	polyline.enter()
		.append("polyline");

	polyline.transition().duration(1000)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});
	
	polyline.exit()
		.remove();
};


//takes in a list of data and returns a new list that only contains
//data in category "Sports" and "Environment"
function getNeccessaryData(data, projectType){
	var newlist = [];
	for(var i=0; i<data.length; i++){
		var d = data[i];
		if(d.category =="Sports" || d.category == "Environment"){

			if(projectType == "all"){newlist.push(d); continue}
			if(d.event_name == projectType){ newlist.push(d); }
		}
	}
	return newlist;
}

/*
	Takes in label and the value and makes a constructor
*/
function objectConstructor(label, value){
	var o = new Object();
	o.label = label;
	o.value = value;
	return o;
}

/*
	takes in a list of activities and returns a list of categories 
*/
function getCategory(activities){
	var cate = domain[0], color = domain[1];
	for(var i=0; i<activities.length; i++){
		var categor;
		if(typeof activities[0] == "string"){ //activities is a list of categories
			categor = activities[i];
		}else{ categor = activities[i].category; }
		if(categor !== undefined){
			var formatted = formatCategory(categor);
			if(cate.indexOf(formatted) == -1){
				// console.log("adding:",formatted);
				cate.push(formatted);
				color.push(generateHex());
			}
		}
	}
	cate.push("unspecified");
	color.push(generateHex());
	domain = [cate, color];
	// return [cate, color];
}

/*
	Given a list of data, group the data into similar category based
	on given type
	data: list of json objects
	type: the category we want to parse by (i.e. "gender")
*/
function parseData(data, type){
	var parsed = [], category = [];
	for(var i=0; i<data.length; i++){
		var cate = data[i][type];
		var ind = category.indexOf(cate);
		if(ind !== -1){
			for(var j=0; j<category.length; j++){
				if(parsed[j].label == cate){
					parsed[j].value += 1;
					break;
				}
			}
		}else{
			category.push(cate);
			parsed.push(objectConstructor(cate, 1));
		}
	}
	return parsed;
}



function getPercentage(dec){
	return (dec*100).toString().substring(0,4)+"%";
}



});







