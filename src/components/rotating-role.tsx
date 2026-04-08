"use client";

import { useEffect, useState } from "react";

type RotatingRoleProps = {
  roles: readonly string[];
  className?: string;
  itemClassName?: string;
};

const ROTATION_MS = 3200;

export function RotatingRole({ roles, className, itemClassName }: RotatingRoleProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!roles.length) {
      return;
    }

    const getSyncedIndex = () => Math.floor(Date.now() / ROTATION_MS) % roles.length;

    let intervalId: number | undefined;
    const updateIndex = () => setIndex(getSyncedIndex());
    updateIndex();

    const timeoutId = window.setTimeout(() => {
      updateIndex();
      intervalId = window.setInterval(updateIndex, ROTATION_MS);
    }, ROTATION_MS - (Date.now() % ROTATION_MS));

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [roles]);

  return (
    <div aria-live="polite" className={className}>
      <span key={roles[index]} className={itemClassName}>
        {roles[index]}
      </span>
    </div>
  );
}
