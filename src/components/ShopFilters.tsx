
import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
  categories: string[];
  colors: string[];
}

const ShopFilters = ({ onFilterChange, categories, colors }: FiltersProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
        
      updateFilters({ ...filters, categories: newCategories });
      return newCategories;
    });
  };
  
  const handleColorChange = (color: string) => {
    setSelectedColors(prev => {
      const newColors = prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color];
        
      updateFilters({ ...filters, colors: newColors });
      return newColors;
    });
  };
  
  const handlePriceChange = (value: number[]) => {
    const newPriceRange: [number, number] = [value[0], value[1]];
    setPriceRange(newPriceRange);
    updateFilters({ ...filters, priceRange: newPriceRange });
  };
  
  const filters = {
    categories: selectedCategories,
    colors: selectedColors,
    priceRange,
  };
  
  const updateFilters = (newFilters: any) => {
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange([0, 100]);
    updateFilters({
      categories: [],
      colors: [],
      priceRange: [0, 100],
    });
  };
  
  const DesktopFilters = () => (
    <div className="hidden md:block w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
          Clear All
        </Button>
      </div>
      
      <Accordion type="single" collapsible defaultValue="category" className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map(color => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={selectedColors.includes(color)}
                    onCheckedChange={() => handleColorChange(color)}
                  />
                  <label
                    htmlFor={`color-${color}`}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-2">
              <Slider
                defaultValue={priceRange}
                max={100}
                step={1}
                onValueChange={handlePriceChange}
                className="my-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
  
  const MobileFilters = () => (
    <div className="md:hidden">
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-md">
          <SheetHeader>
            <SheetTitle className="flex justify-between items-center">
              <span>Filters</span>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                Clear All
              </Button>
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-base font-medium">Category</h3>
              <div className="mt-2 space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={`mobile-category-${category}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-medium">Color</h3>
              <div className="mt-2 space-y-2">
                {colors.map(color => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => handleColorChange(color)}
                    />
                    <label
                      htmlFor={`mobile-color-${color}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-medium">Price Range</h3>
              <div className="mt-4 px-2">
                <Slider
                  defaultValue={priceRange}
                  max={100}
                  step={1}
                  onValueChange={handlePriceChange}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              onClick={() => setMobileFiltersOpen(false)} 
              className="w-full"
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
  
  return (
    <div>
      <MobileFilters />
      <DesktopFilters />
    </div>
  );
};

export default ShopFilters;
