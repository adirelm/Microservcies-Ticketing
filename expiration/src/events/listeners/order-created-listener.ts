import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue';
import { Listener, OrderCreatedEvent, Subjects } from '@aetickets1/common';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many milliseconds to process the job:', delay);
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      { delay }
    );

    message.ack();
  }
}
