import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicine extends Document {
  name: string;
  price: string;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
  usage: string;
  sideEffects: string;
  createdAt: Date;
}

const MedicineSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, required: true },
  description: { type: String, required: true },
  usage: { type: String, required: true },
  sideEffects: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Medicine || mongoose.model<IMedicine>('Medicine', MedicineSchema);