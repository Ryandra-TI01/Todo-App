import { Star, Github, Linkedin, Mail } from "lucide-react";
import { ReactElement } from "react";

export default function AboutSection(): ReactElement {
    return (
        <section className="py-24 px-6 bg-white/5 dark:bg-black/10">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* About */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TaskFlow</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            TaskFlow was born out of the need for a simple yet powerful task management application.
                            We believe that productivity doesn't have to be complicated—with an intuitive interface
                            and a focus on targeted features.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                          Built with modern technologies like React and Tailwind CSS, and equipped with smooth animations, TaskFlow provides a user experience that is both enjoyable and effective.
                        </p>

                        <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">Trusted by 1000+ users</span>
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
                            <a href="https://github.com/Ryandra-TI01 " target="_blank" rel="noopener noreferrer" className="group p-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110">
                                <Github size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                            </a>
                            <a href="https://www.linkedin.com/in/ryandra-athaya-saleh-234161293/" target="_blank" rel="noopener noreferrer" className="group p-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110">
                                <Linkedin size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                            </a>
                            <a href="mailto:ryandra.athaya1705@gmail.com?subject=Pertanyaan%20Website&body=Halo%20Ryandra,%0ASaya%20tertarik%20dengan%20projek%20Anda." target="_blank" rel="noopener noreferrer" className="group p-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110">
                                <Mail size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}