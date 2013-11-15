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


$(function () {

  map = L.map('map', {scrollWheelZoom: false, animate: true}).setView([38.00, -97.00], 4);

  // debugger;

  L.tileLayer('http://{s}.tile.cloudmade.com/35d23fb733aa4266be7c5555f375d6e6/113502/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
  }).addTo(map);

  var getPopupText = function (radius) {
    var text;
    var uname;
    if (users_name === "" && radius === undefined) {
      uname = "User";
      text = uname + " is within a few meters from this point.";
    } else if (radius === undefined) {
      uname = users_name;
      text = uname + " is within a few meters from this point.";
    } else if (users_name === "") {
      uname = "User";
      text = uname + " is with " + radius + " meters from this point.";
    } else {
      uname = users_name;
      text = uname + " is within " + radius + " meters from this point.";
    }
    return text; //get radius to work
  };

  function getUserLocation(){

    $('#get_location').click(function(){
      map.on("locationfound", function(location) {
        var radius = location.accuracy/2;
        if (!marker)
          marker = L.userMarker(location.latlng, {pulsing:true, accuracy:100, iconPulsingSmall:true}).addTo(map);

        marker.setLatLng(location.latlng);
        marker.setAccuracy(location.accuracy);
        //eventually allow for users to drag their marker to a more correct location
      });

      map.locate({
        watch: true,
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



  function showSharedLocationMarker(){
      // marker = null;
    if (!marker){
      map.on("locationfound", function(location) {
        var radius = location.accuracy/2;
        // if (!marker)
          marker = L.userMarker(location.latlng, {pulsing:true, accuracy:50, iconPulsingSmall:true}).addTo(map)
            .bindPopup(getPopupText(radius)).openPopup();

        marker.setLatLng(location.latlng);
        // marker.setAccuracy(location.accuracy);
        //eventually allow for users to drag their marker to a more correct location
      });

      map.locate({
        watch: true,
        locate: true,
        setView: true,
        maxZoom: 18,
        enableHighAccuracy: true
      });
    } else {
      marker.bindPopup(getPopupText()).openPopup();
    }



      // marker.setLatLng(location.latlng);
      // marker.setAccuracy(location.accuracy);
      // userLocation = location.latlng;
      // writeLocationToServer(users_name,userLocation); //how to pass userLocation this function without calling it?
  }

  var renderAllSharedMarkers = function(){
    //fire off the request to retrieve data from /spottings.json
    $.ajax({
      url: "/spottings.json",
      type: "POST",
      data: {
        name: users_name,
        location: userLocation,
      },
      success: (function(data, status, jqXHR) {
        marker = L.userMarker(userLocation, {pulsing:true, accuracy:100, iconPulsingSmall:true}).addTo(map)
        .bindPopup("This is the approximate location of " + users_name).openPopup();
      })
    });
  };



  var writeLocationToServer = function(users_name, userLocation){
    //send users_name and userLocation to /spottings.json
    $.ajax({
      url: "/spottings.json",
      type: "GET",
      cache: false,
      data: {
        name: users_name,
        location: userLocation
      },
      success: (function(data, status, jqXHR){
        console.log("success!");
      })
    });
  };
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


