
$(document).ready(function(){
	var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address-input'));

//on click search button
	$("#address-btn").on("click", function(event) {
		event.preventDefault();
		//grabs user's input
		var address = $("#address-input").val().trim();
		var place = autocomplete.getPlace();
		if (!place.geometry) {
		// User entered the name of a Place that was not suggested and
		// pressed the Enter key, or the Place Details request failed.
			window.alert("No details available for input: '" + place.name + "'");
			return;
		}
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        var placetype = $( "#sel1 option:selected" ).val();
        
		//here we construct our URL
		var queryURL = "https://services.gisgraphy.com/geoloc/search?format=json&lat="+lat+"&lng="+lng+//"&radius=7000&"+
		"&placetype=" + placetype + "&from=1&to=10";
		

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
                console.log(data);
                $('#results').empty();
                if(data.numFound > 0){
                	var res = data.result;
                	for (var i = 0; i < res.length; i++) {
                		var row = $("<tr>"+
							"<td>"+res[i].name+"</td>"+
							"<td>"+res[i].distance+"</td>"+
							"<td><a href='https://www.google.com/maps/@?api=1&map_action=pano&viewpoint="+res[i].lat+","+res[i].lng+"' target='_blank'>"+res[i].name+"</a></td>"+
							//"<td><a href='"+res[i].openstreetmap_map_url+"' target='_blank'>"+res[i].name+"</a></td>"+
						"</tr>");
						$('#results').append(row);
                	}
                }
                //var row = $();
            },
		    error: function () {
		        console.log("error");
		    }
		});
	});
});

