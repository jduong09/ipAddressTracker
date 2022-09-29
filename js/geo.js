document.addEventListener('DOMContentLoaded', () => {
  var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiYmxhY2ttb3JlMCIsImEiOiJjaXlub251ZjIwMDJmMnBxems2bmpiYXA2In0.2Hxl5QoDhIY6OR4p3GsU2w'
}).addTo(map);
  const inputSearch = document.getElementById('input-ip-search');
  const inputSubmit = document.getElementById('input-submit');

  inputSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(inputSearch.value);

    const httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.response);
      }
    }

    httpRequest.open('GET', 'https://geo.ipify.org/api/v2/country,city?apiKey=at_4DsB8o4wkTQIM6cPVAqz9AKffiVrb&ipAddress=8.8.8.8', true);
    httpRequest.send();
  });
});