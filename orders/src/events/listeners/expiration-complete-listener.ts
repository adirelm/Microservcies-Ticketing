import {
  Listener,
  Subjects,
  ExpirationCompleteEvent,
  OrderStatus,
} from '@aetickets1/common';
import { Message } from 'node-nats-streaming';
import { queueGropName } from './queue-group-name';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';

import { Order } from '../../models/order';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName: string = queueGropName;

  async onMessage(data: ExpirationCompleteEvent['data'], message: Message) {
    const order = await Order.findById(data.orderId).populate('ticket');

    if (!order) {
      throw new Error('Order not found');
    }

    await order.save();

    order.set({ status: OrderStatus.Canceled });

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: { id: order.ticket.id },
    });

    message.ack();
  }
}
