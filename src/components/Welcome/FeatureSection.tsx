import { ReactElement } from "react";
import { features } from "./FeatureData";
import { ArrowRight } from "lucide-react";

export default function FeatureSection(): ReactElement {
    return (
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                        Features <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Featured</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Everything you need to manage tasks and increase your productivity
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
    )
}