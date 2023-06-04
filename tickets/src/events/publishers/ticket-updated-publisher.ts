import { Publisher, Subjects, TicketUpdatedEvent } from '@aetickets1/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
