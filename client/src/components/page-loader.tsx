
import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
      }}
      transition={{ 
        duration: 1,
        ease: [0.19, 1, 0.22, 1]
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10"
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Luxury loader with multiple rings */}
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-16 h-16 border-2 border-accent/30 border-t-accent rounded-full absolute"
          />
          
          {/* Middle ring */}
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-12 h-12 border-2 border-primary/30 border-r-primary rounded-full absolute top-2 left-2"
          />
          
          {/* Inner ring */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-8 h-8 border-2 border-accent/50 border-b-accent rounded-full absolute top-4 left-4"
          />
          
          {/* Center dot */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-accent rounded-full absolute top-7 left-7"
          />
        </div>
        
        {/* Luxury brand text */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl font-serif font-bold text-primary tracking-wider"
          >
            I.LUXURYEGYPT
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-sm text-muted-foreground font-light tracking-wide"
          >
            Preparing your luxury experience...
          </motion.p>
        </div>
        
        {/* Floating particles for luxury effect */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="absolute w-1 h-1 bg-accent/60 rounded-full"
            style={{
              left: `${40 + i * 5}%`,
              top: `${30 + i * 2}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
