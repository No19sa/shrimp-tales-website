
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-aqua-800 to-teal-700 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-water-pattern"></div>
      
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-aqua-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-32 -left-16 w-48 h-48 bg-teal-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="block">Premium Quality</span>
              <span className="block text-aqua-200">Neocaridina Shrimps</span>
              <span className="block">& Aquatic Pets</span>
            </h1>
            
            <p className="mt-4 text-lg text-aqua-50 max-w-md">
              Discover vibrant, healthy shrimps and ornamental fish for your aquarium, 
              along with expert care products and advice.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="bg-white hover:bg-aqua-50 text-aqua-800 text-lg px-6 py-3 h-auto">
                <Link to="/shop">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-white text-aqua-200 hover:bg-aqua-700/20 text-lg px-6 py-3 h-auto">
                <Link to="/care-guide">
                  Care Guides
                </Link>
              </Button>
            </div>
            
            <div className="mt-6">
              <p className="text-aqua-200 font-medium">
                🔥 Special Offer: Free shrimp food with purchases over $50
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-10">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=1000&auto=format&fit=crop"
                  alt="Colorful Neocaridina shrimps in aquarium" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="flex items-center">
                  <div className="bg-aqua-500 text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Featured Products</p>
                    <p className="font-medium">Cherry Red Shrimps</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Starting at</p>
                  <p className="text-xl font-bold text-aqua-600">$19.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
