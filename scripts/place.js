
const temperatureC = 8;
const windSpeedKmh = 10;



function calculateWindChill(tempC, speedKmh) {
    return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(speedKmh, 0.16) + 0.3965 * tempC * Math.pow(speedKmh, 0.16);
}


window.addEventListener("load", () => {

    const windChillOutput = document.getElementById("windchill"); 


  
    if (temperatureC <= 10 && windSpeedKmh > 4.8) {

        const wc = calculateWindChill(temperatureC, windSpeedKmh);

        windChillOutput.textContent = wc.toFixed(1) + " °C";

    } else {
        windChillOutput.textContent = "N/A";
    }
});
