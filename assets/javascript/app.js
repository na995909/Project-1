
$(document).ready(function(){
	//initialize autocomplete widget on input element  with id "address-input" 
	var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address-input'));

//on click search button
	$("#address-btn").on("click", function(event) {
		// prevents page reload
		event.preventDefault();

		//grabs user's input
		var address = $("#address-input").val().trim();
		var place = autocomplete.getPlace();
		//if mistyped, user is alerted with error
		if(!place){
			alert("Please insert valid place");
			return;
		}
		//removes transparency from search-panel, search-panel moves to the head of the page
		$('#search-panel').removeClass('transparent');
		//remopves background video from the page
		$('#background').remove();
		//removes header
		$('.header').remove();
		//shows results panel
		$('#result-panel').removeClass('hide');

		if (!place.geometry) {
		// User entered the name of a Place that was not suggested and
		// pressed the Enter key, or the Place Details request failed.
			window.alert("No details available for input: '" + place.name + "'");
			return;
		}
		//gets latitude and longitude of the place
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        //gets selected points of interest from dropdown list
        var placetype = $( "#sel1 option:selected" ).val();
        
		//here we construct our URL to find points of interest near given latitude and longitude
		var queryURL = "https://services.gisgraphy.com/geoloc/search?format=json&lat="+lat+"&lng="+lng+//"&radius=7000&"+
		"&placetype=" + placetype + "&from=1&to=10";
		
		//ajax call to pull data 
		$.ajax({
		    url: queryURL,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    type: "GET", 
		    dataType: "jsonp",
		    data: {
		    },
		    cache: false,
            success: function (data) {
            	//function triggered on succesful ajax call

            	//empties results table body
                $('#results').empty();
                //checks if API returns some results
                if(data.numFound > 0){
                	var res = data.result;
                	//iterating through results
                	for (var i = 0; i < res.length; i++) {
                		// constructing new row
                		var row = $("<tr>"+
							"<td>"+res[i].name+"</td>"+
							"<td>"+res[i].distance+"</td>"+
							"<td><a href='https://www.google.com/maps/@?api=1&map_action=pano&viewpoint="+res[i].lat+","+res[i].lng+"' target='_blank'>"+res[i].name+"</a></td>"+
						"</tr>");
						//appending new row to results table
						$('#results').append(row);
                	}
                }
            },
		    error: function () {
		    	//function triggered if error results return
		    }
		});
	});
});

