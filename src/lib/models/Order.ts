import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  customerName: string;
  phone: string;
  location: string;
  medicines: string[];
  totalAmount: string;
  status: string;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  medicines: [{ type: String }],
  totalAmount: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);