"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { WavyBackground } from "@/components/ui/wavy-background";
const words = "Passionate developer who loves creating websites.";
import DecryptedText from "@/components/ui/DecryptedText";
const HomeHero = () => {
  return (
    <WavyBackground className="min-h-screen flex items-center justify-center py-16 md:py-20 px-4 ">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 text-foreground">
          <DecryptedText
            text="Bandit Kaewnoi"
            speed={100}
            maxIterations={20}
            className="revealed"
            encryptedClassName="encrypted"
          />
        </h1>
        <div className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto font-light leading-relaxed">
          <TextGenerateEffect words={words} />
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span className="font-light">phayao, Thailand</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="font-light">Available for projects</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="px-8 py-4 text-lg font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            <Link href="/blog">Read Blog</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="px-8 py-4 text-lg font-medium rounded-full hover:bg-muted/50 transition-colors"
          >
            <Link href="/projects">
              View Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </WavyBackground>
  );
};

export default HomeHero;
