var GeoLocation = {};

jQuery(function($)  {

	var markers = [], streets = [], AllStreets = [], map, myLatlng, marker, image, noDataBase, redZone, greenZone, step1 = false, step2 = false, step3 = false;

	// Create markers
	function addMarker(location){
        image = {
            url: $('#map').attr('data-map-marker'),
            scaledSize : new google.maps.Size(50, 50),
        };
        marker = new google.maps.Marker({
            position: location,
            icon: image,
        });

        markers.push(marker);
        marker.setMap(map);
        map.panTo(location);
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
        // Define the LatLng coordinates for the polygon's path.
        var redZonePath = [
            {lat: 49.769099, lng: 24.014314},
            {lat: 49.770036, lng: 24.002185},
            {lat: 49.771699, lng: 23.994803},
            {lat: 49.777615, lng: 23.977148},
            {lat: 49.780809, lng: 23.967528},
            {lat: 49.790214, lng: 23.938517},
            {lat: 49.791017, lng: 23.936120},
            {lat: 49.792388, lng: 23.933146},
            {lat: 49.794014, lng: 23.931022},
            {lat: 49.795444, lng: 23.929899},
            {lat: 49.831751, lng: 23.904659},
            {lat: 49.837198, lng: 23.923316},
            {lat: 49.837670, lng: 23.937378},
            {lat: 49.854303, lng: 23.935982},
            {lat: 49.862148, lng: 23.938834},
            {lat: 49.863009, lng: 23.942142},
            {lat: 49.863107, lng: 23.953842},
            {lat: 49.853979, lng: 23.979060},
            {lat: 49.850506, lng: 23.985276},
            {lat: 49.844024, lng: 23.993104},
            {lat: 49.835756, lng: 23.990754},
            {lat: 49.833708, lng: 23.974532},
            {lat: 49.830419, lng: 23.972759},
            {lat: 49.828125, lng: 23.974475},
            {lat: 49.826108, lng: 23.969513},
            {lat: 49.826080, lng: 23.967845},
            {lat: 49.826786, lng: 23.967829},
            {lat: 49.825907, lng: 23.963945},
            {lat: 49.825407, lng: 23.958900},
            {lat: 49.823323, lng: 23.958208},
            {lat: 49.823656, lng: 23.956078},
            {lat: 49.818410, lng: 23.946709},
            {lat: 49.799499, lng: 23.974924},
            {lat: 49.799293, lng: 23.980079},
            {lat: 49.792177, lng: 23.978867},
            {lat: 49.791812, lng: 24.006362},
            {lat: 49.787070, lng: 24.006901},
            {lat: 49.787482, lng: 24.012324},
            {lat: 49.788528, lng: 24.015119},
            {lat: 49.783712, lng: 24.014163},
            {lat: 49.781362, lng: 24.013933},
            {lat: 49.769099, lng: 24.014314}
        ];
        var redZonePath2 = [
            {lat: 49.83576147871942, lng: 23.9907564464163},
            {lat: 49.84402189822035, lng: 23.993108488820553},
            {lat: 49.85050987804739, lng: 23.985278826053218},
            {lat: 49.853979445159354, lng: 23.979066339883047},
            {lat: 49.854850320265776, lng: 23.976656842108923},
            {lat: 49.85750396873398, lng: 23.97998700440303},
            {lat: 49.85830143474875, lng: 23.98845854142462},
            {lat: 49.860476653709384, lng: 23.993396288314102},
            {lat: 49.858795518744955, lng: 23.999787536540225},
            {lat: 49.85400797957825, lng: 24.001871901288155},
            {lat: 49.85384438797214, lng: 24.004461002923335},
            {lat: 49.852004537495816, lng: 24.005303525904083},
            {lat: 49.85005396592148, lng: 24.009925049937465},
            {lat: 49.8468463531635, lng: 24.013653132751642},
            {lat: 49.84678392656085, lng: 24.0143925845789},
            {lat: 49.84697098556024, lng: 24.01577972902635},
            {lat: 49.846061069792164, lng: 24.016416280289718},
            {lat: 49.84588235203369, lng: 24.01653937054766},
            {lat: 49.84588235203369, lng: 24.01653937054766},
            {lat: 49.84586518682374, lng: 24.016529483021827},
            {lat: 49.84572611739198, lng: 24.01654244682436},
            {lat: 49.845170964859804, lng: 24.016400051605842},
            {lat: 49.84487294314633, lng: 24.016298980275906},
            {lat: 49.844762105734496, lng: 24.016342437181038},
            {lat: 49.844334617993745, lng: 24.01662110438633},
            {lat: 49.84277316750201, lng: 24.016850063755214},
            {lat: 49.84268059672192, lng: 24.017626115945063},
            {lat: 49.84265518924307, lng: 24.017935144806643},
            {lat: 49.842739903291395, lng: 24.018819101595227},
            {lat: 49.84322313067586, lng: 24.022742856557443},
            {lat: 49.843299887417906, lng: 24.023057054571836},
            {lat: 49.84420158528323, lng: 24.024689778764696},
            {lat: 49.84466965005949, lng: 24.026854036288682},
            {lat: 49.844729033202576, lng: 24.029344070778734},
            {lat: 49.84466799061677, lng: 24.03004969333051},
            {lat: 49.844404777241294, lng: 24.03317802215861},
            {lat: 49.84406727547975, lng: 24.033723662716284},
            {lat: 49.84401309958094, lng: 24.034340498055712},
            {lat: 49.8439884725791, lng: 24.03444277018434},
            {lat: 49.84393436789572, lng: 24.0345531838675},
            {lat: 49.8438848747794, lng: 24.034616174018424},
            {lat: 49.84380444446326, lng: 24.034675182616752},
            {lat: 49.84371097210941, lng: 24.03471114111096},
            {lat: 49.84076321250305, lng: 24.035852721620813},
            {lat: 49.84066102082502, lng: 24.03602076050879},
            {lat: 49.84054987629057, lng: 24.036267724705453},
            {lat: 49.840416115577256, lng: 24.03643023145878},
            {lat: 49.84018721117036, lng: 24.03637589889354},
            {lat: 49.838789037726116, lng: 24.03540690493537},
            {lat: 49.837605321161014, lng: 24.03517091460094},
            {lat: 49.8369838001291, lng: 24.034994581043293},
            {lat: 49.83616299947363, lng: 24.034999066623868},
            {lat: 49.83614450927451, lng: 24.035585311943123},
            {lat: 49.8360596313031, lng: 24.036286138121568},
            {lat: 49.83601082902741, lng: 24.036614804938267},
            {lat: 49.83592592907053, lng: 24.036906186782517},
            {lat: 49.83575555310488, lng: 24.03720564911191},
            {lat: 49.83528672585941, lng: 24.037777535497185},
            {lat: 49.83524016001395, lng: 24.037863373858727},
            {lat: 49.835065745033894, lng: 24.038895683794635},
            {lat: 49.8349872674804, lng: 24.039165679849475},
            {lat: 49.83463740938395, lng: 24.03974761470147},
            {lat: 49.83238306664004, lng: 24.04358585703517},
            {lat: 49.83176659354445, lng: 24.04484102176957},
            {lat: 49.830662094536116, lng: 24.04860479180536},
            {lat: 49.82957675328217, lng: 24.051060133643432},
            {lat: 49.82933625246478, lng: 24.05176878044108},
            {lat: 49.82894391104791, lng: 24.0537218434813},
            {lat: 49.82877030290954, lng: 24.054632246665733},
            {lat: 49.828358767289, lng: 24.056019993060318},
            {lat: 49.82794596911173, lng: 24.057189618894654},
            {lat: 49.82765634431171, lng: 24.057589782397713},
            {lat: 49.826372903827036, lng: 24.058781641512155},
            {lat: 49.830528340610364, lng: 24.066848996946646},
            {lat: 49.831913223342255, lng: 24.068547754096357},
            {lat: 49.83152513976037, lng: 24.075735331111446},
            {lat: 49.82838370187873, lng: 24.074876418517533},
            {lat: 49.82614596338831, lng: 24.08651736863544},
            {lat: 49.822304857745884, lng: 24.09360684446756},
            {lat: 49.78610334540095, lng: 24.098927924602208},
            {lat: 49.78393620254118, lng: 24.08846252323883},
            {lat: 49.78216253866127, lng: 24.08359872144956},
            {lat: 49.783690750906004, lng: 24.07888211426257},
            {lat: 49.78536978032101, lng: 24.07596519220283},
            {lat: 49.782803858004165, lng: 24.06966230594378},
            {lat: 49.78058490100041, lng: 24.068585303090458},
            {lat: 49.780254405465605, lng: 24.0534587130212},
            {lat: 49.78065404494032, lng: 24.051349553559476},
            {lat: 49.78186166561754, lng: 24.04103519344403},
            {lat: 49.77722196320904, lng: 24.03163627555648},
            {lat: 49.76804345251528, lng: 24.03067498154803},
            {lat: 49.768683393231534, lng: 24.02132057078336},
            {lat: 49.769099, lng: 24.014314},
            {lat: 49.78128893067499, lng: 24.013970526511685},
            {lat: 49.783700272706085, lng: 24.0141796518717},
            {lat: 49.78852754336218, lng: 24.015132148708744},
            {lat: 49.79214265666811, lng: 24.01585544473778},
            {lat: 49.79182947305116, lng: 24.020200709023015},
            {lat: 49.79041090982164, lng: 24.02813367737531},
            {lat: 49.79230434238605, lng: 24.028871582436068},
            {lat: 49.792796270530395, lng: 24.032378842911385},
            {lat: 49.795872579621154, lng: 24.033530489993495},
            {lat: 49.79818287942781, lng: 24.032237639215055},
            {lat: 49.79900172778318, lng: 24.031559096720116},
            {lat: 49.80024687159327, lng: 24.031556974276327},
            {lat: 49.80013649284426, lng: 24.03326682062982},
            {lat: 49.80004178313548, lng: 24.035842084177148},
            {lat: 49.80018754753824, lng: 24.038064993730472},
            {lat: 49.801405828895646, lng: 24.043433642735977},
            {lat: 49.80193764791596, lng: 24.04463363258367},
            {lat: 49.80295044703718, lng: 24.04569499017407},
            {lat: 49.80353722465196, lng: 24.04591054755747},
            {lat: 49.803714746281315, lng: 24.046065544791418},
            {lat: 49.80821266635421, lng: 24.047126052578847},
            {lat: 49.81277901972766, lng: 24.04591523392878},
            {lat: 49.81440523049205, lng: 24.046032191610834},
            {lat: 49.8154190014406, lng: 24.04584040411123},
            {lat: 49.81761922604831, lng: 24.044768766520747},
            {lat: 49.81826826863425, lng: 24.043974299129445},
            {lat: 49.81929251963781, lng: 24.041182114025673},
            {lat: 49.81949078062998, lng: 24.040932875603858},
            {lat: 49.81994722086901, lng: 24.04051885985257},
            {lat: 49.8229750331372, lng: 24.038546415461497},
            {lat: 49.82226712706676, lng: 24.037938058151326},
            {lat: 49.822074910705844, lng: 24.037375220699687},
            {lat: 49.82193018878025, lng: 24.034503798835885},
            {lat: 49.82193018878025, lng: 24.034503798835885},
            {lat: 49.82193123892679, lng: 24.034500473288404},
            {lat: 49.821645725973184, lng: 24.033425206584184},
            {lat: 49.82229499184745, lng: 24.032771467372186},
            {lat: 49.82218974013877, lng: 24.032373724726995},
            {lat: 49.82178599719291, lng: 24.029454718319357},
            {lat: 49.8217846186426, lng: 24.02945300276724},
            {lat: 49.82161189776376, lng: 24.02866846191307},
            {lat: 49.821561061029755, lng: 24.020596090790605},
            {lat: 49.82479551681279, lng: 24.02088459302172},
            {lat: 49.824998546922785, lng: 24.02104964650573},
            {lat: 49.827792378447434, lng: 24.019105418920162},
            {lat: 49.82788831548263, lng: 24.019131816110985},
            {lat: 49.82787817325221, lng: 24.019634856611333},
            {lat: 49.828236415023206, lng: 24.01998262702773},
            {lat: 49.829868819101065, lng: 24.020104470022034},
            {lat: 49.830751999845525, lng: 24.019194391636688},
            {lat: 49.830777980085834, lng: 24.0185165916879},
            {lat: 49.83219199300201, lng: 24.018577874460448},
            {lat: 49.83225807539909, lng: 24.01843633250246},
            {lat: 49.83327920471416, lng: 24.01886408153996},
            {lat: 49.834227182630094, lng: 24.017203187227665},
            {lat: 49.8347209346917, lng: 24.017106918022023},
            {lat: 49.83486430968717, lng: 24.0071877210612},
            {lat: 49.83554409083289, lng: 24.005200292565632},
            {lat: 49.83608074874712, lng: 24.004611465093944},
            {lat: 49.83710037833883, lng: 24.003938407907185},
            {lat: 49.836854180842174, lng: 24.00271926400694},
            {lat: 49.83716110287118, lng: 24.002425327442666},
            {lat: 49.83715233897491, lng: 24.00187455313221},
            {lat: 49.836650611038635, lng: 24.001724186005845},
            {lat: 49.835494802401044, lng: 23.99449281478337},
            {lat: 49.83575588142029, lng: 23.99076262281301},
        ];
        var greenZonePath = [
            {lat: 49.788533547709356, lng: 24.01511925190505},
            {lat: 49.787486641192615, lng: 24.01232117289419},
            {lat: 49.7870718869306, lng: 24.00690312064262},
            {lat: 49.791812232475294, lng: 24.006364056840653},
            {lat: 49.79217759953304, lng: 23.978868208674044},
            {lat: 49.799292151823224, lng: 23.980081847058273},
            {lat: 49.79949983628717, lng: 23.97492382821656},
            {lat: 49.81841028877165, lng: 23.946710303759914},
            {lat: 49.82365538608553, lng: 23.95607790212921},
            {lat: 49.82332173872131, lng: 23.958206553480636},
            {lat: 49.82540664947648, lng: 23.95890095348284},
            {lat: 49.82590557524186, lng: 23.963945446136222},
            {lat: 49.82678495258863, lng: 23.967827675902413},
            {lat: 49.826080249707054, lng: 23.96784354787735},
            {lat: 49.826107091634405, lng: 23.96951237411065},
            {lat: 49.82812429888264, lng: 23.97447578878314},
            {lat: 49.830419491591755, lng: 23.97276013490182},
            {lat: 49.83370719487384, lng: 23.97453275891769},
            {lat: 49.835755090099504, lng: 23.99075438028217},
            {lat: 49.83549095922754, lng: 23.994497267421366},
            {lat: 49.83664816046751, lng: 24.00173245292865},
            {lat: 49.83715177258071, lng: 24.00187785172875},
            {lat: 49.837158324526484, lng: 24.002420270309813},
            {lat: 49.83684896402188, lng: 24.00272138708158},
            {lat: 49.837096562675846, lng: 24.00393723893353},
            {lat: 49.83607871587983, lng: 24.00460777521448},
            {lat: 49.83554241227387, lng: 24.005199549081567},
            {lat: 49.83485688699626, lng: 24.007188253399818},
            {lat: 49.8347200617853, lng: 24.017096588362165},
            {lat: 49.8347200617853, lng: 24.017096588362165},
            {lat: 49.83422297459008, lng: 24.01719879934899},
            {lat: 49.83328197151994, lng: 24.018858399448845},
            {lat: 49.832258, lng: 24.018433},
            {lat: 49.832195421800925, lng: 24.018567763592273},
            {lat: 49.83077441464839, lng: 24.018512076415846},
            {lat: 49.830749766712714, lng: 24.019189399401853},
            {lat: 49.829871517136674, lng: 24.020095487963545},
            {lat: 49.82824210059586, lng: 24.01997577344389},
            {lat: 49.82788358137024, lng: 24.019634961167526},
            {lat: 49.827889, lng: 24.019130},
            {lat: 49.82779351085032, lng: 24.019100853349983},
            {lat: 49.82500505033775, lng: 24.0210372032916},
            {lat: 49.82479958514397, lng: 24.020871508436926},
            {lat: 49.82155744401842, lng: 24.02059296486391},
            {lat: 49.8216069134381, lng: 24.028672716180722},
            {lat: 49.82178168459521, lng: 24.029456747066206},
            {lat: 49.82218526132297, lng: 24.03237484824922},
            {lat: 49.82229018045409, lng: 24.032773198581026},
            {lat: 49.8216396275985, lng: 24.033427558565904},
            {lat: 49.821928038496715, lng: 24.034505767594737},
            {lat: 49.822069123315465, lng: 24.037377668449153},
            {lat: 49.822265501429996, lng: 24.037942673043517},
            {lat: 49.82296609276909, lng: 24.038545320198523},
            {lat: 49.81994582619113, lng: 24.040517638000097},
            {lat: 49.819488475630095, lng: 24.04093108464508},
            {lat: 49.819291515674784, lng: 24.04117900611061},
            {lat: 49.819033778420966, lng: 24.041791021308086},
            {lat: 49.81826479350882, lng: 24.043971640359928},
            {lat: 49.81761914218128, lng: 24.044761887807113},
            {lat: 49.81541977605446, lng: 24.045832597827143},
            {lat: 49.81440823777591, lng: 24.046026757999584},
            {lat: 49.81278053962386, lng: 24.045906977222103},
            {lat: 49.80821557946693, lng: 24.0471198466513},
            {lat: 49.80371981603321, lng: 24.04605487799745},
            {lat: 49.80354062193687, lng: 24.045902034286314},
            {lat: 49.80295484911903, lng: 24.045689395661384},
            {lat: 49.80194696737081, lng: 24.044628006127823},
            {lat: 49.801417, lng: 24.043432},
            {lat: 49.800199, lng: 24.038061},
            {lat: 49.80005101269192, lng: 24.03584275797209},
            {lat: 49.800149, lng: 24.033289},
            {lat: 49.800248, lng: 24.031554},
            {lat: 49.79900045841042, lng: 24.0315492197617},
            {lat: 49.79817306662866, lng: 24.032218895727055},
            {lat: 49.79587575893269, lng: 24.033519620283187},
            {lat: 49.792803619095956, lng: 24.032375998579028},
            {lat: 49.792307, lng: 24.028869},
            {lat: 49.790419066100306, lng: 24.02813082145451},
            {lat: 49.791848, lng: 24.020217},
            {lat: 49.792146, lng: 24.015851},
        ];

        // Construct the map polygon.
        redZone = new google.maps.Polygon({
          paths: redZonePath,
          strokeColor: '#FF0000',
          strokeOpacity: 0.7,
          strokeWeight: 1,
          fillColor: '#FF0000',
          fillOpacity: 0.3
        });
        redZone2 = new google.maps.Polygon({
          paths: redZonePath2,
          strokeColor: '#FF0000',
          strokeOpacity: 0.7,
          strokeWeight: 1,
          fillColor: '#FF0000',
          fillOpacity: 0.3
        });
        greenZone = new google.maps.Polygon({
          paths: greenZonePath,
          strokeColor: '#00a300',
          strokeOpacity: 0.7,
          strokeWeight: 1,
          fillColor: '#00b700',
          fillOpacity: 0.3
        });

        // google Autocomplete options
        var options = {
            types: ['geocode'],
            componentRestrictions: {country: "ua"}
        };
        if ( $('#streetAutocomplete').length ) {

            autocomplete = new google.maps.places.Autocomplete(
                (document.getElementById('mapStreet')),
                options
            );

            setTimeout( function() {
                $('.pac-container').addClass('hidden');
            }, 200);
            
            google.maps.event.addListener(autocomplete, 'place_changed', function() {});
        }

        if ( $('#deliveryStreet').length ) {  // delivery page autocomlete
            deliveryStreet = new google.maps.places.Autocomplete( // delivery page autocomlete
                (document.getElementById('deliveryStreet')),
                options
            );

            google.maps.event.addListener(deliveryStreet, 'place_changed', function() {
                var place = deliveryStreet.getPlace(),
                    newLocation;

                if ( !place.geometry.location ) return false;

                if ( markers.length ) {
                    for( var i=0; i < markers.length; i++ ){
                        markers[i].setMap(null);
                    }
                    map.panTo(myLatlng);
                }

                newLocation = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
                smoothZoomMap(map, 15);
                addMarker(newLocation);
            });
        }

        $.ajax({
            url: 'cities_streets_ua.json',
            type: 'get',
            dataType: 'json',
            error: function(data){
                console.log('error');
            },
            success: function(data) {
                if ( !$('#mapStreet').length ) return false;
                var city = $('#city option:selected').val();
                AllStreets = data;
                
                for ( var i = 0; i < AllStreets[city].length; i++ ) {
                    streets.push(AllStreets[city][i].name);
                }

                jQautocomplete(streets);
            }
        });

        //Create map
    	map = new google.maps.Map(document.getElementById("map"), mapOptions); 
    	map.mapTypes.set('map_style', styledMap); 
    	map.setMapTypeId('map_style');
        // Set map polygons
    	redZone.setMap(map);
        redZone2.setMap(map);
    	greenZone.setMap(map);
    }

    // Step 3
    function checkDeliveryZone(newLocation, currentPrice, redZonePrice, greenZonePrice) {

        if ( google.maps.geometry.poly.containsLocation(newLocation, redZone) === true || google.maps.geometry.poly.containsLocation(newLocation, redZone2) === true ) { // Check if order price same or over redzone price delivery
            if ( $('.fullPrice').length && currentPrice <= redZonePrice ) {
                step3 = false;
                step3Func(step3);
            } else {
                step3 = true;
                step3Func(step3);
            }

        } else if ( google.maps.geometry.poly.containsLocation(newLocation, greenZone) === true ) { // Check if order price same or over greenZone price delivery
            if ( $('.fullPrice').length && currentPrice >= greenZonePrice ) {
                step3 = true;
                step3Func(step3);
            } else {
                step3 = false;
                step3Func(step3); 
            }

        } else { // No delivery area
            step2 = false;
            step3 = false;
            smoothZoomMap(map, 11);
            $('.orderButton').addClass('btnDisabled');
            $('.deliveryWarning .errorMsg.empty-address').slideUp(350);
            $('.deliveryWarning .errorMsg.empty-house').slideUp(350);
            $('.deliveryWarning .errorMsg.lowOrder').slideUp(350);
            $('.deliveryWarning .errorMsg.noDelivery').slideDown(350);

        }
    }

    // Step 2
    function address(latlng) {
        var newLocation = latlng;
            currentPrice = +$('.fullPrice span').html(),
            redZonePrice = +$('.fullPrice').attr('data-red-zone'),
            greenZonePrice = +$('.fullPrice').attr('data-green-zone');
        
        // Start step 3
        if ( step1 && step2 ) {
            for( var i=0; i < markers.length; i++ ){ // Remove old marker
                markers[i].setMap(null);
            }
            smoothZoomMap(map, 15);
            addMarker(newLocation);
            checkDeliveryZone(newLocation, currentPrice, redZonePrice, greenZonePrice);

            
        }
    }

    //Step 1
    GeoLocation.googleMapCoordinates = function () {

        var streetAddress = $('#city').val() + ' ' + $('#streetAutocomplete').val() + ' ' + $('#houseNumber').val();
        
        $('#mapStreet').val( streetAddress ); // Set new address in google map autocomle
        
        var geocoder = new google.maps.Geocoder();

            geocoder.geocode({"address":streetAddress }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());

                        if ( results[0].geometry.location.lat() === 49.839683 && results[0].geometry.location.lng() === 24.029717000000005) {
                            $('.deliveryWarning .errorMsg.empty-house').slideUp(350);
                            $('.deliveryWarning .errorMsg.lowOrder').slideUp(350);
                            $('.deliveryWarning .errorMsg.noDelivery').slideUp(350);
                            $('.deliveryWarning .errorMsg.empty-address').slideUp(350);
                            $('.deliveryWarning .errorMsg.noData').slideDown(350);
                            $('#pay2').attr('disabled', true);
                            $('#pay2').prop('checked', false);
                            $('#pay2').closest('.checkboxEntry').find('span').css({'opacity': '0.7'});
                            $('#pay').prop('checked', true);

                            resetMap();
                        } else if ( noDataBase === true ) {
                            $('.deliveryWarning .errorMsg.empty-house').slideUp(350);
                            $('.deliveryWarning .errorMsg.lowOrder').slideUp(350);
                            $('.deliveryWarning .errorMsg.noDelivery').slideUp(350);
                            $('.deliveryWarning .errorMsg.empty-address').slideUp(350);
                            $('.deliveryWarning .errorMsg.noData').slideDown(350);
                            $('#pay2').attr('disabled', true);
                            $('#pay2').prop('checked', false);
                            $('#pay2').closest('.checkboxEntry').find('span').css({'opacity': '0.7'});
                            $('#pay').prop('checked', true);

                            resetMap();
                        } else {
                            $('.deliveryWarning .errorMsg.noData').slideUp(350);
                            $('#pay2').closest('.checkboxEntry').find('span').css({'opacity': '1'});
                            $('#pay2').attr('disabled', false);

                            step2 = true;
                            step2Func(step2);

                            address(latlng); // start next step
                        }
                        
                } else {
                    step2 = false;
                    step2Func(step2);
                }
            });
    };

    // Final order
    $('.orderButton').on('click', function() {
        if ( step1 && step2 && step3) { // If all 3 steps true order product
            $('.popupWrapper').addClass('active');
            $('.popupContent[data-rel="3"]').addClass('active');
        }
    });

    // Step 1 function
    function step1Func(stepBoolean) { 
        if (stepBoolean) {
            $('#streetAutocomplete, #houseNumber').removeClass('invalid');
            $('.deliveryWarning .errorMsg.empty-address').slideUp(350);
        } else {
            $('#streetAutocomplete, #houseNumber').addClass('invalid');
            $('.deliveryWarning .errorMsg.empty-house').slideUp(350);
            $('.deliveryWarning .errorMsg.lowOrder').slideUp(350);
            $('.deliveryWarning .errorMsg.noDelivery').slideUp(350);
            $('.deliveryWarning .errorMsg.empty-address').slideDown(350);

            resetMap();
        }
    }

    // Step 2 function
    function step2Func(stepBoolean) { 
        if (stepBoolean) {
            $('#mapStreet').removeClass('invalid');
            $('.deliveryWarning .errorMsg.empty-house').slideUp(350);
            $('.orderButton').removeClass('btnDisabled');
            smoothZoomMap(map, 15);
        } else {
            $('#mapStreet').addClass('invalid');
            $('.deliveryWarning .errorMsg.empty-address').slideUp(350);
            $('.deliveryWarning .errorMsg.lowOrder').slideUp(350);
            $('.deliveryWarning .errorMsg.noDelivery').slideUp(350);
            $('.deliveryWarning .errorMsg.empty-house').slideDown(350);
        }

        // resetMap();
    }

    // Step 3 function
    function step3Func(stepBoolean) { 
        if (stepBoolean) {
            $('#mapStreet').removeClass('invalid');
            $('.orderButton').removeClass('btnDisabled');
            $('.deliveryWarning .errorMsg.empty-address').slideUp(350);
            $('.deliveryWarning .errorMsg.empty-house').slideUp(350);
            $('.deliveryWarning .errorMsg.noDelivery').slideUp(350);
            $('.deliveryWarning .errorMsg.lowOrder').slideUp(350);
            smoothZoomMap(map, 15);
        } else {
            $('#mapStreet').addClass('invalid');
            $('.orderButton').addClass('btnDisabled');
            $('.deliveryWarning .errorMsg.empty-address').slideUp(350);
            $('.deliveryWarning .errorMsg.empty-house').slideUp(350);
            $('.deliveryWarning .errorMsg.noDelivery').slideUp(350);
            $('.deliveryWarning .errorMsg.lowOrder').slideDown(350);
            smoothZoomMap(map, 11);
        }
    }

    // Reset markers and map zoom
    function resetMap() {
        if ( markers.length ) {
            for( var i=0; i < markers.length; i++ ){
                markers[i].setMap(null);
            }
            map.panTo(myLatlng);
            smoothZoomMap(map, 11);
        }
    }

    // Smooth map zoom
    function smoothZoomMap(map, targetZoom) {
        var currentZoom = arguments[2] || map.getZoom();
        if (currentZoom != targetZoom) {
            google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
                smoothZoomMap(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
            });
            setTimeout(function(){ map.setZoom(currentZoom) }, 100);
        }
    }

    // JQuery autocomplete
    function jQautocomplete(arr) {
        if ( !$('#mapStreet').length ) return false;

            $('#mapStreet').val('');
            $('#streetAutocomplete').autocomplete({
            response: function(event, ui) { // Check if autocomplete found match
                if (ui.content.length == 0) {
                    noDataBase = true;
                } else {
                    noDataBase = false;
                }
            },
            source: function(request, response) {
                var results = $.ui.autocomplete.filter(arr, request.term);
                response(results.slice(0, 15));
            }
        });
    }

    // Start steps
    function startSteps() {
        
        if ( $('#streetAutocomplete').val() && $('#houseNumber').val()) {
            step1 = true;
            GeoLocation.googleMapCoordinates(); // step 1
            if ($(window).width() < 1500 )$('html, body').animate({scrollTop: $('#map').offset().top - 75 }, 666);
          } else {
            step1 = false;
        }
    }

    //START steps
    $("#streetAutocomplete, #houseNumber").change(function () {

        if ( $('#streetAutocomplete').val() && $('#houseNumber').val()) {
            step1 = true;
            GeoLocation.googleMapCoordinates(); // step 1
            if ($(window).width() < 1500 )$('html, body').animate({scrollTop: $('#map').offset().top - 75 }, 666);
          } else {
            step1 = false;
        }
    });

    $("#streetAutocomplete, #houseNumber").focus(function(e) {
        if ( e.which != 13 && $("#houseNumber").length ) return false;

        startSteps();
    });

    // Change city
    $('#city').on('change', function(){
        streets = []; // remove old steets 
        var newCity = $(this).val();

        $('#streetAutocomplete').val('');
        $("#houseNumber").val('');

        for ( var i = 0; i < AllStreets[newCity].length; i++ ) { // add new streets
            streets.push(AllStreets[newCity][i].name);
        }
        
        $('.deliveryWarning .errorMsg.empty-house').slideUp(350);
        $('.deliveryWarning .errorMsg.lowOrder').slideUp(350);
        $('.deliveryWarning .errorMsg.noDelivery').slideUp(350);
        $('.deliveryWarning .errorMsg.empty-address').slideUp(350);
        $('.deliveryWarning .errorMsg.noData').slideUp(350);
        $('.deliveryWarning .errorMsg.noData').slideUp(350);

        jQautocomplete(streets);

    });

    // Mobile button search
    $('#StartSearch').on('click', function() {
        if ( $('#streetAutocomplete').val() && $('#houseNumber').val()) {
            step1 = true;
            step1Func(step1);
            GeoLocation.googleMapCoordinates(); // step 1
          } else {
            step1 = false;
            step1Func(step1);
        }
    });


    // Load map
    $(window).load(function(){
        setTimeout(function(){if ( $('#map').length ) initialize();}, 500);
    });

});

