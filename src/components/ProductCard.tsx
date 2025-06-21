import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
  rating: number;
  category: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  stock: number;
  onAddToCart?: (id: string) => void;
  cartItems?: { [key: string]: number };
}

const ProductCard = ({ 
  id,
  name,
  image,
  price,
  discountPrice,
  rating,
  category,
  isFeatured = false,
  isNewArrival = false,
  stock,
  onAddToCart,
  cartItems
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(id);
    }
  };

  return (
    <Card 
      className="card-hover overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link to={`/shop/${id}`}>
          <div className="overflow-hidden h-48">
            <img 
              src={image} 
              alt={name} 
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
          </div>
        </Link>
        
        {isFeatured && (
          <Badge className="absolute top-2 left-2 bg-secondary hover:bg-teal-600">
            Featured
          </Badge>
        )}
        
        {isNewArrival && (
          <Badge className="absolute top-2 left-2 bg-primary hover:bg-aqua-600">
            New Arrival
          </Badge>
        )}
        
        {discountPrice && (
          <Badge className="absolute top-2 right-2 bg-destructive hover:bg-red-600">
            Sale
          </Badge>
        )}
      </div>
      
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              <Link to={`/shop/${id}`} className="hover:text-primary transition-colors">
                {name}
              </Link>
            </CardTitle>
            <CardDescription>{category}</CardDescription>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-center">
          {discountPrice ? (
            <>
              <span className="text-lg font-bold text-primary">₹{discountPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">₹{price.toFixed(2)}</span>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button 
            asChild
            variant="outline"
            className="w-1/2 min-w-0 text-xs sm:text-sm px-1 sm:px-2 whitespace-nowrap overflow-hidden text-ellipsis"
          >
            <Link to={`/shop/${id}`}>
              <span className="block sm:hidden">More</span>
              <span className="hidden sm:block">View More</span>
            </Link>
          </Button>
          {typeof cartItems !== 'undefined' && cartItems[id] > 0 ? (
            <div className="w-1/2 flex items-center justify-center gap-2 min-w-0">
              <span className="text-primary font-semibold text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">Qty: {cartItems[id]}</span>
            </div>
          ) : (
            <Button 
              onClick={handleAddToCart} 
              className="w-1/2 min-w-0 text-xs sm:text-sm px-1 sm:px-2 whitespace-nowrap overflow-hidden text-ellipsis"
              disabled={stock === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className="block sm:hidden">Add</span>
              <span className="hidden sm:block">Add to Cart</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
