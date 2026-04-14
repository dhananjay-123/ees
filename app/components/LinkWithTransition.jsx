"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "./TransitionProvider";

export default function LinkWithTransition({ href, children }) {
  const router = useRouter();
  const { setIsTransitioning } = useTransition();

  const handleClick = (e) => {
    e.preventDefault();

    setIsTransitioning(true);

    setTimeout(() => {
      router.push(href);
      setIsTransitioning(false);
    }, 600); // 👈 animation duration
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}