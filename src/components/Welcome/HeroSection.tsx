import { ReactElement } from "react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import Description from "./Description";
import CtaButton from "./CtaButton";
import FeatureCard from "./FeatureCard";
import HeroWrapper from "./HeroWrapper";

export default function HeroSection(): ReactElement {

    return (
        <HeroWrapper>
            <>
                <ThemeToggle />
                <Logo />
                <Description />
                <CtaButton />
                <FeatureCard />
            </>
        </HeroWrapper>
    )
}