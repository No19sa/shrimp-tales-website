
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-aqua-700 to-teal-700 py-12 md:py-20 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Story</h1>
              <p className="text-lg text-aqua-50">
                Passionate about aquatic life and committed to providing the highest quality 
                shrimp, guppies, and aquatic products for hobbyists of all experience levels.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Beginning */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="section-heading">Our Beginning</h2>
                <p className="text-gray-700 mb-4">
                  AquaShrimp started from a genuine passion for aquatic life. What began as a personal hobby
                  in a small home aquarium quickly grew into something much bigger.
                </p>
                <p className="text-gray-700 mb-4">
                  Our founder, Alex, started breeding Neocaridina shrimp in 2015 after being captivated by their 
                  vibrant colors and fascinating behaviors. What started with a single 10-gallon tank soon expanded 
                  to multiple specialized breeding setups as demand grew from local aquarium enthusiasts.
                </p>
                <p className="text-gray-700">
                  By 2018, we had established proper breeding facilities and began shipping nationwide, 
                  committed to sharing these beautiful creatures with hobbyists across the country while 
                  maintaining the highest standards of quality and care.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1520302519449-e78a1c3ad89f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Founder with shrimp tanks" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-aqua-50 to-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-heading mx-auto">Our Mission</h2>
              <p className="text-xl text-gray-700 mb-8">
                To provide hobbyists with the healthiest, most vibrant aquatic pets while promoting responsible 
                fishkeeping through education and support.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-aqua-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-aqua-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Quality</h3>
                  <p className="text-gray-600 text-center">
                    We prioritize genetic health and vibrant coloration in all our breeding stock.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Sustainability</h3>
                  <p className="text-gray-600 text-center">
                    All our operations focus on environmentally sustainable breeding and shipping practices.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-seagreen-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-seagreen-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Education</h3>
                  <p className="text-gray-600 text-center">
                    We provide detailed care guides and ongoing support for hobbyists of all levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Facility */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading">Our Facility</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="text-gray-700 mb-4">
                  Our breeding facility features state-of-the-art equipment and carefully controlled environments
                  to ensure optimal conditions for our aquatic pets. Each species is housed in dedicated systems
                  tailored to their specific needs.
                </p>
                <p className="text-gray-700 mb-4">
                  We maintain over 50 specialized breeding tanks with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Precision temperature control systems</li>
                  <li>Advanced filtration for pristine water quality</li>
                  <li>Specialized lighting that enhances natural coloration</li>
                  <li>Carefully selected live plants for natural habitats</li>
                  <li>Regular water testing and parameter monitoring</li>
                </ul>
                <p className="text-gray-700">
                  Our dedicated team of aquatic specialists monitors our livestock around the clock, ensuring that 
                  only the healthiest specimens make it to your home aquarium.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1546845776-dcdf7c3ceca0?q=80&w=1000&auto=format&fit=crop" 
                    alt="Breeding tanks" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=1000&auto=format&fit=crop" 
                    alt="Colorful shrimp" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1613919738919-eaf1a1fd3caf?q=80&w=1000&auto=format&fit=crop" 
                    alt="Water testing equipment" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1520361537784-aaf10c8e47b2?q=80&w=1000&auto=format&fit=crop" 
                    alt="Guppy breeding tanks" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-teal-50 to-aqua-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading">Meet Our Team</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop" 
                    alt="Alex Thompson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1">Alex Thompson</h3>
                  <p className="text-aqua-600 mb-3">Founder & Head Breeder</p>
                  <p className="text-gray-600 text-sm">
                    With over 10 years of experience in aquatic husbandry, Alex oversees all breeding operations and quality control.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" 
                    alt="Sarah Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1">Sarah Chen</h3>
                  <p className="text-aqua-600 mb-3">Aquatic Biologist</p>
                  <p className="text-gray-600 text-sm">
                    Sarah specializes in shrimp genetics and develops our selective breeding programs for color enhancement.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
                    alt="Michael Rodriguez" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1">Michael Rodriguez</h3>
                  <p className="text-aqua-600 mb-3">Customer Care Specialist</p>
                  <p className="text-gray-600 text-sm">
                    Michael ensures our customers receive expert advice and support for all their aquatic pet needs.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" 
                    alt="Emily Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1">Emily Johnson</h3>
                  <p className="text-aqua-600 mb-3">Shipping & Logistics</p>
                  <p className="text-gray-600 text-sm">
                    Emily has perfected our shipping methods to ensure safe arrival of all our aquatic livestock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-aqua-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Aquatic Journey?</h2>
            <p className="text-xl text-aqua-50 mb-8 max-w-2xl mx-auto">
              Explore our selection of premium Neocaridina shrimp, guppies, and aquatic supplies 
              or get in touch if you have questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-aqua-600 hover:bg-aqua-50">
                <Link to="/shop">Shop Our Collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-aqua-700/20">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
