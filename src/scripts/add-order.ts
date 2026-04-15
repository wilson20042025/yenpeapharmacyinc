import dbConnect from '../lib/mongodb';
import Order from '../lib/models/Order';

async function addOrder() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    const newOrder = {
      customerName: 'Local Customer',
      phone: '0773678742',
      location: 'Chugbor Old Road, Monrovia, Liberia',
      medicines: ['Aspirin 100mg', 'Vitamin C 1000mg'],
      totalAmount: '15.98',
      status: 'Pending'
    };

    const order = new Order(newOrder);
    await order.save();

    console.log('New order added:', order);
    process.exit(0);
  } catch (error) {
    console.error('Error adding order:', error);
    process.exit(1);
  }
}

addOrder();