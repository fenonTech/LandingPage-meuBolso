import { useEffect, useRef, useState } from "react";

// Map global para rastrear elementos que já foram animados
const animatedElements = new WeakMap();

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Se esse elemento já foi animado, marca como visível imediatamente
    if (animatedElements.has(element)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Marca este elemento como já animado
          animatedElements.set(element, true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "50px 0px -50px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isVisible];
};

export const useStaggeredAnimation = (delay = 100) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Se esse elemento já foi animado, marca como visível imediatamente
    if (animatedElements.has(element)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            // Marca este elemento como já animado
            animatedElements.set(element, true);
            observer.disconnect();
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return [ref, isVisible];
};
