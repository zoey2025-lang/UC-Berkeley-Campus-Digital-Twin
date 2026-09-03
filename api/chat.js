export default async function handler(req, res) {
  // CORS Headers so your frontend can communicate freely
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { text, sessionID } = req.body;

  try {
    const response = await fetch("https://api.convai.com/character/getResponse", {
      method: "POST",
      headers: {
        "CONVAI-API-KEY": process.env.CONVAI_API_KEY, // Secret Key pulled from Vercel settings
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        "userText": text,
        "charID": process.env.CHARACTER_ID,           // Secret Character ID pulled from Vercel settings
        "sessionID": sessionID || "-1",
        "voiceResponse": "False"
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}
