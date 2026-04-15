import dbConnect from '../lib/mongodb';
import Order from '../lib/models/Order';

async function testOrderPlacement() {
  try {
    await dbConnect();

    const orderData = {
      customerName: 'Test Customer',
      phone: '0771234567',
      location: 'Test Location',
      medicines: ['Paracetamol 500mg', 'Artemether Tablets'],
      totalAmount: '1650',
      status: 'Pending'
    };

    const result = await Order.create(orderData);
    console.log('Order placed successfully:', result);
  } catch (error) {
    console.error('Error placing order:', error);
  } finally {
    process.exit(0);
  }
}

testOrderPlacement();