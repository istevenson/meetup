// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var userLocation;
var users_name = "";
var map;
var marker = null;
var phone_num;
var groupId;
var location_arr;



$(function () {



  map = L.map('map', {center:[38.00, -97.00], zoom: 4, scrollWheelZoom: false, animate: true, tap: false});

  // debugger;

  L.tileLayer('http://{s}.tile.cloudmade.com/35d23fb733aa4266be7c5555f375d6e6/113502/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
  }).addTo(map);

  var renderAllSharedMarkers = function(){
    //fire off the request to retrieve data from /spottings.json

    var spotting;

    if (typeof my_group_spottings !== "undefined"){
      for (var i = 0; i < my_group_spottings.length; i++){
        spotting = my_group_spottings[i];
        location_arr = [];
        location_arr.push(spotting["lat"]);
        location_arr.push(spotting["lon"]);
        location_arr.join(", ");
        marker = L.userMarker(location_arr, {pulsing:true, accuracy:100, iconPulsingSmall: true}).addTo(map)
          .bindPopup(spotting["users_name"] + " is here.");
          marker.setLatLng(location_arr);



        map.locate({
          watch: false,
          locate: false,
          setView: false,
          maxZoom: 18,
          enableHighAccuracy: true
        });
      }
    }
  };

  renderAllSharedMarkers();



  var removeAlert = function(){
    $('#overlay3').fadeIn(150);
    $('#overlay3').fadeOut(150);
  };

  var domelem = '<a href="#" class="remove_link">Remove Me From Map</a>';

  var removeButton = function(marker){
    $('.remove_link').bind("click", function(){
      // preventDefault();

      marker.removeFrom(map);
      removeAlert();
    });
  };



  var getPopupText = function (radius) {
    var text;
    var uname;
    if (users_name === "" && radius === undefined) {
      uname = "User";
      text = uname + " is within a few meters from this point.<br>" + domelem;
    } else if (radius === undefined) {
      uname = users_name;
      text = uname + " is within a few meters from this point.<br>" + domelem;
    } else if (users_name === "") {
      uname = "User";
      text = uname + " is with " + radius + " meters from this point.<br>" + domelem;
    } else {
      uname = users_name;
      text = uname + " is within " + radius + " meters from this point.<br>" + domelem;
    }
    return text;
  };

  function getUserLocation(){

    $('#get_location').click(function(){
      map.on("locationfound", function(location) {
        var radius = location.accuracy/2;
        // if (!marker)
          marker = L.userMarker(location.latlng, {pulsing:true, accuracy:50, iconPulsingSmall:true, draggable:true, riseOnHover:true}).addTo(map);

        marker.setLatLng(location.latlng);
        marker.setAccuracy(location.accuracy);
        // removeButton(marker);
        // showSharedLocationMarker(marker);

        //eventually allow for users to drag their marker to a more correct location
      });

      map.locate({
        watch: false,
        locate: true,
        setView: true,
        maxZoom: 18,
        enableHighAccuracy: true
      });
    });
  }

  getUserLocation();


  function shareUserLocation(){
    $('#share_location').click(function() {
      $('#overlay').fadeIn();
      window.scrollTo(0,420);
    });

    $('#your_name_input').keyup(function(e) {
      var keycode = e.which;
      if (keycode==13) {
        e.preventDefault();
        // debugger;
        users_name = $('#your_name_input').val();
        $('#overlay').fadeOut();
        showSharedLocationMarker();
        // renderAllSharedMarkers();
      }
    });
  }

  shareUserLocation();

  var idGenerator = function(){
    return Math.floor(Math.random() * (100 - 1 + 1) + 1);
  };


  function showSharedLocationMarker(marker, groupId){
      // marker = null;
    // if (!marker){ /////////////check to see if marker was dragged
      map.on("locationfound", function(location) {
        var radius = location.accuracy/2;
        // if (!marker)
          marker = L.userMarker(location.latlng, {pulsing:true, accuracy:50, iconPulsingSmall:true, draggable:true, riseOnHover:true}).addTo(map)
            .bindPopup(getPopupText(radius)).openPopup();

        marker.setLatLng(location.latlng);
        marker.setAccuracy(location.accuracy);
        point = {lat: location.latlng.lat, lon: location.latlng.lng};

        // distanceTo(point);

        if (typeof my_group_spottings != "undefined" && my_group_spottings.length > 0){
          spotting = my_group_spottings[0];
          groupId = spotting["group_id"];
        }

        // debugger;
        var url = window.location.href;
        var secretIdCheck = url.substr(url.lastIndexOf('/') + 1);
        if (!users_name)
          users_name = "User" + idGenerator();
        if (secretIdCheck !== null && secretIdCheck !== ""){
          writeMarkerToGroup(users_name, point, groupId);
        }
        else{
          writeMarkerToServer(users_name, point);
        }

        // removeMarker();

        //eventually allow for users to drag their marker to a more correct location
      });

      map.locate({
        watch: true,
        locate: true,
        setView: true,
        maxZoom: 18,
        enableHighAccuracy: true
      });

  }


  var writeMarkerToGroup = function(users_name, location, groupId){
    $.post("/spottings", { //comeback
      users_name: users_name,
      lat: location.lat,
      lon: location.lon,
      group_id: groupId
    }, function(responseData){
    });
  };




  var writeMarkerToServer = function(users_name, location){
    //send users_name and userLocation to /spottings.json
    $.post("/spottings", {
      users_name: users_name,
      lat: location.lat,
      lon: location.lon
    }, function(responseData){
      if (typeof responseData.new_group_id != "undefined"){
        window.location = window.location.href+"find/"+responseData.new_group_id;
      }
    });
  };


  function showLink(){
    $('#overlay_trigger').click(function(){
      var elem = document.getElementById('url_link');
      elem.value = window.location.href;

      $('#overlay2').fadeIn(600).delay(10000).fadeOut();
      elem.select();
    });
  }


  showLink();

  function calcDistance(otherLatlng){
    var elem = document.getElementsByClassName('leaflet-marker-icon');
    var meters = point.distanceTo(otherLatlng);
    elem.value = "You are " + meters + " away from this user.";
    $(this).click(function(){
      $('#distance_overlay').fadeIn();
    });
    //should return distance (in meters) to the given latlng
    // var dist = distanceTo(userlocation)
  }

});

























// var onlineUsers = {};

  // var idGenerator = function(){
  //   return Math.floor(Math.random() * (100 - 1 + 1) + 1);
  // };

  // var getUserMarkers = function() {
  //   if (onlineUsers !== {}) {
  //     for (var userIds in onlineUsers){
  //       onlineUsers[userIds].addTo(map);
  //     }
  //   }
  // };

// $("#share_location").click(function() {
//     var lati =
//     $.get(document.URL, function(data) {
//   }
// });


