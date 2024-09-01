import { Transition, Variants, motion, useCycle } from "framer-motion";
import { useState } from "react";

const MenuToggle = ({
  toggle,
  isOpen,
  className,
  transition = {
    type: "spring",
    stiffness: 260,
    velocity: 200,
    damping: 20,
  }
}: {
  toggle: () => void;
  isOpen: boolean;
  className?: string;
  transition?: Transition;
}) => {
  const menuLabelTopVariants = {
    open: { y: "-100%" },
    closed: { top: 0 },
  };

  const menuLabelBottomVariants = {
    open: { top: 0 },
    closed: { top: "100%" },
  };

  return (
    <span className={`whitespace-pre relative flex cursor-pointer overflow-hidden ${className} `}>
      <motion.span
        className={`relative letter`}
        style={{ top: 0 }}
        variants={menuLabelTopVariants}
        animate={isOpen ? "open" : "closed"}
        transition={transition}
        onClick={() => toggle()}
      >
        Menu
      </motion.span>
      <motion.span
        className="absolute"
        aria-hidden={true}
        style={{ top: "100%" }}
        variants={menuLabelBottomVariants}
        animate={isOpen ? "open" : "closed"}
        transition={transition}
        onClick={() => toggle()}
      >
        Close
      </motion.span>
    </span>
  )
}

const Navigation = ({ links }: { links: { label: string; href: string; }[] }) => {
  return (
    <ul>
      {links.map((link) => <li className="cursor-pointer"key={link.href}>{link.label}</li>)}
    </ul>
  )
}

type MenuProps = {
  links: {
    label: string;
    href: string;
  }[];
  containerVariants?: Variants;
  className?: string;
};

export function Menu({
  links,
  containerVariants = {
    open: {
      height: "300px",
      width: "250px",
      borderRadius: "20px",
      transition: {
        type: "spring",
        stiffness: 360,
        velocity: 200,
        damping: 25,
      }
    },
    closed: {
      borderRadius: "30px",
      transition: {
        type: "spring",
        stiffness: 360,
        velocity: 200,
        damping: 20,
      }
    }
  },
  className
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.nav className={`origin-top-right  ${className}`} initial={false} variants={containerVariants}
      animate={isOpen ? "open" : "closed"} layout>

      <div className="flex justify-end w-full">  
        <MenuToggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      </div>
      <Navigation links={links} />
    </motion.nav>
  );
}
