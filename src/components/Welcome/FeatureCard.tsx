import { ReactElement } from "react";
import { features } from "./FeatureData";
import { useFeatureRotation } from "../../hooks/useFeatureRotation";

export default function FeatureCard(): ReactElement {
    const { visibleFeatures } = useFeatureRotation(features);
    return (
        <div className="relative">
            <div className="flex justify-center items-center space-x-8">
                {visibleFeatures.map((feature, index) => (
                    <div
                        key={index}
                        className={`transform transition-all duration-500 ${index === 1 ? 'scale-110 z-10' : 'scale-90 opacity-70'
                            }`}
                    >
                        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-48 hover:scale-105 transition-all duration-300">
                            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                                <feature.icon size={24} className="text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}