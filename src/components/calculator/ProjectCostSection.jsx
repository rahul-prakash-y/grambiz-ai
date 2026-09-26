import React from 'react';
import { 
  Wrench, 
  Package, 
  Wallet, 
  Sparkles, 
  Layers, 
} from 'lucide-react';

export default function ProjectCostSection({
  equipment,
  setEquipment,
  inventory,
  setInventory,
  workingCapital,
  setWorkingCapital,
  category,
  t,
  lang
}) {
  const totalCost = (Number(equipment) || 0) + (Number(inventory) || 0) + (Number(workingCapital) || 0);

  const equipPct = totalCost > 0 ? Math.round(((Number(equipment) || 0) / totalCost) * 100) : 0;
  const invPct = totalCost > 0 ? Math.round(((Number(inventory) || 0) / totalCost) * 100) : 0;
  const wcPct = totalCost > 0 ? Math.max(0, 100 - equipPct - invPct) : 0;

  // Preset ratios by rural category
  const applyPreset = (eqRatio, inRatio, wcRatio) => {
    const baseTotal = totalCost > 0 ? totalCost : 250000;
    setEquipment(Math.round(baseTotal * eqRatio));
    setInventory(Math.round(baseTotal * inRatio));
    setWorkingCapital(Math.round(baseTotal * wcRatio));
  };

  const presets = [
    {
      labelEn: 'Retail / Kirana',
      labelTa: 'மளிகை கடை',
      ratios: [0.45, 0.35, 0.20],
      tag: '45% / 35% / 20%'
    },
    {
      labelEn: 'Tailoring Unit',
      labelTa: 'தையல் பிரிவு',
      ratios: [0.60, 0.20, 0.20],
      tag: '60% / 20% / 20%'
    },
    {
      labelEn: 'Agri-Inputs',
      labelTa: 'வேளாண் மையம்',
      ratios: [0.30, 0.50, 0.20],
      tag: '30% / 50% / 20%'
    },
    {
      labelEn: 'Dairy Unit',
      labelTa: 'பால் பண்ணை',
      ratios: [0.65, 0.15, 0.20],
      tag: '65% / 15% / 20%'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-black shadow-xs">
              <span className="text-xs">01</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <span>{t.calculator.projectCostTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t.calculator.projectCostSub}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Layers className="w-3 h-3 text-emerald-600" />
            <span className='whitespace-nowrap'>{lang === 'ta' ? 'உள்ளீடுகள்' : 'Cost Inputs'}</span>
          </span>
        </div>

        {/* Quick Industry Ratio Presets */}
        <div className="mt-4 pt-1">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-500 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {lang === 'ta' ? 'தொழில் வாரியான பரிந்துரைக்கப்பட்ட ஒதுக்கீடு:' : 'Quick Industry Allocations:'}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(...preset.ratios)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-left transition-all group"
              >
                <span className="block text-[11px] font-bold text-slate-700 group-hover:text-emerald-800 truncate">
                  {lang === 'ta' ? preset.labelTa : preset.labelEn}
                </span>
                <span className="block text-[10px] text-slate-400 group-hover:text-emerald-600 font-medium">
                  {preset.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* The 3 Cost Inputs */}
        <div className="mt-5 space-y-5">
          {/* 1. Equipment & Machinery */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-emerald-300 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center shrink-0">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <div>
                  <label htmlFor="equipment-cost" className="text-xs font-bold text-slate-800 block">
                    {t.calculator.equipmentCost}
                  </label>
                  <span className="text-[11px] text-slate-400 block">
                    {t.calculator.equipmentHelp}
                  </span>
                </div>
              </div>

              {/* Number Input with Steppers */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setEquipment(Math.max(0, (Number(equipment) || 0) + 10000))}
                  className="px-2 py-1 text-[11px] font-bold text-emerald-700 bg-white border border-slate-200 rounded-md hover:bg-emerald-50 active:scale-95"
                >
                  +10k
                </button>
                <button
                  type="button"
                  onClick={() => setEquipment(Math.max(0, (Number(equipment) || 0) + 50000))}
                  className="px-2 py-1 text-[11px] font-bold text-emerald-700 bg-white border border-slate-200 rounded-md hover:bg-emerald-50 active:scale-95"
                >
                  +50k
                </button>
                <div className="relative w-36">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                  <input
                    id="equipment-cost"
                    type="number"
                    min="0"
                    max="5000000"
                    step="5000"
                    value={equipment}
                    onChange={(e) => setEquipment(Math.max(0, Number(e.target.value)))}
                    className="input input-sm input-bordered w-full pl-6 pr-2 text-xs font-bold text-slate-800 focus:border-emerald-600 text-right"
                  />
                </div>
              </div>
            </div>

            {/* Range Slider */}
            <div className="pt-2">
              <input
                type="range"
                min="0"
                max="1000000"
                step="5000"
                value={equipment}
                onChange={(e) => setEquipment(Number(e.target.value))}
                className="range range-xs range-primary"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
                <span>₹0</span>
                <span className="text-emerald-700 font-semibold">{equipPct}% of Total</span>
                <span>₹10,00,000</span>
              </div>
            </div>
          </div>

          {/* 2. Initial Inventory */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-sky-300 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-600/10 text-sky-700 flex items-center justify-center shrink-0">
                  <Package className="w-3.5 h-3.5" />
                </div>
                <div>
                  <label htmlFor="inventory-cost" className="text-xs font-bold text-slate-800 block">
                    {t.calculator.inventoryCost}
                  </label>
                  <span className="text-[11px] text-slate-400 block">
                    {t.calculator.inventoryHelp}
                  </span>
                </div>
              </div>

              {/* Number Input with Steppers */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setInventory(Math.max(0, (Number(inventory) || 0) + 10000))}
                  className="px-2 py-1 text-[11px] font-bold text-sky-700 bg-white border border-slate-200 rounded-md hover:bg-sky-50 active:scale-95"
                >
                  +10k
                </button>
                <button
                  type="button"
                  onClick={() => setInventory(Math.max(0, (Number(inventory) || 0) + 50000))}
                  className="px-2 py-1 text-[11px] font-bold text-sky-700 bg-white border border-slate-200 rounded-md hover:bg-sky-50 active:scale-95"
                >
                  +50k
                </button>
                <div className="relative w-36">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                  <input
                    id="inventory-cost"
                    type="number"
                    min="0"
                    max="5000000"
                    step="5000"
                    value={inventory}
                    onChange={(e) => setInventory(Math.max(0, Number(e.target.value)))}
                    className="input input-sm input-bordered w-full pl-6 pr-2 text-xs font-bold text-slate-800 focus:border-sky-600 text-right"
                  />
                </div>
              </div>
            </div>

            {/* Range Slider */}
            <div className="pt-2">
              <input
                type="range"
                min="0"
                max="800000"
                step="5000"
                value={inventory}
                onChange={(e) => setInventory(Number(e.target.value))}
                className="range range-xs range-secondary"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
                <span>₹0</span>
                <span className="text-sky-700 font-semibold">{invPct}% of Total</span>
                <span>₹8,00,000</span>
              </div>
            </div>
          </div>

          {/* 3. Working Capital */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-amber-300 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-600/10 text-amber-700 flex items-center justify-center shrink-0">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
                <div>
                  <label htmlFor="working-capital" className="text-xs font-bold text-slate-800 block">
                    {t.calculator.workingCapitalCost}
                  </label>
                  <span className="text-[11px] text-slate-400 block">
                    {t.calculator.workingCapitalHelp}
                  </span>
                </div>
              </div>

              {/* Number Input with Steppers */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setWorkingCapital(Math.max(0, (Number(workingCapital) || 0) + 10000))}
                  className="px-2 py-1 text-[11px] font-bold text-amber-700 bg-white border border-slate-200 rounded-md hover:bg-amber-50 active:scale-95"
                >
                  +10k
                </button>
                <button
                  type="button"
                  onClick={() => setWorkingCapital(Math.max(0, (Number(workingCapital) || 0) + 25000))}
                  className="px-2 py-1 text-[11px] font-bold text-amber-700 bg-white border border-slate-200 rounded-md hover:bg-amber-50 active:scale-95"
                >
                  +25k
                </button>
                <div className="relative w-36">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                  <input
                    id="working-capital"
                    type="number"
                    min="0"
                    max="3000000"
                    step="5000"
                    value={workingCapital}
                    onChange={(e) => setWorkingCapital(Math.max(0, Number(e.target.value)))}
                    className="input input-sm input-bordered w-full pl-6 pr-2 text-xs font-bold text-slate-800 focus:border-amber-600 text-right"
                  />
                </div>
              </div>
            </div>

            {/* Range Slider */}
            <div className="pt-2">
              <input
                type="range"
                min="0"
                max="500000"
                step="5000"
                value={workingCapital}
                onChange={(e) => setWorkingCapital(Number(e.target.value))}
                className="range range-xs range-accent"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
                <span>₹0</span>
                <span className="text-amber-700 font-semibold">{wcPct}% of Total</span>
                <span>₹5,00,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output: Total Project Cost Summary Box */}
      <div className="rounded-xl p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold block">
              {t.calculator.totalProjectCost}
            </span>
            <span className="text-xs text-slate-400">
              {t.calculator.totalProjectCostSub}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xl sm:text-2xl font-black text-emerald-300 block tracking-tight">
              ₹{totalCost.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-300">
              {lang === 'ta' ? 'அனைத்து செலவுகளின் கூட்டுத்தொகை' : 'Complete setup & initial operational outlay'}
            </span>
          </div>
        </div>

        {/* Visual Composition Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="h-2.5 w-full bg-slate-700 rounded-full overflow-hidden flex">
            <div 
              style={{ width: `${equipPct}%` }} 
              className="bg-emerald-500 h-full transition-all duration-300"
              title={`Equipment: ${equipPct}%`}
            />
            <div 
              style={{ width: `${invPct}%` }} 
              className="bg-sky-400 h-full transition-all duration-300"
              title={`Inventory: ${invPct}%`}
            />
            <div 
              style={{ width: `${wcPct}%` }} 
              className="bg-amber-400 h-full transition-all duration-300"
              title={`Working Capital: ${wcPct}%`}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>{lang === 'ta' ? 'இயந்திரம்' : 'Equipment'}: <strong>{equipPct}%</strong></span>
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
              <span>{lang === 'ta' ? 'சரக்கு' : 'Inventory'}: <strong>{invPct}%</strong></span>
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span>{lang === 'ta' ? 'மூலதனம்' : 'Working Cap'}: <strong>{wcPct}%</strong></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
