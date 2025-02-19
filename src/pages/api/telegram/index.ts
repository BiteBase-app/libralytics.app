/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';

const { TELEGRAM_BOT_TOKEN, TELEGRAM_GROUP_ID } = process.env;

function createClientPayload(
  dateString: string,
  email: string,
  name: string,
  phone: string,
  message: string
) {
  return `New Lead:
Customer: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
Date String: ${dateString}`;
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const currentDate = new Date();
    const dateString = currentDate
      .toLocaleDateString('en-GB')
      .replace(/\//g, '-');

    const { email, name, phone, message } =
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!email || !name || !phone) {
      res.status(400).json({ error: 'Invalid request body' });
      return;
    }

    const bookingMessage = createClientPayload(
      dateString,
      email,
      name,
      phone,
      message
    );

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_GROUP_ID,
        text: bookingMessage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API responded with status ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in telegram API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await handlePostRequest(req, res);
  } else {
    res.status(400).json({ error: 'Invalid request method' });
  }
};

export default handler;
