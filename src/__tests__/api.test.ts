import { getMedicines, addMedicine, getMedicineById, getOrders, addOrder, getOrderById } from '../lib/api';

// Mock fetch globally
global.fetch = jest.fn();

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMedicines', () => {
    it('should return medicines on successful fetch', async () => {
      const mockMedicines = [
        {
          _id: '1',
          name: 'Aspirin',
          price: '10',
          image: 'image.jpg',
          category: 'Pain Relief',
          inStock: true,
          description: 'Pain reliever',
          usage: 'Take as needed',
          sideEffects: 'Stomach upset',
          createdAt: '2023-01-01T00:00:00.000Z'
        }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockMedicines
      });

      const result = await getMedicines();

      expect(global.fetch).toHaveBeenCalledWith('/api/medicines');
      expect(result).toEqual(mockMedicines);
    });

    it('should return empty array on fetch error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await getMedicines();

      expect(result).toEqual([]);
    });
  });

  describe('addMedicine', () => {
    it('should add medicine successfully', async () => {
      const newMedicine = {
        name: 'Ibuprofen',
        price: '15',
        image: 'ibuprofen.jpg',
        category: 'Pain Relief',
        inStock: true,
        description: 'Anti-inflammatory',
        usage: 'Take with food',
        sideEffects: 'Heartburn'
      };

      const createdMedicine = { ...newMedicine, _id: '2', createdAt: '2023-01-01T00:00:00.000Z' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => createdMedicine
      });

      const result = await addMedicine(newMedicine);

      expect(global.fetch).toHaveBeenCalledWith('/api/medicines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Ibuprofen',
          price: '15',
          category: 'Pain Relief',
          description: 'Anti-inflammatory',
          usage: 'Take with food',
          sideEffects: 'Heartburn',
          image: 'ibuprofen.jpg',
          inStock: true
        })
      });
      expect(result).toEqual(createdMedicine);
    });

    it('should throw error on fetch failure', async () => {
      const newMedicine = {
        name: 'Ibuprofen',
        price: '15',
        image: 'ibuprofen.jpg',
        category: 'Pain Relief',
        inStock: true,
        description: 'Anti-inflammatory',
        usage: 'Take with food',
        sideEffects: 'Heartburn'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false
      });

      await expect(addMedicine(newMedicine)).rejects.toThrow('Failed to add medicine');
    });
  });

  describe('getMedicineById', () => {
    it('should return medicine by id', async () => {
      const medicine = {
        _id: '1',
        name: 'Aspirin',
        price: '10',
        image: 'image.jpg',
        category: 'Pain Relief',
        inStock: true,
        description: 'Pain reliever',
        usage: 'Take as needed',
        sideEffects: 'Stomach upset',
        createdAt: '2023-01-01T00:00:00.000Z'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => medicine
      });

      const result = await getMedicineById('1');

      expect(global.fetch).toHaveBeenCalledWith('/api/medicines/1');
      expect(result).toEqual(medicine);
    });

    it('should return null for 404', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const result = await getMedicineById('1');

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await getMedicineById('1');

      expect(result).toBeNull();
    });
  });

  describe('getOrders', () => {
    it('should return orders on successful fetch', async () => {
      const mockOrders = [
        {
          _id: '1',
          customerName: 'John Doe',
          phone: '1234567890',
          location: 'New York',
          medicines: ['Aspirin'],
          totalAmount: '10',
          status: 'Pending',
          createdAt: '2023-01-01T00:00:00.000Z'
        }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrders
      });

      const result = await getOrders();

      expect(global.fetch).toHaveBeenCalledWith('/api/orders');
      expect(result).toEqual(mockOrders);
    });

    it('should return empty array on fetch error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await getOrders();

      expect(result).toEqual([]);
    });
  });

  describe('addOrder', () => {
    it('should add order successfully', async () => {
      const newOrder = {
        customerName: 'Jane Doe',
        phone: '0987654321',
        location: 'California',
        medicines: ['Ibuprofen'],
        totalAmount: '15',
        status: 'Pending'
      };

      const createdOrder = { ...newOrder, _id: '2', createdAt: '2023-01-01T00:00:00.000Z' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => createdOrder
      });

      const result = await addOrder(newOrder);

      expect(global.fetch).toHaveBeenCalledWith('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      expect(result).toEqual(createdOrder);
    });
  });

  describe('getOrderById', () => {
    it('should return order by id', async () => {
      const order = {
        _id: '1',
        customerName: 'John Doe',
        phone: '1234567890',
        location: 'New York',
        medicines: ['Aspirin'],
        totalAmount: '10',
        status: 'Pending',
        createdAt: '2023-01-01T00:00:00.000Z'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => order
      });

      const result = await getOrderById('1');

      expect(global.fetch).toHaveBeenCalledWith('/api/orders/1');
      expect(result).toEqual(order);
    });

    it('should return null for 404', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const result = await getOrderById('1');

      expect(result).toBeNull();
    });
  });
});