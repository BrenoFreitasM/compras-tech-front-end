"use client";

import { useEffect, useRef } from 'react';

export default function PriceTrendChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 20, right: 20, bottom: 30, left: 50 };

    const days = 15;
    const data = [
      { name: 'iPhone 13', color: '#f97316', prices: [2800, 2800, 2750, 2750, 2700, 2700, 2650, 2650, 2600, 2550, 2550, 2500, 2500, 2450, 2400] },
      { name: 'iPhone 14 Pro', color: '#3b82f6', prices: [4500, 4450, 4450, 4400, 4400, 4350, 4350, 4300, 4250, 4250, 4200, 4150, 4150, 4100, 4000] },
      { name: 'MacBook Air', color: '#10b981', prices: [4200, 4200, 4200, 4150, 4150, 4150, 4100, 4100, 4100, 4050, 4050, 4000, 4000, 3950, 3900] }
    ];

    const minPrice = 2000;
    const maxPrice = 5000;

    ctx.clearRect(0, 0, width, height);

    // Draw grid and axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const p = minPrice + (maxPrice - minPrice) * (i / 5);
      const y = height - padding.bottom - (i / 5) * (height - padding.top - padding.bottom);
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);

      ctx.fillStyle = '#6b7280';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(`R$ ${p}`, padding.left - 8, y);
    }
    ctx.stroke();

    // X axis labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i < days; i++) {
      if (i % 2 === 0) {
        const x = padding.left + (i / (days - 1)) * (width - padding.left - padding.right);
        ctx.fillText(`Dia ${i + 1}`, x, height - padding.bottom + 8);
      }
    }

    // Draw lines
    data.forEach(line => {
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 3;

      line.prices.forEach((price, i) => {
        const x = padding.left + (i / (days - 1)) * (width - padding.left - padding.right);
        const y = height - padding.bottom - ((price - minPrice) / (maxPrice - minPrice)) * (height - padding.top - padding.bottom);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw points
      line.prices.forEach((price, i) => {
        const x = padding.left + (i / (days - 1)) * (width - padding.left - padding.right);
        const y = height - padding.bottom - ((price - minPrice) / (maxPrice - minPrice)) * (height - padding.top - padding.bottom);

        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800/50 border border-brand-border dark:border-gray-700 rounded-xl p-5 shadow-sm mb-6">
      {/* <div className="mb-4">
        <h2 className="text-gray-900 dark:text-white font-semibold text-lg">Produtos Mais Procurados</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Variação de preços nos últimos 15 dias</p>
      </div>
      <div className="w-full h-64 relative">
        <canvas ref={canvasRef}></canvas>
      </div> */}
      <div className="mt-4 flex justify-center gap-4 text-xs text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#2563EB]"></span> iPhone 13</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span> iPhone 14 Pro</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> MacBook Air</div>
      </div>
    </div>
  );
}
