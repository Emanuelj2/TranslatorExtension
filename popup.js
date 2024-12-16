document.getElementById('translateBtn').addEventListener('click', async () => {
  const inputText = document.getElementById('inputText').value.trim();
  const targetLanguage = document.getElementById('targetLanguage').value;

  if (!inputText) {
    alert("Please enter some text to translate.");
    return;
  }

  document.getElementById('result').innerText = "Translating...";

  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(
        inputText
      )}`
    );

    const data = await response.json();

    if (data && data[0] && data[0][0]) {
      document.getElementById('result').innerText = data[0][0][0];
    } else {
      document.getElementById('result').innerText = "Error: Unable to translate.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById('result').innerText = "Error: Translation failed.";
  }
});

