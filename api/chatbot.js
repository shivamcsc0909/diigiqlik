import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { userMessage, language, conversation = [] } = req.body;

    const messages = [
      {
        role: "system",
        content: "You are DigiQlik assistant. Talk like a real human. Use Hindi/English/Hinglish naturally. Give helpful suggestions."
      },
      ...conversation,
      {
        role: "user",
        content: userMessage,
      },
    ];

    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;

    res.json({
      reply,
      suggestions: [
        "Pricing batao",
        "Services kya hai?",
        "Portfolio dikhao",
      ],
    });
  } catch (err) {
    console.error("Chatbot API Error:", err);
    res.status(500).json({
      reply: "Server error bhai, thoda baad try karo 😅",
    });
  }
}
