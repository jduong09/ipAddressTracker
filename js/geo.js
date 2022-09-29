document.addEventListener('DOMContentLoaded', () => {
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

    L.map('map').setView([37.38605, -122.08385], 13);
  });
});