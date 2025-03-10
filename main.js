const API_KEY = "AIzaSyACUiew2xvOhoLEQXiUtcqld7xl0BG4YwY"; // Replace with your API key
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

async function askAI(prompt) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    console.log(data);
    return data.candidates[0].content.parts[0].text;
}

askAI("How does the 74LS181 Work?").then(console.log);