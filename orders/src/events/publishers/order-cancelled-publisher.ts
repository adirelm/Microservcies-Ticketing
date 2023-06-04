import { Subjects, Publisher, OrderCancelledEvent } from '@aetickets1/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
