window.addEventListener('load', () => {

  let long;
  let lat;
  let temperatureDescryption = document.querySelector('.weather-description');
  let temperatureDegree = document.querySelector('.temp');
  let locationTimezone = document.querySelector('.weather-location');


  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(position => {

      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/83d8beb30a80527b5bf11e38e33dc154/${lat},${long}`;

      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(data => {


          const { temperature, summary, icon } = data.currently;

          //set dom element from api
          locationTimezone.textContent = data.timezone
          temperatureDegree.textContent = Math.floor((5 / 9) * (temperature - 32));
          temperatureDescryption.textContent = summary;

          SetIcons(icon, document.querySelector("#weather-icon"));
        });


    });
  }


  function SetIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, skycons[currentIcon]);
  }
});