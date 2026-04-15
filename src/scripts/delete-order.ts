import dbConnect from '../lib/mongodb';
import Order from '../lib/models/Order';

async function deleteOrder() {
  try {
    await dbConnect();
    const result = await Order.findByIdAndDelete('69df2d9e0e69fb5c5bebd349');
    if (result) {
      console.log('Order deleted successfully');
    } else {
      console.log('Order not found');
    }
  } catch (error) {
    console.error('Error deleting order:', error);
  } finally {
    process.exit(0);
  }
}

deleteOrder();