import dbConnect from '../lib/mongodb';
import Medicine from '../lib/models/Medicine';
import Order from '../lib/models/Order';

async function seedDatabase() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Medicine.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data');

    // Sample medicines
    const medicines = [
      {
        name: 'Aspirin 100mg',
        price: '5.99',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        category: 'Pain Relief',
        inStock: true,
        description: 'Effective pain reliever and fever reducer',
        usage: 'Take 1-2 tablets every 4-6 hours as needed',
        sideEffects: 'May cause stomach upset, consult doctor if pregnant'
      },
      {
        name: 'Ibuprofen 200mg',
        price: '7.49',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        category: 'Pain Relief',
        inStock: true,
        description: 'Non-steroidal anti-inflammatory drug',
        usage: 'Take with food, 1-2 tablets every 6-8 hours',
        sideEffects: 'May cause heartburn or stomach irritation'
      },
      {
        name: 'Paracetamol 500mg',
        price: '4.99',
        image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca9?w=400',
        category: 'Fever',
        inStock: true,
        description: 'Fast-acting fever and pain relief',
        usage: 'Take 1-2 tablets every 4-6 hours, max 8 per day',
        sideEffects: 'Rare allergic reactions, consult doctor'
      },
      {
        name: 'Amoxicillin 500mg',
        price: '12.99',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400',
        category: 'Antibiotics',
        inStock: true,
        description: 'Broad-spectrum antibiotic',
        usage: 'Take as prescribed by doctor, complete full course',
        sideEffects: 'May cause nausea, diarrhea, or rash'
      },
      {
        name: 'Vitamin C 1000mg',
        price: '9.99',
        image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca9?w=400',
        category: 'Vitamins',
        inStock: true,
        description: 'Immune system support and antioxidant',
        usage: 'Take 1 tablet daily with food',
        sideEffects: 'Generally safe, may cause mild stomach upset'
      },
      {
        name: 'Cough Syrup',
        price: '8.49',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
        category: 'Cough & Cold',
        inStock: true,
        description: 'Relieves cough and sore throat',
        usage: 'Take 10ml every 4 hours as needed',
        sideEffects: 'May cause drowsiness, do not drive'
      },
      {
        name: 'Bandages 10pk',
        price: '3.99',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        category: 'First Aid',
        inStock: true,
        description: 'Sterile adhesive bandages',
        usage: 'Apply to clean wounds, change daily',
        sideEffects: 'Keep out of reach of children'
      },
      {
        name: 'Blood Pressure Monitor',
        price: '29.99',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400',
        category: 'Medical Devices',
        inStock: false,
        description: 'Digital automatic blood pressure monitor',
        usage: 'Follow instruction manual for accurate readings',
        sideEffects: 'Ensure proper cuff size for accurate measurements'
      }
    ];

    // Sample orders
    const orders = [
      {
        customerName: 'John Smith',
        phone: '+1234567890',
        location: '123 Main St, City, State',
        medicines: ['Aspirin 100mg', 'Vitamin C 1000mg'],
        totalAmount: '15.98',
        status: 'Pending'
      },
      {
        customerName: 'Sarah Johnson',
        phone: '+1987654321',
        location: '456 Oak Ave, Town, State',
        medicines: ['Ibuprofen 200mg', 'Cough Syrup'],
        totalAmount: '15.98',
        status: 'Confirmed'
      },
      {
        customerName: 'Mike Davis',
        phone: '+1122334455',
        location: '789 Pine Rd, Village, State',
        medicines: ['Paracetamol 500mg'],
        totalAmount: '4.99',
        status: 'Ready'
      },
      {
        customerName: 'Emma Wilson',
        phone: '+1555666777',
        location: '321 Elm St, Borough, State',
        medicines: ['Amoxicillin 500mg', 'Bandages 10pk'],
        totalAmount: '16.98',
        status: 'Delivered'
      }
    ];

    // Insert medicines
    await Medicine.insertMany(medicines);
    console.log('Inserted medicines');

    // Insert orders
    await Order.insertMany(orders);
    console.log('Inserted orders');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();