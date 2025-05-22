
// Mock data for the shrimp breeding business website

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number;
  rating: number;
  category: string;
  color: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  stock: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image?: string;
  rating: number;
  date: string;
  text: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

// Product data
export const products: Product[] = [
  {
    id: "neocaridina-red-cherry",
    name: "Red Cherry Shrimp",
    description: "Vibrant red Neocaridina shrimp that add beautiful color to any freshwater aquarium. Perfect for beginners and experienced hobbyists alike.",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=1000&auto=format&fit=crop",
    price: 19.99,
    rating: 4.8,
    category: "shrimp",
    color: "red",
    isFeatured: true,
    stock: 50
  },
  {
    id: "neocaridina-blue-dream",
    name: "Blue Dream Shrimp",
    description: "Stunning blue Neocaridina variety that stands out in planted aquariums. Hardy and easy to care for.",
    image: "https://images.unsplash.com/photo-1520302519449-e78a1c3ad89f?q=80&w=1000&auto=format&fit=crop",
    price: 24.99,
    rating: 4.7,
    category: "shrimp",
    color: "blue",
    isFeatured: true,
    stock: 35
  },
  {
    id: "neocaridina-yellow",
    name: "Yellow Shrimp",
    description: "Bright yellow Neocaridina shrimp that provide a stunning contrast in planted tanks.",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=1000&auto=format&fit=crop",
    price: 22.99,
    rating: 4.5,
    category: "shrimp",
    color: "yellow",
    stock: 40
  },
  {
    id: "neocaridina-chocolate",
    name: "Chocolate Shrimp",
    description: "Unique brown coloration that adds a natural look to your aquarium.",
    image: "https://images.unsplash.com/photo-1602016736566-7b8b439b1bbc?q=80&w=1000&auto=format&fit=crop",
    price: 21.99,
    discountPrice: 18.99,
    rating: 4.3,
    category: "shrimp",
    color: "brown",
    stock: 25
  },
  {
    id: "fancy-guppy-mix",
    name: "Fancy Guppy Mix",
    description: "Colorful assortment of male and female fancy guppies with varied tail patterns.",
    image: "https://images.unsplash.com/photo-1520361537784-aaf10c8e47b2?q=80&w=1000&auto=format&fit=crop",
    price: 15.99,
    rating: 4.6,
    category: "fish",
    color: "multicolor",
    stock: 30
  },
  {
    id: "blue-moscow-guppy",
    name: "Blue Moscow Guppy",
    description: "Striking blue guppies with distinctive markings and flowing tails.",
    image: "https://images.unsplash.com/photo-1513039235271-5937eefe2959?q=80&w=1000&auto=format&fit=crop",
    price: 18.99,
    rating: 4.4,
    category: "fish",
    color: "blue",
    isNewArrival: true,
    stock: 20
  },
  {
    id: "premium-shrimp-food",
    name: "Premium Shrimp Food",
    description: "High-quality plant-based food specifically formulated for optimal shrimp health and coloration.",
    image: "https://images.unsplash.com/photo-1616981062334-3ec3f4c8a4a1?q=80&w=1000&auto=format&fit=crop",
    price: 12.99,
    discountPrice: 9.99,
    rating: 4.9,
    category: "food",
    color: "brown",
    isFeatured: true,
    stock: 100
  },
  {
    id: "algae-wafers",
    name: "Algae Wafers",
    description: "Nutrient-rich algae wafers that sink quickly for bottom-feeding shrimp and fish.",
    image: "https://images.unsplash.com/photo-1595196095369-0f3ff893566e?q=80&w=1000&auto=format&fit=crop",
    price: 8.99,
    rating: 4.5,
    category: "food",
    color: "green",
    stock: 85
  },
  {
    id: "water-conditioner",
    name: "Shrimp-Safe Water Conditioner",
    description: "Specially formulated water conditioner that's safe for sensitive invertebrates.",
    image: "https://images.unsplash.com/photo-1600880144244-8e4a26025225?q=80&w=1000&auto=format&fit=crop",
    price: 14.99,
    rating: 4.7,
    category: "care",
    color: "blue",
    stock: 45
  },
  {
    id: "beginner-shrimp-kit",
    name: "Beginner Shrimp Kit",
    description: "Complete starter package with 10 Red Cherry Shrimp, food, and water conditioner.",
    image: "https://images.unsplash.com/photo-1613919738919-eaf1a1fd3caf?q=80&w=1000&auto=format&fit=crop",
    price: 49.99,
    discountPrice: 44.99,
    rating: 4.8,
    category: "combo",
    color: "red",
    isFeatured: true,
    stock: 15
  },
  {
    id: "guppy-breeding-pair",
    name: "Guppy Breeding Pair",
    description: "Selected male and female guppies for breeding, with genetics for vibrant offspring.",
    image: "https://images.unsplash.com/photo-1524317833664-043d2eed7bcc?q=80&w=1000&auto=format&fit=crop",
    price: 29.99,
    rating: 4.6,
    category: "fish",
    color: "multicolor",
    isNewArrival: true,
    stock: 10
  },
  {
    id: "crystal-red-shrimp",
    name: "Crystal Red Shrimp",
    description: "Premium grade Crystal Red Shrimp with striking white and red patterns.",
    image: "https://images.unsplash.com/photo-1580551032600-c00f1936d76c?q=80&w=1000&auto=format&fit=crop",
    price: 34.99,
    rating: 4.9,
    category: "shrimp",
    color: "red",
    isNewArrival: true,
    stock: 20
  }
];

// Testimonial data
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Miami, FL",
    rating: 5,
    date: "May 15, 2023",
    text: "The Red Cherry Shrimp I ordered were incredibly vibrant and healthy. They arrived well-packaged with no casualties. My aquarium has never looked better!"
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "Seattle, WA",
    rating: 5,
    date: "March 8, 2023",
    text: "As a beginner in the hobby, the Starter Kit was perfect. The care guide included was comprehensive and the shrimp are thriving in my tank. Highly recommended!"
  },
  {
    id: "3",
    name: "Amanda Rodriguez",
    location: "Austin, TX",
    rating: 4,
    date: "April 22, 2023",
    text: "Great quality Blue Dream Shrimp! Their customer service was also excellent when I had questions about maintaining proper water parameters."
  },
  {
    id: "4",
    name: "David Wilson",
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    rating: 5,
    date: "February 10, 2023",
    text: "The guppies I purchased are healthy and have beautiful coloration. They've already started breeding! Definitely will order from here again."
  }
];

// Blog post data
export const blogPosts: BlogPost[] = [
  {
    id: "beginner-guide",
    title: "Beginner's Guide to Keeping Neocaridina Shrimp",
    excerpt: "Everything you need to know to start keeping colorful Neocaridina shrimp in your aquarium.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquam nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquam nunc, quis aliquam nisl nunc quis nisl.",
    image: "https://images.unsplash.com/photo-1546845776-dcdf7c3ceca0?q=80&w=1000&auto=format&fit=crop",
    date: "January 15, 2023",
    author: "Aqua Experts Team",
    category: "Beginners Guide"
  },
  {
    id: "water-parameters",
    title: "Perfect Water Parameters for Healthy Shrimp",
    excerpt: "Learn how to maintain ideal water conditions for thriving shrimp colonies.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquam nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquam nunc, quis aliquam nisl nunc quis nisl.",
    image: "https://images.unsplash.com/photo-1519163219899-21d2bb723b3e?q=80&w=1000&auto=format&fit=crop",
    date: "February 22, 2023",
    author: "Dr. Robert Chen",
    category: "Water Chemistry"
  },
  {
    id: "breeding-tips",
    title: "Successful Guppy Breeding: Tips and Tricks",
    excerpt: "Maximize your success with breeding colorful guppies with these expert tips.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquam nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquam nunc, quis aliquam nisl nunc quis nisl.",
    image: "https://images.unsplash.com/photo-1606396925122-befdad85b507?q=80&w=1000&auto=format&fit=crop",
    date: "March 10, 2023",
    author: "Maria Sanchez",
    category: "Breeding"
  },
  {
    id: "planted-tanks",
    title: "Creating the Perfect Planted Tank for Shrimp",
    excerpt: "Design a beautiful planted aquarium that provides the ideal habitat for shrimp.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquam nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquam nunc, quis aliquam nisl nunc quis nisl.",
    image: "https://images.unsplash.com/photo-1628436174535-33456c7e0c0d?q=80&w=1000&auto=format&fit=crop",
    date: "April 5, 2023",
    author: "James Wong",
    category: "Aquascaping"
  }
];

// Filter categories and colors
export const productCategories = ["shrimp", "fish", "food", "care", "combo"];
export const productColors = ["red", "blue", "yellow", "brown", "green", "multicolor"];

