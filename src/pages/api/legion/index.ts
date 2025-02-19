/* eslint-disable no-console */
/* eslint-disable import/extensions */
import '@/utils/Firebase';

import { getFirestore } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

function createClientPayload(payload: any) {
  let trialEligibility;
  let isBot = null;
  if (payload.eligible_for_trial === false) {
    trialEligibility = false;
  } else {
    trialEligibility = null;
  }
  if (payload.bot === false) {
    isBot = false;
  } else if (payload.bot === true) {
    isBot = true;
  } else {
    isBot = null;
  }
  return {
    // User fields
    id: payload.id ?? null,
    first_name: payload.first_name ?? null,
    username: payload.username ?? null,
    usertype: payload.usertype ?? null,
    bot: isBot,
    language_code: payload.language_code ?? null,
    // Payment fields
    invoice_payload: payload.invoice_payload ?? null,
    plan: payload.plan ?? null,
    total_amount: payload.total_amount ?? null,
    currency: payload.currency ?? null,
    telegram_payment_charge_id: payload.telegram_payment_charge_id ?? null,
    provider_payment_charge_id: payload.provider_payment_charge_id ?? null,
    expiry: payload.expiry ?? null,
    // Other fields
    join_date: payload.join_date ?? null,
    invite_url: payload.invite_url ?? null,
    eligible_for_trial: trialEligibility,
  };
}

function clientUpdatesPayload(payload: any) {
  const updates: { [key: string]: any } = {};
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== null) {
      updates[key] = payload[key];
    }
  });
  return updates;
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  console.log(JSON.stringify(req.body, null, 2));
  if (
    req.headers.authorization === `Bearer ${process.env.LEGION_WEBHOOK_TOKEN}`
  ) {
    try {
      const clientObject = createClientPayload(req.body);
      console.log(JSON.stringify(clientObject, null, 2));
      const id = String(clientObject?.id);
      console.log(id);
      const clientDoc = getFirestore().collection('legionClients').doc(id);

      await clientDoc.collection('updates').add(clientObject);

      const updates = clientUpdatesPayload(clientObject);
      const fieldUpdates: any = {
        id: clientObject.id,
        lastupdatedat: Math.ceil(Date.now() / 1000),
      };
      if (updates.username) {
        fieldUpdates.username = updates.username;
      }
      if (updates.first_name) {
        fieldUpdates.first_name = updates.first_name;
      }
      if (
        updates.eligible_for_trial !== null &&
        updates.eligible_for_trial !== undefined
      ) {
        fieldUpdates.eligible_for_trial = updates.eligible_for_trial;
      }
      if (updates.plan) {
        fieldUpdates.plan = updates.plan;
      }
      if (updates.expiry) {
        fieldUpdates.expiry = updates.expiry;
      }
      if (updates.join_date) {
        fieldUpdates.join_date = updates.join_date;
      }
      if (updates.invite_url) {
        fieldUpdates.invite_url = updates.invite_url;
      }
      await clientDoc.set(fieldUpdates, { merge: true });

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
  if (
    req.headers.authorization === `Bearer ${process.env.LEGION_WEBHOOK_TOKEN}`
  ) {
    try {
      const id = String(req.query.id);
      const clientDoc = await getFirestore()
        .collection('legionClients')
        .doc(id)
        .get();
      const client = clientDoc?.data();
      if (client) {
        res.status(200).send(client);
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await handleGetRequest(req, res);
  } else if (req.method === 'POST') {
    await handlePostRequest(req, res);
  } else {
    res.status(400).send('Invalid request method');
  }
};

export default handler;
