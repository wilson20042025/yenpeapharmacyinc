import dbConnect from '@/lib/mongodb';
import Medicine from '@/lib/models/Medicine';
import NeedContent from './NeedContent';

export const dynamic = 'force-dynamic';

type Medication = {
    _id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    prescription?: boolean;
    inStock?: boolean;
};

const categoryHeroData: Record<string, { title: string, icon: string, description: string, image: string }> = {
    "malaria": {
        title: "Malaria Treatment",
        icon: "bug_report",
        description: "Effective solutions for malaria prevention and treatment. Please consult a doctor for severe cases.",
        image: "https://d.medicaldaily.com/en/full/290654/mosquito.jpg?w=736&f=916646ba21964a702bbb74eee14099df"
    },
    "fever": {
        title: "Fever & Cold",
        icon: "thermostat",
        description: "Reliable relief for high temperatures, headaches, and common cold symptoms.",
        image: "https://img.freepik.com/premium-photo/parent-child-forehead-check-with-thermometer-fever-bedroom-wellness-assessment-covid-flu-black-person-kid-sick-home-with-care-allergy-inspection-with-tools-virus_590464-424450.jpg"
    },
    "pain-relief": {
        title: "Pain Relief",
        icon: "home_health",
        description: "Fast-acting relief for body pains, cramps, and chronic aches.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCixucxLJtE4ZxEG0TmeJArqaQZhGYEpZvvQ&s"
    },
    "cough": {
        title: "Cough & Allergy",
        icon: "air",
        description: "Soothing remedies for dry or chesty coughs and common allergies.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk57LDQuACunQq-De2vrodMCYlyLaVQV9pg&s"
    },
    "infection": {
        title: "Infection Care",
        icon: "vaccines",
        description: "Quality antibiotics and anti-fungal treatments following your prescription.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0tV97gWcIQ_2ml3vWRdo1DLKWC0sg7Ws9Q&s"
    },
    "stomach": {
        title: "Stomach Health",
        icon: "nutrition",
        description: "Relief for indigestion, acidity, and gastrointestinal discomfort.",
        image: "https://media.istockphoto.com/id/2164034292/photo/man-holding-stomach-in-discomfort-experiencing-abdominal-pain.jpg?s=612x612&w=0&k=20&c=yPBOLPVgziW5IwofzMz21PgwoE1bRlmg421YzWsBmoQ="
    },
    "vitamins": {
        title: "Vitamins & Supplements",
        icon: "pill",
        description: "Boost your immunity and energy with our curated selection of supplements.",
        image: ""
    },
    "first-aid": {
        title: "First Aid & Emergency",
        icon: "medical_services",
        description: "Essential supplies for wound care and emergency medical kits.",
        image: ""
    }
};

export default async function NeedPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    let medicines: Medication[] = [];
    try {
        await dbConnect();
        const data = await Medicine.find({ category: slug });
        medicines = data.map(item => ({
            _id: item._id.toString(),
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            inStock: item.inStock,
        }));
    } catch (err) {
        console.error("Error fetching category meds dynamically:", err);
    }

    const categoryInfo = categoryHeroData[slug] || { title: slug?.toUpperCase(), icon: 'medical_services', description: 'Available medications for your health needs.', image: '' };

    return <NeedContent medicines={medicines} categoryInfo={categoryInfo} slug={slug} />;
}
