import { Home, LogIn, Navigation } from "lucide-react";
import HelpItem from "./HelpItem";
import { ReactElement } from "react";

export default function HelpSection(): ReactElement {
  // Help Items
  const HelpItems = [
    {
      icon: <Home className="text-white" />,
      title: "Home",
      description: "Back to the homepage to explore our features",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Navigation className="text-white" />,
      title: "Search Feature",
      description: "Use navigation or menus to find the feature you need",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <LogIn className="text-white" />,
      title: "Login",
      description: "Log in to your account to access all personal features",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Need some help? 🤔
      </h3>

      <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
        {HelpItems.map((item, index) => {
          return <HelpItem key={index} description={item.description} title={item.title} icon={item.icon} gradient={item.gradient} />;
        })}
      </div>
    </div>
  );
}
