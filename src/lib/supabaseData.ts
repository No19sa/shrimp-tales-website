import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchFishProducts() {
  const { data, error } = await supabase.from('fish_products').select('*');
  if (error) throw error;
  return data;
}

export async function fetchUserCart(userId) {
  const { data: cart, error: cartError } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (cartError) throw cartError;
  if (!cart) return null;

  const { data: items, error: itemsError } = await supabase
    .from('cart_items')
    .select('*, fish_products(*)')
    .eq('cart_id', cart.id);
  if (itemsError) throw itemsError;

  return { cart, items };
}

export async function addToCart(userId, productId) {
  // 1. Find or create the user's cart
  let { data: cart, error: cartError } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (cartError && cartError.code !== 'PGRST116') throw cartError;
  if (!cart) {
    const { data: newCart, error: newCartError } = await supabase
      .from('carts')
      .insert([{ user_id: userId }])
      .select()
      .single();
    if (newCartError) throw newCartError;
    cart = newCart;
  }
  // 2. Check if item already in cart
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cart.id)
    .eq('product_id', productId)
    .single();
  if (existingItem) {
    // Update quantity
    const { error: updateError } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + 1 })
      .eq('id', existingItem.id);
    if (updateError) throw updateError;
  } else {
    // Insert new item
    const { error: insertError } = await supabase
      .from('cart_items')
      .insert([{ cart_id: cart.id, product_id: productId, quantity: 1 }]);
    if (insertError) throw insertError;
  }
}
