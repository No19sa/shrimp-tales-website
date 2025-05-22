
import { Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface TestimonialCardProps {
  name: string;
  location: string;
  image?: string;
  rating: number;
  date: string;
  text: string;
}

const TestimonialCard = ({
  name,
  location,
  image,
  rating,
  date,
  text,
}: TestimonialCardProps) => {
  // Generate rating stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 pb-2 flex-grow">
        <div className="flex mb-2">
          {renderStars()}
        </div>
        <p className="text-gray-600 italic">"{text}"</p>
      </CardContent>
      
      <CardFooter className="pt-4 border-t">
        <div className="flex items-center">
          <div className="mr-3">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-aqua-100 text-aqua-600 flex items-center justify-center font-medium">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-gray-500 text-sm flex items-center">
              <span>{location}</span>
              <span className="mx-1">•</span>
              <span>{date}</span>
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
