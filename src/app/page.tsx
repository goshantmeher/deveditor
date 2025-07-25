"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, ExternalLink, Github, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const tools = [
    {
      title: "JSON Viewer",
      description: "Format and validate JSON data",
      icon: "🧩",
      href: "/json-editor",
      available: true,
    },
    {
      title: "CSS Playground",
      description: "Test and experiment with CSS",
      icon: "🎨",
      href: "/css-playground",
      available: false,
    },
    {
      title: "Base64 Encoder",
      description: "Encode and decode Base64 strings",
      icon: "⚙️",
      href: "/base64-encoder",
      available: false,
    },
    {
      title: "JWT Decoder",
      description: "Decode and verify JWT tokens",
      icon: "🔐",
      href: "/jwt-decoder",
      available: false,
    },
  ];

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) {
      return tools;
    }

    const query = searchQuery.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Developer Tools</h1>
          <p className="text-muted-foreground text-lg mb-8">
            A collection of useful tools for developers
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="🔍 Search tools..."
              className="pl-10 h-12 text-center"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search developer tools"
            />
          </div>

          {/* Search Results Count */}
          {searchQuery.trim() && (
            <div className="text-center mb-6" role="status" aria-live="polite">
              <p className="text-sm text-muted-foreground">
                {filteredTools.length === 0
                  ? "No tools found"
                  : `${filteredTools.length} tool${
                      filteredTools.length === 1 ? "" : "s"
                    } found`}
                {searchQuery.trim() && (
                  <span className="ml-1">
                    for "<span className="font-medium">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>
          )}
        </header>

        {/* Tools Grid */}
        <main>
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool, index) => (
                <article key={index}>
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="text-2xl"
                            role="img"
                            aria-label={tool.title}
                          >
                            {tool.icon}
                          </span>
                          <CardTitle className="text-lg">
                            {tool.title}
                          </CardTitle>
                        </div>
                        {tool.available ? (
                          <Link href={tool.href}>
                            <Button size="sm" className="gap-2">
                              Open
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        ) : (
                          <Button size="sm" variant="outline" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardContent>
                  </Card>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4" role="img" aria-label="Search">
                  🔍
                </div>
                <h3 className="text-xl font-semibold mb-2">No tools found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or{" "}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-primary hover:underline"
                  >
                    clear the search
                  </button>
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground border-t pt-8">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Built by you</span>
            </div>
            <span aria-hidden="true">|</span>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
              aria-label="View source code on GitHub"
            >
              GitHub
            </Link>
            <span aria-hidden="true">|</span>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
              aria-label="Send feedback"
            >
              Feedback
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
