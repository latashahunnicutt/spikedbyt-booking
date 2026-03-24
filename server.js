const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

app.post("/send-text", async (req, res) => {
  const { name, phone, service, date, time } = req.body;

  try {
    await client.messages.create({
      body: `Hi ${name}! Your ${service} is booked for ${date} at ${time}. 💖 See you soon!`,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.send({ success: false });
  }
});

app.listen(3000, () => console.log("Server running"));
