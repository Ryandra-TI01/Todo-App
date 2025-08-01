import { useState, useEffect } from "react";
import { CheckSquare, Calendar, BarChart3, Moon, Zap, ArrowRight, Star, Github, Linkedin, Mail } from "lucide-react";
import HeroSection from "../components/Welcome/HeroSection";

export default function WelcomePage() {
  const [ currentFeature, setCurrentFeature] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const features = [
    {
      icon: CheckSquare,
      title: "Todo List",
      description: "Buat, ubah, dan centang tugas kamu dengan cepat dan mudah",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Calendar,
      title: "Calendar",
      description: "Lihat semua task kamu secara visual dalam tampilan kalender",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Lihat progres tugas yang selesai dan waktu yang kamu habiskan",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Moon,
      title: "Dark Mode",
      description: "Mode gelap agar nyaman dipakai malam hari atau low-light",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Smart UX",
      description: "UI yang simpel, cepat, dan intuitif (React + Tailwind + Animasi)",
      color: "from-orange-500 to-red-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
        {/* Hero Section */}
        <HeroSection/>

        {/* Feature Preview Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Fitur-Fitur <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Unggulan</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Semua yang kamu butuhkan untuk mengelola tugas dan meningkatkan produktivitas dalam satu aplikasi
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={28} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight size={20} className="text-blue-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section + Developer Info */}
        <section className="py-24 px-6 bg-white/5 dark:bg-black/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* About */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                  Tentang <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TaskFlow</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  TaskFlow lahir dari kebutuhan akan aplikasi manajemen tugas yang simpel namun powerful. 
                  Kami percaya bahwa produktivitas tidak harus rumit - dengan interface yang intuitif 
                  dan fitur-fitur yang tepat sasaran.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Dibangun dengan teknologi modern seperti React, Tailwind CSS, dan dilengkapi dengan 
                  animasi yang smooth, TaskFlow memberikan pengalaman pengguna yang menyenangkan 
                  sekaligus efektif.
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">Dipercaya 1000+ pengguna</span>
                </div>
              </div>

              {/* Developer Info */}
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">👨‍💻</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Developer Info
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">Full Stack Developer</p>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed">
                  Passionate about creating beautiful and functional web applications. 
                  Specializing in React, Node.js, and modern web technologies.
                </p>

                <div className="flex justify-center space-x-4">
                  <a href="#" className="group p-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110">
                    <Github size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </a>
                  <a href="#" className="group p-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110">
                    <Linkedin size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </a>
                  <a href="#" className="group p-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110">
                    <Mail size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action Section */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Siap untuk mulai
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  produktif hari ini?
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Bergabunglah dengan ribuan pengguna yang sudah merasakan kemudahan mengelola tugas dengan TaskFlow. 
                Gratis untuk memulai, upgrade kapan saja.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="group relative px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></span>
                  <span className="relative flex items-center space-x-3">
                    <span>Mulai Gratis Sekarang</span>
                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ✨ Tidak perlu kartu kredit • Setup dalam 30 detik
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-2">
                  <CheckSquare size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">100% Gratis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckSquare size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Data Aman</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckSquare size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>        
    </>
  );
}
