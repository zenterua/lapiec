jQuery(function($)  {

	var markers = [], map, myLatlng, marker, image, locations, allStatus, statusInfoWindow;

	// Create markers
	function addMarker(location, description, time, status, delayed){
        image = {
            url: $('#map').attr('data-map-marker'),
            scaledSize : new google.maps.Size(50, 50),
        };
        marker = new google.maps.Marker({
            position: location,
            icon: {
                path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
                fillColor: status === 'Готовится' ? '#ffff00' : delayed === true ? '#008000' : '#fff',
                fillOpacity: 1,
                strokeColor: '',
                strokeWeight: 0
            },
            label: {
                text: time.toString(),
                color: time < 0 ? "#be0000" : "#222",
                fontWeight: "bold",
                fontSize: "18px"
            }

        });

        markers.push(marker);
        marker.setMap(map);
        smoothZoomMap(map, 14);
        map.panTo(location);

        statusInfoWindow = new google.maps.InfoWindow({
            content: description
        });
        statusInfoWindow.open(map,marker);
        
        google.maps.event.addListener(marker,'click', (function(marker,description,statusInfoWindow){ 
            return function() {
                statusInfoWindow.setContent(description);
                statusInfoWindow.open(map,marker);
            };
        })(marker,description,statusInfoWindow)); 
    }
	
	// initialize map
	function initialize() {
		var lat = $('#map').attr("data-lat");
		var lng = $('#map').attr("data-lng");

		myLatlng = new google.maps.LatLng(lat,lng);

		var setZoom = parseInt($('#map').attr("data-zoom"));

		var styles  =[{"featureType": "administrative.country","elementType": "geometry.fill","stylers": [{"saturation": "-35"}]}];

        var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

		var mapOptions = {
			zoom: setZoom,
			zoomControl: true,
			center: myLatlng,
			mapTypeControlOptions: {
			  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		};

        //Create map
    	map = new google.maps.Map(document.getElementById("map"), mapOptions); 
    	map.mapTypes.set('map_style', styledMap); 
    	map.setMapTypeId('map_style');

    	$.ajax({
            url: 'map-locations.json',
            type: 'get',
            dataType: 'json',
            error: function(data){
                console.log('error');
            },
            success: function(data) {
                allStatus = data;

                for ( var i = 0; i < allStatus.length; i++ ) {
                    myLatlng = new google.maps.LatLng(allStatus[i].location.lat, allStatus[i].location.lng);
                    addMarker(myLatlng, allStatus[i].info, allStatus[i].delivery_time_to_end, allStatus[i].status, allStatus[i].delayed);
                }
            }
        });

    }

    function showActiveStatus(dataFilter) {
        resetMap();

        if ( dataFilter === 'All' ) { // show all markesr
            for ( var k = 0; k < allStatus.length; k++ ) {
                myLatlng = new google.maps.LatLng(allStatus[k].location.lat, allStatus[k].location.lng);
                addMarker(myLatlng, allStatus[k].info, allStatus[k].delivery_time_to_end, allStatus[k].status, allStatus[k].delayed);
            }
        } else if ( dataFilter === 'ReadyAndInProgress' ) { // show only those markes who have status Готово or Готовится
            for ( var j = 0; j < allStatus.length; j++ ) {

                if ( allStatus[j].status === 'Готово' || allStatus[j].status === 'Готовится' ) {
                    myLatlng = new google.maps.LatLng(allStatus[j].location.lat, allStatus[j].location.lng);
                    addMarker(myLatlng, allStatus[j].info, allStatus[j].delivery_time_to_end, allStatus[j].status, allStatus[j].delayed);
                }  

            } 
        } else if ( dataFilter === 'delayed') { // show those markes who have delayed true
            for ( var n = 0; n < allStatus.length; n++ ) {

                if ( allStatus[n].delayed === true && allStatus[n].status === 'Готовится') {
                    myLatlng = new google.maps.LatLng(allStatus[n].location.lat, allStatus[n].location.lng);
                    addMarker(myLatlng, allStatus[n].info, allStatus[n].delivery_time_to_end, allStatus[n].status, allStatus[n].delayed);
                }  

            } 
        }else {
            for ( var i = 0; i < allStatus.length; i++ ) { // other classic status markes. like В пути or Ждет отправки etc.

                if ( allStatus[i].status == dataFilter) {
                    myLatlng = new google.maps.LatLng(allStatus[i].location.lat, allStatus[i].location.lng);
                    addMarker(myLatlng, allStatus[i].info, allStatus[i].delivery_time_to_end, allStatus[i].status, allStatus[i].delayed);
                }
                
            }
        }

    }

    function resetMap() {
        if ( markers.length ) {
            for( var i=0; i < markers.length; i++ ){
                markers[i].setMap(null);
            }
            map.panTo(myLatlng);
        }
    }

    function smoothZoomMap(map, targetZoom) {
        var currentZoom = arguments[2] || map.getZoom();
        if (currentZoom != targetZoom) {
            google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
                smoothZoomMap(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
            });
            setTimeout(function(){ map.setZoom(currentZoom) }, 100);
        }
    }

    // Select filter
    $('.mapFilter').on('click', function() {
        $('.mapFilter').removeClass('filtered');
        $(this).addClass('filtered');

        var dataFilter = $(this).attr('data-filter');

        showActiveStatus(dataFilter);        
    });

    // Load map
    $(window).load(function(){
        setTimeout(function(){if ( $('#map').length ) initialize();}, 500);
    });

});