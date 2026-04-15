// --- TYPES ---

export interface Medicine {
    _id: string;
    name: string;
    price: string;
    image: string;
    category: string;
    inStock: boolean;
    description: string;
    usage: string;
    sideEffects: string;
    createdAt: string;
}

export interface Order {
    _id: string;
    customerName: string;
    phone: string;
    location: string;
    medicines: string[];
    totalAmount: string;
    status: string;
    createdAt: string;
}

// --- MEDICINES ---

export const getMedicines = async (): Promise<Medicine[]> => {
    try {
        const response = await fetch('/api/medicines');
        if (!response.ok) throw new Error('Failed to fetch medicines');
        const data = await response.json();
        return data.map((item: any) => ({
            _id: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            inStock: item.inStock,
            description: item.description,
            usage: item.usage,
            sideEffects: item.sideEffects,
            createdAt: item.createdAt
        }));
    } catch (error) {
        console.error('Error fetching medicines:', error);
        return [];
    }
};

export const getMedicinesByCategory = async (category: string): Promise<Medicine[]> => {
    try {
        const response = await fetch(`/api/medicines?category=${encodeURIComponent(category)}`);
        if (!response.ok) throw new Error('Failed to fetch medicines by category');
        const data = await response.json();
        return data.map((item: any) => ({
            _id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            inStock: item.inStock
        }));
    } catch (error) {
        console.error('Error fetching medicines by category:', error);
        return [];
    }
};

export const getMedicineById = async (id: string): Promise<Medicine | null> => {
    try {
        const response = await fetch(`/api/medicines/${id}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch medicine');
        }
        const item = await response.json();
        return {
            _id: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            inStock: item.inStock,
            description: item.description,
            usage: item.usage,
            sideEffects: item.sideEffects,
            createdAt: item.createdAt
        };
    } catch (error) {
        console.error('Error fetching medicine by id:', error);
        return null;
    }
};

export const addMedicine = async (medicine: Omit<Medicine, '_id' | 'createdAt'>): Promise<Medicine> => {
    try {
        const response = await fetch('/api/medicines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: medicine.name,
                price: medicine.price,
                category: medicine.category,
                description: medicine.description,
                usage: medicine.usage,
                sideEffects: medicine.sideEffects,
                image: medicine.image,
                inStock: true
            })
        });
        if (!response.ok) throw new Error('Failed to add medicine');
        return await response.json();
    } catch (error) {
        console.error('Error adding medicine:', error);
        throw error;
    }
};

export const updateMedicine = async (id: string, updates: Partial<Medicine>): Promise<Medicine> => {
    try {
        const response = await fetch(`/api/medicines/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error('Failed to update medicine');
        return await response.json();
    } catch (error) {
        console.error('Error updating medicine:', error);
        throw error;
    }
};

export const deleteMedicine = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`/api/medicines/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete medicine');
    } catch (error) {
        console.error('Error deleting medicine:', error);
        throw error;
    }
};

// --- ORDERS ---

export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        return data.map((item: any) => ({
            _id: item._id,
            customerName: item.customerName,
            phone: item.phone,
            location: item.location,
            medicines: item.medicines,
            totalAmount: item.totalAmount,
            status: item.status,
            createdAt: item.createdAt
        }));
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};

export const getOrderById = async (id: string): Promise<Order | null> => {
    try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch order');
        }
        const item = await response.json();
        return {
            _id: item._id,
            customerName: item.customerName,
            phone: item.phone,
            location: item.location,
            medicines: item.medicines,
            totalAmount: item.totalAmount,
            status: item.status,
            createdAt: item.createdAt
        };
    } catch (error) {
        console.error('Error fetching order by id:', error);
        return null;
    }
};

export const addOrder = async (order: Omit<Order, '_id' | 'createdAt'>): Promise<Order> => {
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });
        if (!response.ok) throw new Error('Failed to add order');
        return await response.json();
    } catch (error) {
        console.error('Error adding order:', error);
        throw error;
    }
};

export const updateOrder = async (id: string, updates: Partial<Order>): Promise<Order> => {
    try {
        const response = await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error('Failed to update order');
        return await response.json();
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};

export const deleteOrder = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`/api/orders/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete order');
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};

// Legacy functions for compatibility
export const createOrder = async (orderData: any) => {
    return await addOrder({
        customerName: orderData.customerName,
        phone: orderData.phone,
        location: orderData.location,
        medicines: orderData.medicines,
        totalAmount: orderData.total,
        status: "Pending"
    });
};

export const updateOrderStatus = async (id: string, status: string) => {
    return await updateOrder(id, { status });
};
