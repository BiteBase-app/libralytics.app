/* eslint-disable no-console */
/* eslint-disable import/extensions */
import '@/utils/Firebase';

import { getFirestore } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

function createClientPayload(
  dateString: string,
  email: string,
  name: string,
  phone: string,
  message: string
) {
  const timestamp = Date.now();
  return {
    email,
    name,
    phone,
    message,
    timestamp,
    dateString,
  };
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const currentDate = new Date();
  const dateString = currentDate
    .toLocaleDateString('en-GB')
    .replace(/\//g, '-');

  const { email, name, phone, message } = JSON.parse(req.body || '{}');
  if (!email || !name || !phone) {
    res.status(400).send('Invalid request body');
    return;
  }
  const clientPayload = createClientPayload(
    dateString,
    email,
    name,
    phone,
    message
  );

  const clientDoc = getFirestore()
    .collection('date')
    .doc(dateString)
    .collection('clients');
  await clientDoc.add(clientPayload);
  // console.log('clientDoc', clientDoc);
  res.status(200).send('success');
}

// async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
//   const clientDoc = getFirestore().collection('clients');
//   const clientDocs = await clientDoc.get();
//   const clients = clientDocs.docs.map((doc) => doc.data());
//   res.status(200).send(clients);
// }

// eslint-disable-next-line consistent-return
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') await handlePostRequest(req, res);
  // if (req.method === 'GET') await handleGetRequest(req, res);
  else res.status(400).send('Invalid request method');
};

export default handler;
