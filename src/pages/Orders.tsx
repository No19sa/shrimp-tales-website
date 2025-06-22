import { useEffect, useState } from 'react';
import { useAuthUser } from '@/hooks/useAuthUser';
import { supabase } from '@/lib/supabaseClient';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Orders = () => {
  const user = useAuthUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        setLoading(true);
        try {
          const { data } = await supabase
            .from('orders')
            .select('*, order_items(*, fish_products(*))')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
          setOrders(data || []);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Please sign in to view your orders.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        {loading ? (
          <div>Loading...</div>
        ) : orders.length === 0 ? (
          <div>You have no orders yet.</div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4 shadow-sm">
                <div className="mb-2 flex justify-between items-center">
                  <span className="font-semibold">Order ID: {order.id}</span>
                  <span className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</span>
                  <span className="text-sm font-medium text-aqua-600">{order.status}</span>
                </div>
                <ul className="divide-y divide-gray-200">
                  {order.order_items.map(item => (
                    <li key={item.id} className="flex items-center py-2 gap-4">
                      <img src={item.fish_products?.image} alt={item.fish_products?.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold">{item.fish_products?.name}</div>
                        <div className="text-gray-500 text-sm">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-bold text-primary text-lg">₹{item.price}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
