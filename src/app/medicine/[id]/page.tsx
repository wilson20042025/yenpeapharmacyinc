import { getMedicineById } from '@/lib/api';
import MedicineDetailContent from './MedicineDetailClient';

export const dynamic = 'force-dynamic';

type Medicine = {
    id: string;
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
        const data = await getMedicineById(id);
        if (data) {
            medicine = data as Medicine;
        }
    } catch (err) {
        console.error("Error fetching medicine dynamically:", err);
    }

    return <MedicineDetailContent medicine={medicine} />;
}
