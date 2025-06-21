import { supabase } from './supabaseClient';

export async function updateCartItemQuantity(cartItemId, quantity) {
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId);
  if (error) throw error;
}

export async function removeCartItem(cartItemId) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);
  if (error) throw error;
}

