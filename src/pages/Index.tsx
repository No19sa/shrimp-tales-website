
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import TestimonialCard from '@/components/TestimonialCard';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { products, testimonials, blogPosts } from '@/lib/data';

const Index = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  
  const featuredProducts = products.filter(product => product.isFeatured);
  const newArrivals = products.filter(product => product.isNewArrival);
  
  const handleAddToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
    // Show toast notification here
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Products Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="section-heading">Featured Products</h2>
              <Button asChild variant="ghost" className="mt-4 md:mt-0">
                <Link to="/shop" className="flex items-center">
                  View All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-12 bg-gradient-to-r from-aqua-50 to-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading text-center mx-auto">Why Choose Our Shrimp</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-aqua-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-aqua-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  All our aquatic pets are bred in optimal conditions with careful attention to genetics and health.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Safe Shipping</h3>
                <p className="text-gray-600">
                  Our specialized shipping methods ensure your new pets arrive alive and stress-free.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-seagreen-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-seagreen-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Get free lifetime support from our team of experienced aquarists for all your questions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* New Arrivals Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="section-heading">New Arrivals</h2>
              <Button asChild variant="ghost" className="mt-4 md:mt-0">
                <Link to="/shop" className="flex items-center">
                  View All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Special Offer Banner */}
        <section className="py-10 bg-gradient-to-r from-teal-600 to-aqua-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl md:text-3xl font-bold">Special Offer</h3>
                <p className="text-lg mt-2">Get free shrimp food with any purchase over $50!</p>
              </div>
              <Button asChild className="bg-white text-aqua-600 hover:bg-aqua-50">
                <Link to="/shop">Shop Now</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 md:py-16 bg-aqua-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading text-center mx-auto mb-10">What Our Customers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} {...testimonial} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Care Guide Preview */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="section-heading">Care Guides</h2>
              <Button asChild variant="ghost" className="mt-4 md:mt-0">
                <Link to="/care-guide" className="flex items-center">
                  View All Guides <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {blogPosts.map(post => (
                <Link key={post.id} to={`/care-guide/${post.id}`} className="card-hover">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 flex-grow">
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center mt-auto pt-4 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-12 bg-gradient-to-r from-aqua-800 to-teal-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Get Shrimp Keeping Tips & Updates</h2>
              <p className="mb-6 text-aqua-100">
                Subscribe to our newsletter for care tips, new arrivals, and special offers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-aqua-500"
                />
                <Button className="bg-aqua-500 hover:bg-aqua-400 w-full sm:w-auto">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
