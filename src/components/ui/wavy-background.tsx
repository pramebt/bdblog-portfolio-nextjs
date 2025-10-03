"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };

  const getWaveColors = () => {
    if (colors) return colors;
    
    const isDarkTheme = document.documentElement.classList.contains('dark');
    
    if (isDarkTheme) {
      // สีสำหรับ Dark Theme (สีเข้ม ไม่สะดุดตา)
      return [
        "#0f172a",  // น้ำเงินเข้มมาก (slate-900)
        "#1e293b",  // น้ำเงินเข้ม (slate-800)
        "#334155",  // น้ำเงินกลาง (slate-700)
        "#475569",  // เทาน้ำเงิน (slate-600)
        "#64748b",  // เทาอ่อน (slate-500)
      ];
    } else {
      // สีสำหรับ Light Theme (สีฟ้าอ่อนพาสเทล)
      return [
        "#bfdbfe",  // ฟ้าพาสเทลอ่อน (blue-200)
        "#93c5fd",  // ฟ้าพาสเทล (blue-300)
        "#dbeafe",  // ฟ้าอ่อนมาก (blue-100)
        "#e0f2fe",  // ฟ้าอ่อนขาว (sky-100)
        "#f0f9ff",  // ขาวฟ้า (sky-50)
      ];
    }
  };
  
  const drawWave = (n: number) => {
    nt += getSpeed();
    const waveColors = getWaveColors();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 70;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  
  const getBackgroundColor = () => {
    const isDarkTheme = document.documentElement.classList.contains('dark')
    return isDarkTheme ? "black" : "white"
  }
  
  const render = () => {
    ctx.fillStyle = backgroundFill || getBackgroundColor();
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // I'm sorry but i have got to support it on safari.
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
