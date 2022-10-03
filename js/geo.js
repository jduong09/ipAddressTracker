const checkInputValidity = (ipAddress) => {
  const ipSplit = ipAddress.split('.');
  return ipSplit.every(octet => {
    const toNum = parseInt(octet);
    return toNum > 0 && toNum < 250;
  });

}

document.addEventListener('DOMContentLoaded', () => {
  const inputSearch = document.getElementById('input-ip-search');
  const inputSubmit = document.getElementById('input-submit');
  const listSearchResults = document.querySelector('.search-results > ul');

  const map = L.map('map').setView([34.04915, -118.09462], 16);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

  inputSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    if (!checkInputValidity(inputSearch.value)) {
      console.log('not valid IP Address');
      return false;
    }
    const httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
        const response = JSON.parse(httpRequest.response);

        listSearchResults.children[0].children[1].innerHTML = response.ip;
        listSearchResults.children[1].children[1].innerHTML = `${response.location.city}, ${response.location.region} ${response.location.postalCode}`;
        listSearchResults.children[2].children[1].innerHTML = `UTC ${response.location.timezone}`;
        listSearchResults.children[3].children[1].innerHTML = response.isp;

        map.setView([response.location.lat, response.location.lng], 16);
        const myIcon = L.icon({
          iconUrl: './images/icon-location.svg',
          iconSize: [46, 56]
        });
        L.marker([response.location.lat, response.location.lng], { icon: myIcon }).addTo(map);
      }
    }

    httpRequest.open('GET', `https://geo.ipify.org/api/v2/country,city?apiKey=at_4DsB8o4wkTQIM6cPVAqz9AKffiVrb&ipAddress=${inputSearch.value}`, true);
    httpRequest.send();
  });
});

/*
{
  "ip":"192.212.174.101",
  "location": {
    "country":"US",
    "region":"California",
    "city":"South San Gabriel",
    "lat":34.04915,
    "lng":-118.09462,
    "postalCode":"",
    "timezone":"-07:00",
    "geonameId":5397771
  },
  "as": {
    "asn":7127,
    "name":"SCE",
    "route":"192.212.0.0\/15",
    "domain":"",
    "type":""
  },
  "isp":"Southern California Edison"
}
*/