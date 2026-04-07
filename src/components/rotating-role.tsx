"use client";

import { useEffect, useState } from "react";

type RotatingRoleProps = {
  roles: readonly string[];
  className?: string;
  itemClassName?: string;
};

export function RotatingRole({ roles, className, itemClassName }: RotatingRoleProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [roles.length]);

  return (
    <div aria-live="polite" className={className}>
      <span key={roles[index]} className={itemClassName}>
        {roles[index]}
      </span>
    </div>
  );
}
