import { Xendit } from 'xendit-node';
import dotenv from 'dotenv';
import connection from '../application/database.js';
import ResponseError from '../error/response-error.js';

dotenv.config();

const xenditClient = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});

const get = async () => {
  const { Payout } = xenditClient;
  const response = await Payout.getPayoutChannels({ currency: 'IDR' });

  return response;
};

const createInvoiceRequest = async (params) => {
  const { Invoice } = xenditClient;
  const response = await Invoice.createInvoice({
    data: params,
  });

  return response;
};

const create = async (req) => {
  const randomExternalId = `INV-${Math.floor(Math.random() * 1000000)}`;

  const userId = req.userData.id;
  const doctorId = req.body.doctor_id;
  const orderId = crypto.randomUUID();
  const [payment] = await connection.execute('INSERT INTO orders (id, invoice, amount_paid, user_id, doctor_id) VALUES (?, ?, ?, ?, ?)', [
    orderId,
    randomExternalId,
    20000,
    userId,
    doctorId,
  ]);

  const data = {
    amount: 21000,
    invoiceDuration: 86400,
    externalId: randomExternalId,
    description: 'Invoice Payment',
    currency: 'IDR',
  };

  const invoice = await createInvoiceRequest(data);
  const [order] = await connection.execute('UPDATE orders SET payment_url = ? WHERE id = ?', [invoice.invoiceUrl, orderId]);

  return order;
};

const callback = async (req) => {
  const { external_id, status } = req.body;
  const [payment] = await connection.execute('SELECT * FROM orders WHERE invoice = ? LIMIT 1', [external_id]);

  if (payment.length <= 0) {
    throw new ResponseError(404, 'Payment Not Found');
  }

  const tokenWebhook = process.env.XENDIT_CALLBACK_TOKEN;

  if (req.get('x-callback-token') !== tokenWebhook) {
    throw new ResponseError(400, 'Invalid callback Token');
  }

  let updateOrder;

  if (status === 'PAID') {
    [updateOrder] = await connection.execute('UPDATE orders SET status = ? WHERE invoice = ?', ['PAID', external_id]);
  } else {
    [updateOrder] = await connection.execute('UPDATE orders SET status = ? WHERE invoice = ?', ['EXPIRED', external_id]);
  }

  return updateOrder;
}

export default {
  get,
  create,
  callback,
};
