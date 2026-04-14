import { supabase } from "./supabase";

// --- MEDICINES ---

export const getMedicines = async () => {
    const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.warn("Supabase Fetch Warning (getMedicines):", error.message);
        return []; // Return empty array to prevent build failure
    }

    // Map snake_case to camelCase for the UI
    return (data || []).map(item => ({
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
        return []; // Return empty array to prevent build failure
    }

    return (data || []).map(item => ({
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

    return {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        category: data.category,
        inStock: data.in_stock,
        description: data.description,
        usage: data.usage,
        sideEffects: data.side_effects,
        createdAt: data.created_at
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
    // Map camcelCase updates to snake_case for DB
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
            medicines: orderData.medicines, // Assuming this is an array of strings/IDs
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
        throw error;
    }

    return (data || []).map(item => ({
        id: item.id,
        customer: item.customer_name,
        phone: item.phone,
        location: item.location,
        medicines: item.medicines,
        total: item.total_amount,
        status: item.status,
        time: item.created_at // You might want to format this
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
