import React, { useState, useEffect } from 'react';
import { Search, ChefHat, Minus, X, Users, Star, Sparkles, Zap } from 'lucide-react';

// Mock data with enhanced structure
const mockDishes = [
  // Main Course - VEG
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Kadhai Paneer ${i + 1}`,
    description: "Paneer cubes in spicy onion gravy with onions and capsicum cubes.",
    image: `https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&auto=format`,
    mealType: "MAIN COURSE",
    type: "VEG",
    price: 299 + (i * 20),
    rating: 4.2 + (Math.random() * 0.8),
    categoryId: 1,
    category: { id: 1, name: "North Indian" },
    ingredients: [
      { name: "Paneer", quantity: "200g" },
      { name: "Onion", quantity: "2 large" },
      { name: "Capsicum", quantity: "1 large" },
      { name: "Tomato Puree", quantity: "1 cup" },
      { name: "Garam Masala", quantity: "1 tsp" }
    ]
  })),
  
  // Main Course - NON-VEG
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 16,
    name: `Tandoori Chicken ${i + 1}`,
    description: "Marinated chicken cooked in traditional tandoor with aromatic spices.",
    image: `https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&auto=format`,
    mealType: "MAIN COURSE",
    type: "NON_VEG",
    price: 399 + (i * 30),
    rating: 4.5 + (Math.random() * 0.5),
    categoryId: 1,
    category: { id: 1, name: "North Indian" },
    ingredients: [
      { name: "Chicken", quantity: "500g" },
      { name: "Yogurt", quantity: "1 cup" },
      { name: "Tandoori Masala", quantity: "2 tbsp" },
      { name: "Ginger-Garlic Paste", quantity: "1 tbsp" }
    ]
  })),

  // Starters - VEG
  ...Array.from({ length: 6 }, (_, i) => ({
    id: i + 24,
    name: `Paneer Tikka ${i + 1}`,
    description: "Grilled cottage cheese cubes marinated in spices and yogurt.",
    image: `https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&auto=format`,
    mealType: "STARTER",
    type: "VEG",
    price: 199 + (i * 15),
    rating: 4.0 + (Math.random() * 1.0),
    categoryId: 2,
    category: { id: 2, name: "Appetizers" },
    ingredients: [
      { name: "Paneer", quantity: "300g" },
      { name: "Yogurt", quantity: "1/2 cup" },
      { name: "Red Chili Powder", quantity: "1 tsp" }
    ]
  })),

  // Starters - NON-VEG
  ...Array.from({ length: 4 }, (_, i) => ({
    id: i + 30,
    name: `Chicken Wings ${i + 1}`,
    description: "Crispy chicken wings tossed in spicy sauce.",
    image: `https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop&auto=format`,
    mealType: "STARTER",
    type: "NON_VEG",
    price: 249 + (i * 25),
    rating: 4.3 + (Math.random() * 0.7),
    categoryId: 2,
    category: { id: 2, name: "Appetizers" },
    ingredients: [
      { name: "Chicken Wings", quantity: "500g" },
      { name: "Hot Sauce", quantity: "3 tbsp" },
      { name: "Butter", quantity: "2 tbsp" }
    ]
  })),

  // Desserts
  ...Array.from({ length: 6 }, (_, i) => ({
    id: i + 34,
    name: `Gulab Jamun ${i + 1}`,
    description: "Soft milk dumplings soaked in cardamom flavored sugar syrup.",
    image: `https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&auto=format`,
    mealType: "DESSERT",
    type: "VEG",
    price: 149 + (i * 10),
    rating: 4.4 + (Math.random() * 0.6),
    categoryId: 3,
    category: { id: 3, name: "Sweets" },
    ingredients: [
      { name: "Milk Powder", quantity: "1 cup" },
      { name: "Sugar", quantity: "2 cups" },
      { name: "Cardamom", quantity: "4 pods" }
    ]
  })),

  // Sides
  ...Array.from({ length: 5 }, (_, i) => ({
    id: i + 40,
    name: `Naan ${i + 1}`,
    description: "Soft leavened bread baked in tandoor, perfect with curries.",
    image: `https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format`,
    mealType: "SIDES",
    type: "VEG",
    price: 79 + (i * 5),
    rating: 4.1 + (Math.random() * 0.9),
    categoryId: 4,
    category: { id: 4, name: "Breads" },
    ingredients: [
      { name: "All Purpose Flour", quantity: "2 cups" },
      { name: "Yogurt", quantity: "1/4 cup" },
      { name: "Baking Powder", quantity: "1/2 tsp" }
    ]
  }))
];

const PartyMenuApp = () => {
  const [selectedCategory, setSelectedCategory] = useState('MAIN COURSE');
  const [searchTerm, setSearchTerm] = useState('');
  const [vegFilter, setVegFilter] = useState({ veg: true, nonVeg: true });
  const [selectedDishes, setSelectedDishes] = useState(new Set());
  const [showIngredients, setShowIngredients] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const categories = ['STARTER', 'MAIN COURSE', 'DESSERT', 'SIDES'];

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredDishes = mockDishes.filter(dish => {
    const matchesCategory = dish.mealType === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVegFilter = (dish.type === 'VEG' && vegFilter.veg) || 
                           (dish.type === 'NON_VEG' && vegFilter.nonVeg);
    
    return matchesCategory && matchesSearch && matchesVegFilter;
  });

  const getCategoryCount = (category) => {
    return mockDishes.filter(dish => 
      dish.mealType === category && 
      selectedDishes.has(dish.id)
    ).length;
  };

  const totalSelectedCount = selectedDishes.size;

  const toggleDishSelection = (dishId) => {
    const newSelected = new Set(selectedDishes);
    if (newSelected.has(dishId)) {
      newSelected.delete(dishId);
    } else {
      newSelected.add(dishId);
    }
    setSelectedDishes(newSelected);
  };

  const getSelectedDishes = () => {
    return mockDishes.filter(dish => selectedDishes.has(dish.id));
  };

  const getCartTotal = () => {
    return getSelectedDishes().reduce((total, dish) => total + dish.price, 0);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px) rotate(${mousePos.x}deg)`
          }}
        />
        <div 
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            transform: `translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px) rotate(${-mousePos.x}deg)`
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-bounce"
          style={{
            transform: `translate(-50%, -50%) translate(${mousePos.x}px, ${mousePos.y}px)`
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header with 3D Effects */}
      <div className="sticky top-0 z-40 backdrop-blur-2xl bg-white/10 shadow-2xl border-b border-white/20">
        <div 
          className="max-w-md mx-auto px-6 py-6 transform transition-all duration-300"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * 0.1}deg) rotateY(${mousePos.x * 0.1}deg)`
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <button className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 backdrop-blur-sm border border-white/10">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
              ✨ Menu
            </h1>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
          </div>

          {/* 3D Search Bar */}
          <div className="relative mb-6 transform hover:scale-105 transition-all duration-300">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Search className="h-5 w-5 text-white/70" />
            </div>
            <input
              type="text"
              placeholder="🔍 Search magical dishes for your party......"
              className="w-full pl-12 pr-6 py-4 border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-400 bg-white/10 backdrop-blur-xl text-white placeholder-white/70 shadow-2xl transition-all duration-300 hover:shadow-orange-500/25 hover:bg-white/15"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* 3D Category Tabs */}
          <div className="flex gap-2 mb-6 p-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
            {categories.map((category, index) => {
              const count = getCategoryCount(category);
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-1 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-500 transform hover:scale-110 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl shadow-orange-500/50 scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/20'
                  }`}
                  style={{
                    transform: isActive 
                      ? `perspective(1000px) rotateX(-10deg) translateZ(20px) scale(1.05)` 
                      : `perspective(1000px) rotateX(0deg) translateZ(0px) scale(1)`,
                    boxShadow: isActive 
                      ? '0 20px 40px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      : '0 4px 8px rgba(0, 0, 0, 0.1)',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex flex-col items-center relative">
                    <span className="text-xs mb-1">{category.split(' ')[0]}</span>
                    {category.includes(' ') && <span className="text-xs mb-1">{category.split(' ')[1]}</span>}
                    {count > 0 && (
                      <span className={`text-xs px-2 py-1 rounded-full animate-bounce ${
                        isActive ? 'bg-white/30' : 'bg-orange-500/80 text-white'
                      }`}>
                        {count}
                      </span>
                    )}
                    {isActive && <Star className="w-3 h-3 absolute -top-2 -right-2 text-yellow-300 animate-spin" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3D Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-sm">
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="font-bold text-white/90 drop-shadow-md">
                {selectedCategory.charAt(0) + selectedCategory.slice(1).toLowerCase()} Selected ({getCategoryCount(selectedCategory)})
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setVegFilter(prev => ({ ...prev, veg: !prev.veg }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 transform hover:scale-110 hover:rotate-3 ${
                  vegFilter.veg
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl shadow-green-500/50'
                    : 'bg-white/20 text-white/70 backdrop-blur-sm border border-white/20'
                }`}
                style={{
                  boxShadow: vegFilter.veg 
                    ? '0 8px 25px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className={`w-3 h-3 rounded-full animate-pulse ${vegFilter.veg ? 'bg-white' : 'bg-green-400'}`} />
                🌱 Veg
              </button>
              <button
                onClick={() => setVegFilter(prev => ({ ...prev, nonVeg: !prev.nonVeg }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 transform hover:scale-110 hover:rotate-3 ${
                  vegFilter.nonVeg
                    ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-2xl shadow-red-500/50'
                    : 'bg-white/20 text-white/70 backdrop-blur-sm border border-white/20'
                }`}
                style={{
                  boxShadow: vegFilter.nonVeg 
                    ? '0 8px 25px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className={`w-3 h-3 rounded-full animate-pulse ${vegFilter.nonVeg ? 'bg-white' : 'bg-red-400'}`} />
                🍖 Non-Veg
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Dish List */}
      <div className="max-w-md mx-auto px-6 pb-32">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-2xl animate-pulse">
            ✨ {mockDishes.find(d => d.mealType === selectedCategory)?.category.name || 'Magical Dishes'} ✨
          </h2>
          <p className="text-white/70">Hover to Select</p>
        </div>

        <div className="space-y-8">
          {filteredDishes.map((dish, index) => {
            const isSelected = selectedDishes.has(dish.id);
            return (
              <div
                key={dish.id}
                className={`group relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 ${
                  isSelected ? 'ring-4 ring-orange-400 shadow-orange-400/50' : 'hover:ring-2 hover:ring-white/30'
                }`}
                style={{
                  transform: `perspective(1000px) rotateX(${Math.sin(index * 0.5) * 2}deg)`,
                  boxShadow: isSelected 
                    ? '0 25px 50px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    : '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Magical Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                
                {/* Floating Stars */}
                {isSelected && (
                  <>
                    <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin" />
                    <Star className="absolute -bottom-2 -left-2 w-4 h-4 text-orange-400 animate-bounce" />
                  </>
                )}

                <div className="relative flex p-6">
                  <div className="flex-1 z-10">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-white text-lg drop-shadow-lg group-hover:text-orange-300 transition-colors duration-300">
                        {dish.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full animate-pulse ${
                          dish.type === 'VEG' ? 'bg-green-400 shadow-green-400/50' : 'bg-red-400 shadow-red-400/50'
                        }`} style={{ boxShadow: `0 0 10px currentColor` }} />
                        <div className="flex items-center gap-1 bg-yellow-400/90 text-black px-2 py-1 rounded-full text-xs font-bold">
                          <Star className="w-3 h-3" />
                          {dish.rating.toFixed(1)}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-white/80 mb-4 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                      {dish.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-orange-400 drop-shadow-lg animate-pulse">
                        ₹{dish.price}
                      </span>
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Users className="w-4 h-4" />
                        <span>2-3 servings</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowIngredients(dish)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm rounded-xl font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/20"
                        style={{
                          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        🧄 Ingredients
                      </button>
                      <button
                        onClick={() => toggleDishSelection(dish.id)}
                        className={`px-6 py-2 text-sm rounded-xl font-bold transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 ${
                          isSelected
                            ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 animate-pulse'
                            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70'
                        }`}
                        style={{
                          boxShadow: isSelected 
                            ? '0 8px 25px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                            : '0 8px 25px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {isSelected ? '✨ Remove' : '⚡ Add '}
                      </button>
                    </div>
                  </div>
                  
                  <div className="ml-6 relative">
                    <div 
                      className="w-28 h-28 rounded-2xl bg-cover bg-center shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6"
                      style={{ 
                        backgroundImage: `url(${dish.image})`,
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    />
                    {/* Image Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/30 to-red-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-indigo-900/90 shadow-2xl border-t border-white/20">
        <div 
          className="max-w-md mx-auto p-6 transform transition-all duration-300"
          style={{
            transform: `perspective(1000px) rotateX(${-mousePos.y * 0.05}deg)`
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white drop-shadow-lg">Total Dishes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-3xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                {totalSelectedCount}
              </span>
              <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
            </div>
          </div>
          <button 
            onClick={() => setShowCart(true)}
            className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20 relative overflow-hidden"
            disabled={totalSelectedCount === 0}
            style={{
              boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            ✨ Continue to Cart ✨
          </button>
        </div>
      </div>

      {/* 3D Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end justify-center p-0 z-50">
          <div 
            className="bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-2xl rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl border-t-4 border-orange-400 transform transition-all duration-700 animate-slide-up"
            style={{
              boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Cart Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-800/90 to-blue-800/90 backdrop-blur-xl border-b border-white/20 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ChefHat className="w-6 h-6 text-orange-400 animate-bounce" />
                  <h2 className="text-xl font-bold text-white drop-shadow-lg">Your Cart</h2>
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 backdrop-blur-sm border border-white/10"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-white/80 font-medium">
                  ✨ {totalSelectedCount} Items selected
                </span>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                  ₹{getCartTotal()}
                </span>
              </div>
            </div>
            
            {/* Cart Content */}
            <div className="overflow-y-auto max-h-[60vh] px-6 py-6">
              {getSelectedDishes().length === 0 ? (
                <div className="text-center py-12">
                  <div className="relative">
                    <ChefHat className="w-20 h-20 text-white/30 mx-auto mb-4 animate-bounce" />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                      <Sparkles className="w-8 h-8 text-yellow-400/50 animate-ping" />
                    </div>
                  </div>
                  <p className="text-white/70 text-lg">Your cart awaits...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {categories.map(category => {
                    const categoryDishes = getSelectedDishes().filter(dish => dish.mealType === category);
                    if (categoryDishes.length === 0) return null;
                    
                    return (
                      <div key={category} className="mb-8">
                        <h3 className="font-bold text-white mb-4 pb-3 border-b border-white/20 flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 animate-spin" />
                          {category} ({categoryDishes.length})
                          <div className="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent" />
                        </h3>
                        <div className="space-y-4">
                          {categoryDishes.map((dish, index) => (
                            <div 
                              key={dish.id} 
                              className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                              style={{
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                animationDelay: `${index * 100}ms`
                              }}
                            >
                              <div 
                                className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0 shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                                style={{ 
                                  backgroundImage: `url(${dish.image})`,
                                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-white text-sm truncate drop-shadow-md">
                                  {dish.name}
                                </h4>
                                <div className="flex items-center gap-3 mt-2">
                                  <div className={`w-3 h-3 rounded-full animate-pulse ${
                                    dish.type === 'VEG' ? 'bg-green-400 shadow-green-400/50' : 'bg-red-400 shadow-red-400/50'
                                  }`} />
                                  <span className="text-orange-400 font-bold text-sm">₹{dish.price}</span>
                                  <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-full">
                                    <Star className="w-3 h-3 text-yellow-400" />
                                    <span className="text-xs text-white font-medium">{dish.rating.toFixed(1)}</span>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => toggleDishSelection(dish.id)}
                                className="p-3 text-red-400 hover:bg-red-500/20 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 backdrop-blur-sm border border-red-400/20"
                              >
                                <Minus className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {getSelectedDishes().length > 0 && (
              <div className="sticky bottom-0 bg-gradient-to-r from-purple-800/95 to-blue-800/95 backdrop-blur-xl border-t border-white/20 p-6 space-y-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-white drop-shadow-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                    Total Amount:
                  </span>
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse text-2xl">
                    ₹{getCartTotal()}
                  </span>
                </div>
                <button 
                  className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm border border-white/20 relative overflow-hidden"
                  style={{
                    boxShadow: '0 15px 35px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                   Place Order 
                </button>
                <button 
                  onClick={() => setShowCart(false)}
                  className="w-full bg-white/10 backdrop-blur-xl text-white py-3 rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
                >
                   Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3D Ingredients Modal */}
      {showIngredients && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div 
            className="bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-2xl rounded-3xl max-w-sm w-full max-h-[80vh] overflow-hidden shadow-2xl border-2 border-orange-400/50 transform transition-all duration-700 animate-bounce-in"
            style={{
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transform: 'perspective(1000px) rotateY(5deg) rotateX(-5deg)'
            }}
          >
            {/* Ingredients Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-800/90 to-blue-800/90 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-orange-400 animate-bounce" />
                <h2 className="text-lg font-bold text-white drop-shadow-lg"> Recipe</h2>
                <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
              </div>
              <button
                onClick={() => setShowIngredients(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 backdrop-blur-sm border border-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Ingredients Content */}
            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <div 
                  className="w-24 h-24 rounded-2xl bg-cover bg-center shadow-2xl flex-shrink-0 transition-all duration-500 transform hover:scale-110 hover:rotate-6"
                  style={{ 
                    backgroundImage: `url(${showIngredients.image})`,
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-2 drop-shadow-lg text-lg">
                    {showIngredients.name}
                  </h3>
                  <p className="text-white/80 mb-3 text-sm leading-relaxed">
                    {showIngredients.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                      <Users className="w-3 h-3 text-white/70" />
                      <span className="text-xs text-white/90 font-medium">For 2 people</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full animate-pulse ${
                      showIngredients.type === 'VEG' ? 'bg-green-400 shadow-green-400/50' : 'bg-red-400 shadow-red-400/50'
                    }`} />
                    <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-white font-medium">{showIngredients.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                Magical Ingredients
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {showIngredients.ingredients.map((ingredient, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center py-3 px-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                    style={{
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <span className="text-white/90 font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      {ingredient.name}
                    </span>
                    <span className="text-orange-400 font-bold bg-orange-400/20 px-2 py-1 rounded-lg">
                      {ingredient.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) rotate(5deg);
          }
          70% {
            transform: scale(0.9) rotate(-2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes slide-up {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  );
};

export default PartyMenuApp;
