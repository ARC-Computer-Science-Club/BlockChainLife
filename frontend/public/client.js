var socket = io.connect();
var name = "";
var socketId = "";
var isDriver = false;
var users = {};
var map, popup;
var long, lat;

function createMap()
{
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFubGFpZyIsImEiOiJjam9tOGZiazcwNzltM3FxeGl2Ym93N251In0.nAGbirulFCS_k-pqYYe7qA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: getPosition(),
    zoom: 0
  }).addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true
  }));

  map.addControl(new MapboxDirections({
    accessToken: mapboxgl.accessToken, unit:'metric',
    profile:'mapbox/driving', controls:{profileSwitcher:false}}),
    'top-left').resize();
  
  return map;
}

function triggerGeolocate()
{
  setTimeout(function() {
    $(".mapboxgl-ctrl-geolocate").click();
  },1);
}

var options = {
  enableHighAccuracy: true,
  timeout: 50000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  long = crd.longitude;
  lat = crd.latitude;
  socket.emit('newUser', {name:name, isDriver:isDriver, id:socketId, position:[long, lat]});
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function getPosition()
{
  navigator.geolocation.getCurrentPosition(success, error, options);
}

$(function() {
  $('#map').hide();
  $('#active-users-panel').hide();
  map = createMap();

  $('#formJoin').submit(function(e) {
    e.preventDefault();
    if($('#input-name').val() != "")
    {
      name = $('#input-name').val();
      isDriver = document.getElementById("isDriver").checked;
      $('#formJoin').hide();
      $('#active-users-panel').show();
      $('#empty').addClass('jumbotron');
      $('#map').show();
      map.resize();
      triggerGeolocate();
      getPosition();
    }
  });

  $(window).resize(function(){
    map.resize();
  });

  function addUser(user)
  {
    console.log("add user called");
    var userTitle = user.isDriver ? "  Driver" : "  Client";
    $('#active-users').append('<li class="list-group-item">' + user.name +
            "<div id='title'><b>" + userTitle +'</b></div></li>');
  }

  socket.on('updateUsers', function(data) {
    console.log("update users");
    users = data;
    $('#active-users').empty();
    for(var index in data)
    {
      addUser(data[index]);
    }
  });

  socket.on('updateDrivers', function(users) {
    for(var i in users)
    {
      if(users[i].isDriver && !isDriver)
        setMarker(users[i]);
    }
  });

  /*TODO: this is function is currently making markers without checking alredy exists*/
  function setMarker(driver)
  {
    var marker = new mapboxgl.Marker()
      .setLngLat(driver.position).addTo(map);
    /*
    var popup = new mapboxgl.Popup({closeButton: false,
                                    closeOnClick: false})
    .setLngLat(driver.position)
    .setHTML('<h6>' + driver.name + '</h6>').addTo(map);
    */
  }

  socket.on('saveSocketId', function(id) {
    socketId = id;
  });

  map.on('geolocate', function(data) {
    position = [data.coords.longitude, data.coords.latitude];
    socket.emit('updatePosition', {id:socketId, position:position});
  });
});

