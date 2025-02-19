/* eslint-disable no-console */
/* eslint-disable import/extensions */
import '@/utils/Firebase';

import { firestore } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

function createOrderPayload(payload: any) {
  const timestamp = Date.now();
  return {
    // Restaurant ID
    resto: payload.resto,
    // User fields
    user: payload.user ?? null,
    username: payload.username ?? null,
    // Order fields
    table: payload.table ?? null,
    items: payload.items ?? null,
    total: payload.total ?? null,
    status: payload.status ?? null,
    comment: payload.comment ?? null,
    timestamp,
  };
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  console.log(JSON.stringify(req.body, null, 2));
  if (req.headers.authorization === `Bearer ${process.env.RESTO_TOKEN}`) {
    try {
      const orderObject = createOrderPayload(req.body);
      console.log(JSON.stringify(orderObject, null, 2));
      const { resto } = orderObject;
      const restoDoc = getFirestore().collection('resto').doc(resto);
      const currentDate = new Date();
      const dateString = currentDate
        .toLocaleDateString('en-GB')
        .replace(/\//g, '-');

      // if(orderObject.status === "completed")
      await restoDoc
        .collection('orderDates')
        .doc(dateString)
        .collection('orders')
        .add(orderObject);

      const updates: any = { lastupdatedat: new Date().toISOString() };
      updates.numberOfOrders = firestore.FieldValue.increment(1);
      await restoDoc.set(updates, { merge: true });

      res.status(200).send('success');
    } catch (e) {
      console.error(e);
      res.status(500).send('unable to save response');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.authorization === `Bearer ${process.env.RESTO_TOKEN}`) {
    try {
      const resto = String(req.query.resto);
      const currentDate = new Date();
      const dateString = currentDate
        .toLocaleDateString('en-GB')
        .replace(/\//g, '-');

      const orders = await getFirestore()
        .collection('resto')
        .doc(resto)
        .collection('orderDates')
        .doc(dateString)
        .collection('orders')
        .get();

      console.log(JSON.stringify(orders, null, 2));

      if (orders) {
        res.status(200).send(orders);
      } else {
        res.status(404).send(false);
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('unable to send response');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
}

const handleOptionsRequest = (_req: NextApiRequest, res: NextApiResponse) => {
  // Set CORS headers for the preflight request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.status(200).end();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    handleOptionsRequest(req, res);
  } else if (req.method === 'GET') {
    await handleGetRequest(req, res);
  } else if (req.method === 'POST') {
    await handlePostRequest(req, res);
  } else {
    res.status(400).send('Invalid request method');
  }
};

export default handler;
