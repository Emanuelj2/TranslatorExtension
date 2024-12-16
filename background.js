chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translate",
    title: "Translate selected text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "translate") {
    const selectedText = info.selectionText;

    if (!selectedText) {
      alert("No text selected for translation.");
      return;
    }

    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY" // Replace with your API key
        },
        body: JSON.stringify({
          q: selectedText,
          source: "en",
          target: "es", // Change as needed
          format: "text"
        })
      });

      const data = await response.json();

      if (response.ok && data.translatedText) {
        alert(`Translation: ${data.translatedText}`);
      } else {
        console.error("API Error:", data);
        alert("Error: Unable to translate the text.");
      }
    } catch (error) {
      console.error("Network or API Error:", error);
      alert("Error: Could not connect to the service.");
    }
  }
});
