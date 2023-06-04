import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import {
  OrderCancelledEvent,
  Subjects,
  Listener,
  OrderStatus,
} from '@aetickets1/common';

import { Order } from '../../models/order';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], message: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Canceled });
    await order.save();

    message.ack();
  }
}
