import connection from '../application/database.js';
import { storeOrderValidation } from '../validation/order-validation.js';
import validate from '../validation/validation.js';

const store = async (request) => {
  const data = validate(storeOrderValidation, request);

  data.id = crypto.randomUUID();
  data.order_number = Math.floor(Math.random() * (10 * 10000)) + 1;

  const [order] = await connection.execute('INSERT INTO orders (id,order_number,amount_paid, user_id, doctor_id) VALUES (?, ?, ?, ?, ?)', [
    data.id,
    data.order_number,
    data.amount_paid,
    data.user_id,
    data.doctor_id,
  ]);

  return order;
};

export default {
  store,
};
