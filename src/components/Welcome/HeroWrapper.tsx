import { ReactElement, ReactNode } from "react";
interface HeroWrapperProps { children: ReactNode }

export default function HeroWrapper({ children }: HeroWrapperProps): ReactElement {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                {children}
            </div>
        </section>
    )
}