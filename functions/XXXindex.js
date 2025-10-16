const functions = require("firebase-functions");

// Minimal test function
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.json({
    message: "Hello from Firebase Functions!",
  });
});


// const functions = require("firebase-functions");
const fetch = require("node-fetch");

// Example: check if a URL allows iframes
exports.checkIframe = functions.https.onRequest(async (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.status(400).json({
      error: "Missing URL",
    });
    return;
  }

  try {
    const response = await fetch(url, {
      method: "HEAD",
    });
    const xfo = response.headers.get("x-frame-options");
    const frameAllowed = !xfo || !xfo.toLowerCase().includes("sameorigin");

    res.json({
      url,
      frameAllowed,
      xfo,
      status: response.status,
    });
  } catch (error) {
    console.error("Fetch failed:", error);
    res.status(500).json({
      error: "Fetch failed",
      details: error.message,
    });
  }
});
