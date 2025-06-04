'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2
      }
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }
    })
  };

  const navItems = [
    { href: "/blog", label: "Home" },
    { href: "/forum", label: "About" },
    { href: "/careers", label: "Projects" },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[80%] max-w-[850px] z-50 rounded-[32px] border border-white/[0.08] bg-white/[0.02] shadow-[0_0_30px_rgba(0,0,0,0.03)] backdrop-blur-[12px]"
    >
      <div className="mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex items-center"
          >
            <Link href="/" className="text-white/90 font-semibold text-xl flex items-center gap-3 transition-colors hover:text-white">
              <Image 
                src="/Alogo.png" 
                alt="Logo" 
                width={32} 
                height={32}
                className="object-contain bg-black/20 backdrop-blur-sm rounded-2xl p-1 border border-white/[0.08]"
              />
              <span className={`${inter.className} font-bold  tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white transition-all duration-300`}>Anish</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`${inter.className} text-white/70 hover:text-white px-4 py-2 text-[15px] font-medium transition-colors relative group`}
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact button and Mobile menu button */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex items-center gap-4"
          >
            <Link href="/contact">
              <button className={`${inter.className} hidden md:flex items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.08] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2A2A2A] transition-colors hover:cursor-pointer`}>
                Contact
              </button>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/70 hover:text-white focus:outline-none transition-colors"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                {!isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </motion.div>
            </button>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden py-4 px-2 overflow-hidden"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={menuItemVariants}
                  >
                    <Link
                      href={item.href}
                      className={`${inter.className} text-white hover:text-white/80 px-4 py-2 text-[15px] font-medium transition-colors rounded-lg hover:bg-white/5 block`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  custom={navItems.length}
                  variants={menuItemVariants}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <button className={`${inter.className} w-full flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-gray-100 transition-colors hover:cursor-pointer`}>
                      Contact
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Nav;
