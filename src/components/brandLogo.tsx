"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BrandLogo() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={currentTheme === "dark" ? "/logoDark.svg" : "/logoLight.svg"}
        alt="DevEditor Logo"
        width={150}
        height={25}
      />
    </Link>
  );
}
