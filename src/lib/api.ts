import { supabase } from "./supabase";

// --- TYPES ---

export interface MedicineRow {
    id: string;
    name: string;
    price: string;
    image: string;
    category: string;
    in_stock: boolean;
    description: string;
    usage: string;
    side_effects: string;
    created_at: string;
}

export interface OrderRow {
    id: string;
    customer_name: string;
    phone: string;
    location: string;
    medicines: string[];
    total_amount: string;
    status: string;
    created_at: string;
}

// --- MEDICINES ---

export const getMedicines = async () => {
    const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.warn("Supabase Fetch Warning (getMedicines):", error.message);
        return [];
    }

    const rows = (data || []) as MedicineRow[];

    return rows.map((item: MedicineRow) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        inStock: item.in_stock,
        description: item.description,
        usage: item.usage,
        sideEffects: item.side_effects,
        createdAt: item.created_at
    }));
};

export const getMedicinesByCategory = async (category: string) => {
    const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

    if (error) {
        console.warn("Supabase Fetch Warning (getMedicinesByCategory):", error.message);
        return [];
    }

    const rows = (data || []) as MedicineRow[];

    return rows.map((item: MedicineRow) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        inStock: item.in_stock
    }));
};

export const getMedicineById = async (id: string) => {
    const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        console.error("Supabase Error (getMedicineById):", error || "No data found");
        return null;
    }

    const item = data as MedicineRow;

    return {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        inStock: item.in_stock,
        description: item.description,
        usage: item.usage,
        sideEffects: item.side_effects,
        createdAt: item.created_at
    };
};

export const addMedicine = async (medicine: any) => {
    const { data, error } = await supabase
        .from('medicines')
        .insert([{
            name: medicine.name,
            price: medicine.price,
            category: medicine.category,
            description: medicine.description,
            usage: medicine.usage,
            side_effects: medicine.sideEffects,
            image: medicine.image,
            in_stock: true
        }])
        .select()
        .single();

    if (error) {
        console.error("Supabase Error (addMedicine):", error);
        throw error;
    }
    return data;
};

export const updateMedicine = async (id: string, updates: any) => {
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.price !== undefined) dbUpdates.price = updates.price;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.usage !== undefined) dbUpdates.usage = updates.usage;
    if (updates.sideEffects !== undefined) dbUpdates.side_effects = updates.sideEffects;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.inStock !== undefined) dbUpdates.in_stock = updates.inStock;

    const { data, error } = await supabase
        .from('medicines')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error("Supabase Error (updateMedicine):", error);
        throw error;
    }
    return data;
};

// --- ORDERS ---

export const createOrder = async (orderData: any) => {
    const { data, error } = await supabase
        .from('orders')
        .insert([{
            customer_name: orderData.customerName,
            phone: orderData.phone,
            location: orderData.location,
            medicines: orderData.medicines,
            total_amount: orderData.total,
            status: "Pending"
        }])
        .select()
        .single();

    if (error) {
        console.error("Supabase Error (createOrder):", error);
        throw error;
    }
    return data;
};

export const getOrders = async () => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Supabase Error (getOrders):", error);
        return [];
    }

    const rows = (data || []) as OrderRow[];

    return rows.map((item: OrderRow) => ({
        id: item.id,
        customer: item.customer_name,
        phone: item.phone,
        location: item.location,
        medicines: item.medicines,
        total: item.total_amount,
        status: item.status,
        time: item.created_at
    }));
};

export const updateOrderStatus = async (id: string, status: string) => {
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error("Supabase Error (updateOrderStatus):", error);
        throw error;
    }
    return data;
};
