import { easeIn, Variant } from "framer-motion";

interface ButtonProps {
    label: string,
    arrow?: SVGElement;
    containerVariant?: Variant;
    labelVariant?: Variant;
    arrowVariant?: Variant;
    className?: string;
    onClick?: () => void;
}

export const RandomLetterSwapPingPong = ({
    label,
    containerVariant = {
        scale: 1.0,
        transition: { duration: 0.3, ease: easeIn }
    },
    labelVariant = {

    },
    className,
    onClick,
    ...props
  }: ButtonProps) => {