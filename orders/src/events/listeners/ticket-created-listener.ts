import { Ticket } from '../../models/ticket';
import { Message } from 'node-nats-streaming';
import { queueGropName } from './queue-group-name';
import { Subjects, Listener, TicketCreatedEvent } from '@aetickets1/common';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGropName;

  async onMessage(data: TicketCreatedEvent['data'], message: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    message.ack();
  }
}
