import { Ticket } from '../../models/ticket';
import { Message } from 'node-nats-streaming';
import { queueGropName } from './queue-group-name';
import { Subjects, Listener, TicketUpdatedEvent } from '@aetickets1/common';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGropName;

  async onMessage(data: TicketUpdatedEvent['data'], message: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();

    message.ack();
  }
}
