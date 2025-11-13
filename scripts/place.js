// -------- Static values for display and calculation (replace with your actual page values) --------
const temperatureC = 8;     // Example: 8°C
const windSpeedKmh = 10;    // Example: 10 km/h


// -------- Wind Chill Function (Metric formula for °C and km/h) --------
// One-line return statement as required.
function calculateWindChill(tempC, speedKmh) {
    return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(speedKmh, 0.16) + 0.3965 * tempC * Math.pow(speedKmh, 0.16);
}


// -------- Display Wind Chill on Page Load --------
window.addEventListener("load", () => {

    const windChillOutput = document.getElementById("windchill"); 
    // Make sure your weather section contains an element with id="windchill"

    // Conditions for valid windchill calculation (Metric):
    // Temp <= 10°C and wind speed > 4.8 km/h
    if (temperatureC <= 10 && windSpeedKmh > 4.8) {

        const wc = calculateWindChill(temperatureC, windSpeedKmh);

        // Round to 1 decimal place for nicer display
        windChillOutput.textContent = wc.toFixed(1) + " °C";

    } else {
        windChillOutput.textContent = "N/A";
    }
});
