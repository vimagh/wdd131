

  // Get URL parameters
  const params = new URLSearchParams(window.location.search);

  // Handle multi-checkbox values
  const featureValues = params.getAll("features");
  const featuresDisplay = featureValues.length > 0 
    ? featureValues.join(", ") 
    : "None selected";

  // Display data
  document.getElementById("product").textContent = params.get("product") || "Not provided";
  document.getElementById("rating").textContent = params.get("rating") || "Not provided";
  document.getElementById("installDate").textContent = params.get("installDate") || "Not provided";
  document.getElementById("features").textContent = featuresDisplay;
  document.getElementById("review").textContent = params.get("review") || "(No review provided)";
  document.getElementById("username").textContent = params.get("username") || "(Anonymous)";

