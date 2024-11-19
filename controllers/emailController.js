const { sendEmail } = require("../utils/email");

exports.sendTestEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    await sendEmail(to, subject, text);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
