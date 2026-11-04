"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { LiquidBackground } from "@/components/ui/liquid-background";

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease },
});

const HomeHero = () => {
  return (
    <section className="sticky top-0 z-0 -mt-16 flex h-svh w-[100cqi] items-center justify-center overflow-hidden bg-background px-4 sm:-mt-20 [margin-inline:calc(50%-50cqi)]">
      <LiquidBackground />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.p className="section-label" {...fadeUp(0.05)}>
          Frontend Developer · Phayao, Thailand
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold tracking-tight text-foreground leading-[1.05] mb-8 text-balance"
          {...fadeUp(0.14)}
        >
          Bandit Kaewnoi
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mb-10"
          {...fadeUp(0.26)}
        >
          Passionate developer who loves creating websites — crafting calm,
          thoughtful interfaces with modern web technology.
        </motion.p>

        <motion.div className="flex flex-wrap gap-2.5 mb-12" {...fadeUp(0.36)}>
          <span className="meta-pill bg-background">Available for projects</span>
          <span className="meta-pill bg-background">React · Next.js</span>
          <span className="meta-pill bg-background">Based in Thailand</span>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          {...fadeUp(0.46)}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity duration-300"
          >
            View projects
            <ArrowRight size={16} weight="bold" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-300"
          >
            Read blog
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors duration-300"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <ArrowDown size={18} weight="light" />
      </motion.a>
    </section>
  );
};

export default HomeHero;
