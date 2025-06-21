import { useEffect, useState } from 'react';
import { useAuthUser } from '@/hooks/useAuthUser';
import { fetchUserCart } from '@/lib/supabaseData';
import { updateCartItemQuantity, removeCartItem } from '@/lib/cartActions';
import { placeOrder } from '@/lib/orderActions';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const Cart = () => {
  const user = useAuthUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserCart(user.id)
        .then(res => setCartItems(res?.items || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleQuantityChange = async (item, newQty) => {
    if (newQty < 1) return;
    if (newQty > item.fish_products.stock) {
      setError(`Only ${item.fish_products.stock} in stock for ${item.fish_products.name}`);
      return;
    }
    setUpdating(true);
    setError('');
    try {
      await updateCartItemQuantity(item.id, newQty);
      setCartItems(items => items.map(i => i.id === item.id ? { ...i, quantity: newQty } : i));
    } catch (e) {
      setError('Failed to update quantity.');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async (item) => {
    setUpdating(true);
    setError('');
    try {
      await removeCartItem(item.id);
      setCartItems(items => items.filter(i => i.id !== item.id));
    } catch (e) {
      setError('Failed to remove item.');
    } finally {
      setUpdating(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) return;
    setUpdating(true);
    setError('');
    try {
      await placeOrder(user.id, cartItems);
      setCartItems([]);
      alert('Order placed successfully!');
    } catch (e) {
      setError('Failed to place order.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="hidden md:block">
        <NavBar />
      </div>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {loading ? (
          <div>Loading...</div>
        ) : !user ? (
          <div>Please sign in to view your cart.</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-lg text-gray-500 py-12">Your cart is empty. Add some products to get started!</div>
        ) : (
          <div className="w-full max-w-3xl mx-auto">
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.product_id} className="flex items-center py-4 gap-4">
                  <img src={item.fish_products.image} alt={item.fish_products.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{item.fish_products.name}</div>
                    <div className="text-gray-500 text-sm">{item.fish_products.description}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => handleQuantityChange(item, item.quantity - 1)} disabled={updating || item.quantity <= 1} className="px-2 py-1 border rounded disabled:opacity-50">-</button>
                      <span className="px-2">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item, item.quantity + 1)} disabled={updating || item.quantity >= item.fish_products.stock} className="px-2 py-1 border rounded disabled:opacity-50">+</button>
                      <span className="text-xs text-gray-400 ml-2">(Stock: {item.fish_products.stock})</span>
                    </div>
                    {item.quantity > item.fish_products.stock && (
                      <div className="text-red-500 text-xs">Not enough stock!</div>
                    )}
                  </div>
                  <div className="flex flex-col items-end min-w-[120px]">
                    <div className="font-bold text-primary text-lg">₹{item.fish_products.price}</div>
                    <div className="text-gray-500 text-sm">Total: ₹{(item.fish_products.price * item.quantity).toFixed(2)}</div>
                    <button onClick={() => handleRemove(item)} disabled={updating} className="mt-2 text-red-500 hover:underline text-xs">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-8 border-t pt-4">
              <div className="text-xl font-bold">Grand Total: ₹{cartItems.reduce((sum, item) => sum + item.fish_products.price * item.quantity, 0).toFixed(2)}</div>
              <button className="bg-aqua-600 text-white px-6 py-2 rounded hover:bg-aqua-700 transition-colors font-semibold text-lg" disabled={updating} onClick={handlePlaceOrder}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
