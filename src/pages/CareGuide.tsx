import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchBlogPosts } from '@/lib/supabaseContent';

const CareGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts().then(setBlogPosts).catch(console.error);
  }, []);

  // Get unique categories from blog posts
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];
  
  // Filter blog posts based on search term and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gradient-to-r from-aqua-700 to-teal-700 py-10 md:py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Shrimp & Aquatic Pets Care Guide</h1>
              <p className="text-lg text-aqua-50">
                Expert tips and guides to help you care for your shrimp, guppies, and other aquatic pets.
                Learn about water parameters, feeding, breeding, and more.
              </p>
              <Button asChild className="mt-6 bg-white text-aqua-700 hover:bg-aqua-50">
                <a href="#care-guides">Browse Guides</a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Guide */}
        <section className="py-12 bg-aqua-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2">
                  <img 
                    src="https://images.unsplash.com/photo-1546845776-dcdf7c3ceca0?q=80&w=1000&auto=format&fit=crop" 
                    alt="Beginner's Guide to Keeping Neocaridina Shrimp"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-3 p-6 md:p-8">
                  <div className="text-aqua-600 text-sm font-medium mb-2">FEATURED GUIDE</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Complete Beginner's Guide to Neocaridina Shrimp
                  </h2>
                  <p className="text-gray-600 mb-6">
                    New to shrimp keeping? This comprehensive guide covers everything from tank setup and water parameters
                    to feeding, breeding, and troubleshooting common issues. Perfect for beginners who want to 
                    ensure their shrimp thrive from day one.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild>
                      <Link to="/care-guide/beginner-guide">Read Guide</Link>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* All Care Guides */}
        <section id="care-guides" className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="section-heading">Care Guides & Articles</h2>
              <div className="mt-4 md:mt-0 w-full md:w-auto">
                <Input
                  type="text"
                  placeholder="Search guides..."
                  className="max-w-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category Tabs */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 min-w-max">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    className={activeCategory === category ? "bg-aqua-600 hover:bg-aqua-700" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category === 'all' ? 'All Guides' : category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Guides Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
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
                        <div className="mb-2">
                          <span className="bg-aqua-100 text-aqua-800 text-xs px-2 py-1 rounded">
                            {post.category}
                          </span>
                        </div>
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
            ) : (
              <div className="text-center py-12">
                <div className="text-aqua-500 text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No Guides Found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or browse all guides by clearing filters.
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                >
                  View All Guides
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Care Tips Section */}
        <section className="py-12 bg-gradient-to-r from-teal-50 to-aqua-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading text-center mx-auto mb-10">Quick Care Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-teal-600 text-4xl mb-4">💧</div>
                <h3 className="text-xl font-semibold mb-2">Water Parameters</h3>
                <p className="text-gray-600">
                  Maintain a temperature of 72-78°F (22-26°C) and pH between 6.8-7.5 for optimal shrimp health. 
                  Ensure low ammonia and nitrites with regular water testing.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-aqua-600 text-4xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold mb-2">Feeding Guidelines</h3>
                <p className="text-gray-600">
                  Feed your shrimp small amounts once a day. Remove uneaten food after 2 hours to maintain water quality.
                  Rotate between different types of food for balanced nutrition.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-seagreen-600 text-4xl mb-4">🌿</div>
                <h3 className="text-xl font-semibold mb-2">Plant Companions</h3>
                <p className="text-gray-600">
                  Include moss, ferns, and floating plants in your shrimp tank. They provide hiding places, surfaces for biofilm growth, 
                  and help maintain water quality.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Downloadable Resources */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading">Downloadable Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
                <div className="text-aqua-600 text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">Water Parameter Log</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Track your aquarium's water conditions with our easy-to-use parameter log sheet.
                </p>
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
                <div className="text-aqua-600 text-4xl mb-4">🦐</div>
                <h3 className="text-xl font-semibold mb-2">Shrimp Breeding Guide</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Comprehensive guide to successfully breeding Neocaridina shrimps with detailed instructions.
                </p>
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
                <div className="text-aqua-600 text-4xl mb-4">🐠</div>
                <h3 className="text-xl font-semibold mb-2">Guppy Care Cheatsheet</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Quick reference guide for guppy care including feeding, tank setup, and common health issues.
                </p>
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
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

export default CareGuide;
