//initialize function called when the script loads
// Calls first functions to run
function initialize() {
	cities();
	debugAjax();
} ;

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Christchurch',
			population: 374900
		},
		{
			city: 'Shanghai',
			population: 24180000
		},
		{
			city: 'Wilmette',
			population: 27418
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");

	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");

	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);

    };
		// Runs functions
    addColumns(cityPop);
    addEvents(cityPop);

};
// Function to add city size column to table
function addColumns(cityPop){
		//Loops through each city
    $('tr').each(function(i){
			// Puts column header in first row
    	if (i == 0){

    		$(this).append('<th>City Size</th>');
    	} else {
				// Assigns city size category based on population
				var citySize;

				if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
				// Appends city size category to row
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};
// Adds function for the table to turn diferent colors when you mouse over
function addEvents(){

	$('table').mouseover(function(){

		var color = "rgb(";
		// For loop until j = 2
		for (var j=0; j<3; j++){
			// Returns a floating-point, pseudo-random number in the range 0–1,
			// returns the value of a number rounded to the nearest integer. and multiplies by 255
			var random = Math.round(Math.random() * 255);
			// Adds number to color variable
			color += random;
			// Adds comma to color variable
			if (j<2){
				color += ",";
			// Adds closing parentheses to color variable
			} else {
				color += ")";
		};
		// Assigns color to object based on randomly assigned values
		$(this).css('color', color);
	}});

// Adds function for popup to appear when you click table
function clickme(){

		alert('Hey, you clicked me!');
	};

	$('table').on('click', clickme);
};

//call the initialize function when the document has loaded
$( document ).ready( initialize );

//define callback function
function debugCallback(mydata){
	// Prints GeoJSON file content as string
	$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));
};

// Defines function
function debugAjax(){
	// Creates variable
	var mydata;

	// Loads json file into environment
	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function(response){
			// Defines response as mydata variable
			mydata = response;
			// Prints GeoJSON file in console
			console.log('This loads: ' + JSON.stringify(mydata));
			// Calls callback function
			debugCallback(mydata);
		}
	});
};
// Prints that GeoJSON file is undefined in console
// Because it's outside function
console.log('mydata is undefined: ' + typeof mydata);
