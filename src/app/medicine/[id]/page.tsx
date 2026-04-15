import dbConnect from '@/lib/mongodb';
import Medicine from '@/lib/models/Medicine';
import MedicineDetailContent from './MedicineDetailClient';

export const dynamic = 'force-dynamic';

type Medicine = {
    _id: string;
    name: string;
    price: string;
    category: string;
    image: string;
    description: string;
    usage: string;
    sideEffects: string;
    inStock: boolean;
};

export default async function MedicineDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    let medicine: Medicine | null = null;
    try {
        await dbConnect();
        const data = await Medicine.findById(id);
        if (data) {
            medicine = {
                _id: data._id.toString(),
                name: data.name,
                price: data.price,
                category: data.category,
                image: data.image,
                description: data.description,
                usage: data.usage,
                sideEffects: data.sideEffects,
                inStock: data.inStock,
            };
        }
    } catch (err) {
        console.error("Error fetching medicine dynamically:", err);
    }

    return <MedicineDetailContent medicine={medicine} />;
}
