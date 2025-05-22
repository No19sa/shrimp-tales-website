
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gradient-to-r from-aqua-700 to-teal-700 py-10 md:py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg text-aqua-50">
                Have questions about our shrimp, guppies, or other products? Need advice on aquatic pet care?
                We're here to help! Get in touch with our team of experts.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form & Info */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-5 gap-8">
              {/* Contact Info */}
              <div className="md:col-span-2 bg-gradient-to-br from-aqua-600 to-teal-600 text-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="h-5 w-5 text-aqua-200" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-aqua-100">Email</p>
                      <a href="mailto:info@aquashrimp.com" className="hover:underline">
                        info@aquashrimp.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Phone className="h-5 w-5 text-aqua-200" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-aqua-100">Phone</p>
                      <a href="tel:+1-234-567-8900" className="hover:underline">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>
                  
                  <div className="border-t border-aqua-500 pt-6 mt-6">
                    <p className="text-sm font-medium text-aqua-100 mb-3">Follow Us</p>
                    <div className="flex space-x-4">
                      <a href="#" className="hover:text-aqua-200 transition-colors">
                        <Instagram size={24} />
                      </a>
                      <a href="#" className="hover:text-aqua-200 transition-colors">
                        <Facebook size={24} />
                      </a>
                    </div>
                  </div>
                  
                  <div className="border-t border-aqua-500 pt-6 mt-6">
                    <p className="text-sm font-medium text-aqua-100 mb-3">Business Hours</p>
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt>Monday - Friday:</dt>
                        <dd>9:00 AM - 5:00 PM</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Saturday:</dt>
                        <dd>10:00 AM - 3:00 PM</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Sunday:</dt>
                        <dd>Closed</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-aqua-100">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-3">
                <h2 className="section-heading mb-8">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone (Optional)
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 bg-gradient-to-r from-aqua-50 to-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading mb-8">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-aqua-800 mb-2">
                  Do you ship internationally?
                </h3>
                <p className="text-gray-600">
                  Currently, we only ship within the continental United States. We're working on expanding our shipping
                  options to more locations in the future.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-aqua-800 mb-2">
                  What's your live arrival guarantee?
                </h3>
                <p className="text-gray-600">
                  We guarantee live arrival of all our shrimp and fish. If any arrive DOA (dead on arrival), please take photos
                  within 2 hours of delivery and contact us for a replacement or refund.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-aqua-800 mb-2">
                  Can I pick up my order locally?
                </h3>
                <p className="text-gray-600">
                  Yes! Local pickup is available at our facility for customers in the area. Select "Local Pickup" at checkout
                  and we'll contact you to arrange a convenient time.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-aqua-800 mb-2">
                  Do you offer bulk discounts?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer discounts on bulk orders for shrimp and fish. Please contact us with your requirements for a
                  custom quote based on quantity and shipping destination.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
