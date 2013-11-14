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

var users_name = "";
var map;


$(function () {

  map = L.map('map', {scrollWheelZoom: false, animate: true}).setView([38.00, -97.00], 4);

  // debugger;

  L.tileLayer('http://{s}.tile.cloudmade.com/35d23fb733aa4266be7c5555f375d6e6/113502/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
  }).addTo(map);

  // $("#share_location").leanModal({top: 200, overlay: 0.4, closeButton: ".modal_close"});

  // debugger;

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
      locateAndShow();
      $.ajax({
        type: "GET",
        cache: false,
        url: document.URL,
        data: {users_name,},
        success: function(data)
      })
    }
  });



  var getPopupText = function (radius) {
    var uname;
    if (users_name == "") {
      uname = "User";
    } else {
      uname = users_name;
    }
    return uname + " is within " + radius + " meters from this point.";
    // return "You are within a few meters from this point.";
  };

  // var onlineUsers = {};

  var idGenerator = function(){
    return Math.floor(Math.random() * (100 - 1 + 1) + 1);
  };

  // var getUserMarkers = function() {
  //   if (onlineUsers !== {}) {
  //     for (var userIds in onlineUsers){
  //       onlineUsers[userIds].addTo(map);
  //     }
  //   }
  // };
  // function locateOnArrival(location){
  //   map.onuserLocation = location.latlng;
  // }

  function locateAndShow(){
    // map.locate({setView: true, maxZoom: 16})

    // getUserMarkers();

    var marker = null;
    // debugger;

    map.on("locationfound", function(location) {
      var radius = location.accuracy/2;
      if (!marker)
        marker = L.userMarker(location.latlng, {pulsing:true, accuracy:100, iconPulsingSmall:true}).addTo(map)
          .bindPopup(getPopupText(radius)).openPopup();

      marker.setLatLng(location.latlng);
      marker.setAccuracy(location.accuracy);
      // debugger;
      // var randomId = idGenerator();
      // onlineUsers[randomId] = marker;
    });

    map.locate({
      watch: true,
      locate: true,
      setView: true,
      maxZoom: 18,
      enableHighAccuracy: true
    });
  }
});

// $("#share_location").click(function() {
//     var lati =
//     $.get(document.URL, function(data) {
//   }
// });


