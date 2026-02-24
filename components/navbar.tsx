'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/prompts', label: 'Prompts' },
    { href: '/workflows', label: 'Workflows' },
    { href: '/agents', label: 'Agents' },
    { href: '/simulations', label: 'Simulations' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/niit-logo.png"
              alt="NIIT"
              width={120}
              height={36}
              priority
              className="h-7 w-auto"
            />
            <span className="hidden sm:inline-block text-sm font-semibold tracking-wide text-foreground/90">
              Marketplace
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle theme"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60 hover:bg-card transition-colors"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted ? (
                theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
              ) : (
                <span className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-muted/60 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/80 backdrop-blur-md">
          <div className="px-4 sm:px-6 py-3 space-y-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
