import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFishProducts } from '@/lib/supabaseData';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFishProducts().then(data => {
      const found = data.find(p => String(p.id) === String(id));
      setProduct(found);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex justify-center items-center">
            <img src={product.image} alt={product.name} className="w-full max-w-md rounded shadow" />
          </div>
          <div className="md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-lg text-gray-600 mb-2">{product.category}</div>
            <div className="text-xl text-primary font-semibold mb-2">₹{product.discountPrice || product.price}</div>
            {product.discountPrice && <div className="text-gray-400 line-through">₹{product.price}</div>}
            <div className="text-gray-700 mb-4">{product.description}</div>
            <div className="mb-2">Stock: {product.stock > 0 ? product.stock : <span className='text-red-500'>Out of stock</span>}</div>
            <div className="flex gap-4 mt-4">
              <Button asChild variant="outline">
                <Link to="/shop">Back to Shop</Link>
              </Button>
              {/* Add to Cart button can be added here if needed */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
