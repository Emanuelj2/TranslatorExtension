fetch("https://libretranslate.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: "Hello, world!",
      source: "en",
      target: "es",
      format: "text"
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("API Error:", error));