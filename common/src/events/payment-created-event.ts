import { Subjects } from './subjects';

export interface PaymentCreatedEvent {
  subjects: Subjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
