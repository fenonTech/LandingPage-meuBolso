import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef();
  // Sempre retorna true para desabilitar animações
  const [isVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Aplica estado final imediatamente
    element.classList.add("animated-once");
    element.style.opacity = "1";
    element.style.transform = "none";
  }, []);

  return [ref, isVisible];
};

export const useStaggeredAnimation = (delay = 100) => {
  const ref = useRef();
  // Sempre retorna true para desabilitar animações
  const [isVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Aplica estado final imediatamente
    element.classList.add("animated-once");
    element.style.opacity = "1";
    element.style.transform = "none";
  }, []);

  return [ref, isVisible];
};