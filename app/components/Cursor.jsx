"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState("default");

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleDown = () => setVariant("click");
    const handleUp = () => setVariant("hover");

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  // detect hover on interactive elements
  useEffect(() => {
    const addHover = () => setVariant("hover");
    const removeHover = () => setVariant("default");

    const elements = document.querySelectorAll("a, button");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  const variants = {
    default: {
      width: 10,
      height: 10,
      backgroundColor: "#059669",
      opacity: 0.7,
    },
    hover: {
      width: 30,
      height: 30,
      backgroundColor: "#059669",
      opacity: 0.15,
    },
    click: {
      width: 50,
      height: 50,
      backgroundColor: "#059669",
      opacity: 0.2,
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[5000] pointer-events-none rounded-full"
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        x: position.x - 5,
        y: position.y - 5,
      }}
    />
  );
}