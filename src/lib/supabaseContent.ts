import { supabase } from './supabaseClient';

export async function fetchTestimonials() {
  const { data, error } = await supabase.from('testimonials').select('*');
  if (error) throw error;
  return data;
}

export async function fetchBlogPosts() {
  const { data, error } = await supabase.from('blog_posts').select('*');
  if (error) throw error;
  return data;
}
