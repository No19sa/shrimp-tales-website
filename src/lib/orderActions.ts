import { supabase } from './supabaseClient';

export async function placeOrder(userId, cartItems) {
  // 1. Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{ user_id: userId, status: 'placed', created_at: new Date().toISOString() }])
    .select()
    .single();
  if (orderError) throw orderError;

  // 2. Add order items
  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.fish_products.price
  }));
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);
  if (itemsError) throw itemsError;

  // 3. Reduce stock for each product
  for (const item of cartItems) {
    const { error: stockError } = await supabase
      .from('fish_products')
      .update({ stock: item.fish_products.stock - item.quantity })
      .eq('id', item.product_id);
    if (stockError) throw stockError;
  }

  return order;
}
