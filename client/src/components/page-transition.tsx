
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    filter: "blur(10px)",
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  out: {
    opacity: 0,
    y: -60,
    scale: 1.05,
    filter: "blur(10px)",
  },
};

const pageTransition = {
  type: "spring",
  damping: 25,
  stiffness: 120,
  mass: 0.8,
  duration: 1.2,
};

const curtainVariants = {
  initial: {
    scaleY: 1,
  },
  animate: {
    scaleY: 0,
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.2,
    }
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1],
    }
  }
};

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Luxury curtain effect */}
      <motion.div
        variants={curtainVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-50 bg-gradient-to-b from-primary via-primary to-accent origin-top"
        style={{ transformOrigin: "top" }}
      />
      
      {/* Main content with sophisticated animation */}
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full relative z-10"
      >
        {/* Subtle shimmer overlay for luxury feel */}
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ 
            opacity: [0, 0.3, 0], 
            x: ["100%", "200%"],
            transition: {
              duration: 2,
              ease: "easeInOut",
              delay: 0.5,
            }
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(200, 167, 108, 0.3), transparent)",
            transform: "skewX(-25deg)",
          }}
        />
        {children}
      </motion.div>
    </>
  );
}
