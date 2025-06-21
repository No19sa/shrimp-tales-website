import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ShopFilters from '@/components/ShopFilters';
import { fetchFishProducts, addToCart } from '@/lib/supabaseData';
import { useAuthUser } from '@/hooks/useAuthUser';

const productCategories = [
  'shrimp',
  'fish',
  'food',
  'care',
  'combo',
];
const productColors = [
  'red',
  'blue',
  'yellow',
  'brown',
  'green',
  'multicolor',
];

const Shop = () => {
  const location = useLocation();
  const user = useAuthUser();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<any>({
    categories: [],
    colors: [],
    priceRange: [0, 100],
  });
  const [sortBy, setSortBy] = useState('featured');
  const [cartItems, setCartItems] = useState<{ [productId: string]: number }>({});
  
  // Get category from URL query if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setActiveFilters(prev => ({
        ...prev,
        categories: [categoryParam],
      }));
    }
  }, [location.search]);
  
  // Fetch products from Supabase
  useEffect(() => {
    fetchFishProducts().then(data => {
      setProducts(data || []);
      setFilteredProducts(data || []);
    }).catch(console.error);
  }, []);
  
  // Filter products based on active filters and search term
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (activeFilters.categories.length > 0) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }
    
    // Filter by color
    if (activeFilters.colors.length > 0) {
      result = result.filter(product => 
        activeFilters.colors.includes(product.color)
      );
    }
    
    // Filter by price range
    result = result.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= activeFilters.priceRange[0] && price <= activeFilters.priceRange[1];
    });
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    
    setFilteredProducts(result);
  }, [products, activeFilters, searchTerm, sortBy]);
  
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  
  const handleAddToCart = async (productId: string) => {
    if (!user) {
      alert('Please sign in to add items to your cart.');
      return;
    }
    try {
      await addToCart(user.id, productId);
      setCartItems(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1
      }));
    } catch (err) {
      alert('Failed to add to cart.');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow">
        {/* Shop Header */}
        <section className="bg-gradient-to-r from-aqua-600 to-teal-600 py-10 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop Our Collection</h1>
            <p className="max-w-2xl text-aqua-50">
              Browse our selection of premium quality Neocaridina shrimps, guppies, 
              and other aquatic pets. We also offer high-quality food and care products.
            </p>
          </div>
        </section>
        
        {/* Shop Content */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Sidebar */}
              <div className="lg:w-1/4">
                <ShopFilters 
                  onFilterChange={handleFilterChange}
                  categories={productCategories}
                  colors={productColors}
                />
              </div>
              
              {/* Products */}
              <div className="lg:w-3/4">
                {/* Search and Sort */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="w-full sm:max-w-xs">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aqua-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                    <select
                      id="sort"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aqua-500"
                      value={sortBy}
                      onChange={handleSortChange}
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest Arrivals</option>
                    </select>
                  </div>
                </div>
                
                {/* Results count */}
                <div className="mb-4 text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
                
                {/* Products grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        onAddToCart={handleAddToCart}
                        cartItems={cartItems}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-aqua-500 text-5xl mb-4">😢</div>
                    <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                    <p className="text-gray-600">
                      Try adjusting your filters or search term to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
