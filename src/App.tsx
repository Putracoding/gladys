/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import { Fish, Info, Droplets, Waves, ShieldCheck, Heart, Sparkles, ChevronRight, Menu, X } from 'lucide-react';

// --- Types ---
interface FishData {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  type: 'Tropical' | 'Coldwater' | 'Brackish';
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  temp: string;
}

// --- Data ---
const FISH_DATABASE: FishData[] = [
  {
    id: 'betta',
    name: 'Betta Fish',
    scientificName: 'Betta splendens',
    description: 'Known for their vibrant colors and long, flowing fins. They are spirited and distinct.',
    imageUrl: 'https://images.unsplash.com/photo-1522060290453-344446984e93?auto=format&fit=crop&q=80&w=800',
    type: 'Tropical',
    difficulty: 'Beginner',
    temp: '24-28°C'
  },
  {
    id: 'discus',
    name: 'Discus Fish',
    scientificName: 'Symphysodon',
    description: 'The king of the aquarium. Majestic, circular shape with incredible neon patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
    type: 'Tropical',
    difficulty: 'Expert',
    temp: '28-31°C'
  },
  {
    id: 'goldfish',
    name: 'Oranda Goldfish',
    scientificName: 'Carassius auratus',
    description: 'Characterized by a prominent hood on its head. A classic choice for coldwater tanks.',
    imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=800',
    type: 'Coldwater',
    difficulty: 'Intermediate',
    temp: '18-22°C'
  },
  {
    id: 'arowana',
    name: 'Asian Arowana',
    scientificName: 'Scleropages formosus',
    description: 'Believed to bring luck and prosperity. A majestic predator with powerful scales.',
    imageUrl: 'https://images.unsplash.com/photo-1625121232454-d82098679f18?auto=format&fit=crop&q=80&w=800',
    type: 'Tropical',
    difficulty: 'Expert',
    temp: '24-30°C'
  },
  {
    id: 'neontetra',
    name: 'Neon Tetra',
    scientificName: 'Paracheirodon innesi',
    description: 'Small, peaceful, and stunning in groups. Their blue and red stripes glow in the light.',
    imageUrl: 'https://images.unsplash.com/photo-1524388371099-23133502845c?auto=format&fit=crop&q=80&w=800',
    type: 'Tropical',
    difficulty: 'Beginner',
    temp: '21-27°C'
  },
  {
    id: 'guppy',
    name: 'Fancy Guppy',
    scientificName: 'Poecilia reticulata',
    description: 'Active and incredibly diverse in color. Perfect for community aquariums.',
    imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=800',
    type: 'Tropical',
    difficulty: 'Beginner',
    temp: '22-28°C'
  }
];

// --- Sub-components ---

const Bubble = ({ style }: { style: any }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 0.4, 0],
      x: [0, Math.random() * 20 - 10, 0]
    }}
    transition={{ 
      duration: Math.random() * 10 + 10, 
      repeat: Infinity, 
      ease: "linear",
      delay: Math.random() * 5
    }}
    className="absolute bg-white/20 rounded-full blur-[1px]"
    style={style}
  />
);

const FloatingFish = ({ delay = 0, size = "w-24" }: { delay?: number, size?: string }) => (
  <motion.div
    initial={{ x: '-20%', y: '40%' }}
    animate={{ 
      x: ['-20%', '120%'],
      y: ['40%', '45%', '35%', '42%']
    }}
    transition={{ 
      duration: 25, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
    className={`absolute pointer-events-none z-10 ${size}`}
  >
    <img 
      src="https://images.unsplash.com/photo-1522060290453-344446984e93?auto=format&fit=crop&q=80&w=200" 
      alt="Swimming fish silhouette"
      className="opacity-40 grayscale brightness-200"
      referrerPolicy="no-referrer"
    />
  </motion.div>
);

export default function App() {
  const [selectedFish, setSelectedFish] = useState<FishData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const bubbles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => (
      <Bubble 
        key={i} 
        style={{ 
          left: `${Math.random() * 100}%`, 
          width: `${Math.random() * 10 + 5}px`, 
          height: `${Math.random() * 10 + 5}px` 
        }} 
      />
    ));
  }, []);

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0c2a4d_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,#0a1e36_0%,transparent_50%)]" />
        {bubbles}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md bg-[#050b14]/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
              <Fish className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">FISH IT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-cyan-400 transition-colors">Aquarium</a>
            <a href="#explore" className="hover:text-cyan-400 transition-colors">Explore</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Care Guide</a>
            <button className="bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-full border border-cyan-500/20 hover:bg-cyan-500/20 transition-all">
              Join Club
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-20">
        
        {/* Hero Section */}
        <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          <FloatingFish delay={0} size="w-32" />
          <FloatingFish delay={12} size="w-24" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="z-20 relative"
          >
            <h1 className="text-[12vw] md:text-[10rem] font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-cyan-500/50 uppercase">
              FISH IT
            </h1>
            <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Dive into the serene world of ornamental fish. Explore vibrant species, 
              learn essential care techniques, and build your digital sanctuary.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#explore"
                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
              >
                Start Exploring <ChevronRight className="w-4 h-4" />
              </a>
              <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/5 transition-all">
                Virtual Aquarium
              </button>
            </div>
          </motion.div>

          <div className="absolute bottom-10 animate-bounce text-slate-500">
            <Waves className="w-6 h-6" />
          </div>
        </section>

        {/* Explore Section */}
        <section id="explore" className="max-w-7xl mx-auto px-6 py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">The Collections</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Ornamental <br /> 
                <span className="italic font-serif text-cyan-500/80">Masterpieces</span>
              </h2>
            </div>
            <p className="max-w-md text-slate-400 text-lg leading-relaxed">
              Curated selection of the most beautiful and sought-after fish species from around the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {FISH_DATABASE.map((fish, index) => (
              <motion.div
                key={fish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedFish(fish)}
                className="group relative cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 border border-white/5">
                  <img 
                    src={fish.imageUrl} 
                    alt={fish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/10 backdrop-blur-sm tracking-widest ${
                      fish.difficulty === 'Beginner' ? 'text-green-400' : 
                      fish.difficulty === 'Intermediate' ? 'text-orange-400' : 'text-rose-400'
                    }`}>
                      {fish.difficulty}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 backdrop-blur-sm tracking-widest">
                      {fish.type}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {fish.name}
                  </h3>
                  <p className="text-slate-400 text-sm italic font-serif">
                    {fish.scientificName}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature Grid / Aquarium Stats */}
        <section className="bg-white/[0.02] border-y border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-xl font-bold text-white uppercase tracking-wider">Water Quality</h4>
              <p className="text-slate-400 leading-relaxed">
                Maintain crystal clear water with our advanced filtration systems and weekly testing protocols.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-lime-500/10 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-lime-400" />
              </div>
              <h4 className="text-xl font-bold text-white uppercase tracking-wider">Fish Wellness</h4>
              <p className="text-slate-400 leading-relaxed">
                Expert advice on nutrition, disease prevention, and creating a stress-free environment.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold text-white uppercase tracking-wider">Vibrant Colors</h4>
              <p className="text-slate-400 leading-relaxed">
                Discover the lighting and diet secrets to enhance the natural glow and patterns of your fish.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-40 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-16 rounded-[4rem] bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-cyan-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Waves className="w-40 h-40" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Ready to start your <br /> aquarium journey?
            </h2>
            <p className="text-xl text-slate-300 max-w-xl mx-auto mb-12 font-light">
              Join thousands of hobbyists and get weekly tips, rare fish alerts, and community support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="relative w-full sm:w-96">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-[#050b14] border border-white/20 rounded-full py-4 px-8 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <button className="w-full sm:w-auto px-12 py-4 bg-cyan-500 text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-cyan-400 transition-colors">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 bg-[#02050a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <Fish className="w-8 h-8 text-cyan-400" />
                <span className="text-2xl font-bold tracking-tight text-white uppercase">FISH IT</span>
              </div>
              <p className="text-slate-400 max-w-sm text-lg font-light leading-relaxed">
                Dedicated to the beauty and sustainability of the ornamental fish trade. 
                Creating digital bridges to nature's underwater wonders.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Explore</h5>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Aquarium Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fish Database</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Plant Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Equipment</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Community</h5>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Club Membership</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 gap-6">
            <p className="text-slate-600 text-xs uppercase tracking-widest font-bold">
              © 2026 FISH IT. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-8 text-slate-600 text-xs uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Fish Detail Modal */}
      <AnimatePresence>
        {selectedFish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedFish(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0c1421] w-full max-w-4xl rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 aspect-square md:aspect-auto">
                  <img 
                    src={selectedFish.imageUrl} 
                    alt={selectedFish.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="md:w-1/2 p-10 md:p-14 relative">
                  <button 
                    onClick={() => setSelectedFish(null)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  
                  <span className="text-cyan-400 text-[10px] uppercase font-bold tracking-[0.3em] mb-4 block">Species Detail</span>
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedFish.name}</h2>
                  <p className="text-lg italic font-serif text-slate-400 mb-8">{selectedFish.scientificName}</p>
                  
                  <p className="text-slate-300 leading-relaxed mb-10 text-lg font-light">
                    {selectedFish.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Temperature</span>
                      <span className="text-white font-medium">{selectedFish.temp}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Diet</span>
                      <span className="text-white font-medium">Omnivore</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Difficulty</span>
                      <span className="text-white font-medium">{selectedFish.difficulty}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Water Type</span>
                      <span className="text-white font-medium">{selectedFish.type}</span>
                    </div>
                  </div>

                  <div className="mt-10 flex gap-4">
                    <button className="flex-1 bg-cyan-500 text-black font-bold uppercase tracking-widest text-xs py-4 rounded-full hover:bg-cyan-400 transition-colors">
                      Care Guide
                    </button>
                    <button className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-rose-400">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
