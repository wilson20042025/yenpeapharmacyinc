import dbConnect from '../lib/mongodb';
import Medicine from '../lib/models/Medicine';

async function listMedicines() {
  try {
    await dbConnect();
    const medicines = await Medicine.find({}, '_id name');
    console.log('Medicines:');
    medicines.forEach(med => {
      console.log(`${med._id}: ${med.name}`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

listMedicines();