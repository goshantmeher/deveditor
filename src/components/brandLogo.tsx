"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

function BrandLogo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const logoSrc = theme === "dark" ? "/logoDark.svg" : "/logoLight.svg";
  return (
    <Link href="/">
      <img src={logoSrc} alt="DevEditor Logo" className="h-8" />
    </Link>
  );
}

export default BrandLogo;
