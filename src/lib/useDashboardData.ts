import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useDashboardData() {
  const [overview, setOverview] = useState<{ totalSales: number; totalOrders: number; totalRevenue: number; lowStock: any[]; recentOrders: any[]; customers: number; }>(
    { totalSales: 0, totalOrders: 0, totalRevenue: 0, lowStock: [], recentOrders: [], customers: 0 }
  );
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Sales summary
      const { data: ordersData } = await supabase.from('orders').select('*, order_items(*, fish_products(*))');
      const { data: productsData } = await supabase.from('fish_products').select('*');
      // Calculate analytics
      let totalSales = 0, totalOrders = 0, totalRevenue = 0, customers = 0;
      let productSales = {};
      let lowStock = [];
      let recentOrders = [];
      if (ordersData) {
        totalOrders = ordersData.length;
        totalSales = ordersData.reduce((sum, o) => sum + o.order_items.reduce((s, i) => s + i.quantity, 0), 0);
        totalRevenue = ordersData.reduce((sum, o) => sum + o.order_items.reduce((s, i) => s + (i.price * i.quantity), 0), 0);
        recentOrders = ordersData.slice(-5).reverse();
        ordersData.forEach(o => {
          o.order_items.forEach(i => {
            productSales[i.product_id] = (productSales[i.product_id] || 0) + i.quantity;
          });
        });
        customers = new Set(ordersData.map(o => o.user_id)).size;
      }
      if (productsData) {
        lowStock = productsData.filter(p => p.stock < 10);
      }
      // Top products
      // let topProducts = [];
      // if (productsData) {
      //   topProducts = [...productsData].sort((a, b) => (productSales[b.id] || 0) - (productSales[a.id] || 0)).slice(0, 5);
      // }
      setOverview({ totalSales, totalOrders, totalRevenue, lowStock, recentOrders, customers });
      setOrders(ordersData || []);
      setProducts(productsData || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { overview, orders, products, loading, setProducts, setOrders };
}
