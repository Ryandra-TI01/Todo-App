import FloatingOrbs from "../components/NotFound/FloatingOrbs";
import BrokenRobotIllustration from "../components/NotFound/BrokenRobotIllustration";
import ErrorHeader from "../components/NotFound/ErrorHeader";
import ActionButton from "../components/NotFound/ActionButton";
import BackLine from "../components/NotFound/BackLine";
import GlitchItem from "../components/NotFound/GlitchItem";
import HelpSection from "../components/NotFound/HelpSection";

export default function NotFoundPage() {
  return (
    <div className="relative z-10 text-center pt-16 px-6 max-w-4xl mx-auto">
      {/* 404 Illustration */}
      <div className="mb-8 relative">
        <GlitchItem />
        <FloatingOrbs />
        <BrokenRobotIllustration />
      </div>

      <ErrorHeader />
      <ActionButton />
      <HelpSection />
      <BackLine />
    </div>
  );
}
