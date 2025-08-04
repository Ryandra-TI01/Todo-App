import { ArrowRight, CheckSquare } from "lucide-react";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/Route";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalProvider";
import ModalAuth from "../Auth/ModalAuth";

export default function CtaSection(): ReactElement {
    const { user } = useAuth();
    const { openModal } = useModal();

    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                        Ready to start
                        <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Productive Today?
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of users who have already experienced the ease of task management with TaskFlow. It's free to get started, upgrade anytime.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        {user ? (
                            <Link to={ROUTES.TASKS}>
                                <button className="group relative px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></span>
                                    <span className="relative flex items-center space-x-3">
                                        <span>Get Started</span>
                                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                                    </span>
                                </button>
                            </Link>
                        ) : (
                            <button onClick={() => openModal(<ModalAuth />)} className="group relative px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></span>
                                <span className="relative flex items-center space-x-3">
                                    <span>Get Started</span>
                                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                            </button>
                        )}


                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            ✨ Free for Lifetime
                        </p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center space-x-2">
                            <CheckSquare size={16} className="text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">100% Free</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckSquare size={16} className="text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Secure Data</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckSquare size={16} className="text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Support 24/7</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}