import { ArrowRight, Play } from "lucide-react";
import { ReactElement } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/Route";
import { useModal } from "../../context/ModalProvider";
import ModalAuth from "../Auth/ModalAuth";

export default function CtaButton(): ReactElement {
    const { user } = useAuth();
    const { openModal } = useModal();
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {user ? (
                <Link to={ROUTES.TASKS} className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                    <span className="flex items-center space-x-2">
                        <span>Get Started</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                </Link>
            ) : (
                <button onClick={
                    () => openModal(<ModalAuth />)
                } className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                    <span className="flex items-center space-x-2">
                        <span>Get Started</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                </button>
            )}
            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1" target="_blank">
                <button className="group flex items-center space-x-2 px-8 py-4 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300">
                    <Play size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>See Demo</span>
                </button>
            </a>
        </div>
    )
}