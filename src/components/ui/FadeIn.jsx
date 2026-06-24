import { useEffect, useState } from "react";

export default function FadeIn({ children }) {
  const [M, setM] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import("framer-motion");
        if (mounted) setM(mod);
      } catch (err) {
        // fail silently and use CSS fallback
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (M && M.motion) {
    const { motion } = M;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    );
  }

  // CSS fallback
  return (
    <div className="transition-opacity duration-400 ease-out opacity-0 translate-y-5 animate-fade-in">
      {children}
    </div>
  );
}