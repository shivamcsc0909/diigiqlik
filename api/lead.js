export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, message, source } = req.body;
    console.log("New Lead received:", { name, email, message, source });
    
    // Respond with success to the frontend
    res.status(200).json({ success: true, message: "Lead captured successfully" });
  } catch (error) {
    console.error("Lead Capture Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
