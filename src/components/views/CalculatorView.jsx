import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Landmark, 
  FileDown, 
  Sparkles, 
  RotateCcw,
} from 'lucide-react';
import { useBusinessIdea } from '../../context/BusinessIdeaContext';
import ProjectCostSection from '../calculator/ProjectCostSection';
import FundingGapSection from '../calculator/FundingGapSection';
import EmiCalculatorSection from '../calculator/EmiCalculatorSection';
import ProposalModal from '../calculator/ProposalModal';

export default function CalculatorView({ t, lang, onNavigate }) {
  const { ideaData, updateIdeaData, analysisResult } = useBusinessIdea();

  // Available Capital from global state
  const globalAvailableCapital = Number(ideaData?.availableCapital ?? ideaData?.investment) || 250000;
  const currentCategory = ideaData?.category || 'Grocery';
  const currentLocation = ideaData?.location || 'Kallupatti Village, Madurai';

  // Benchmark cost distribution based on category
  const getCategoryDefaults = (cat, baseCapital) => {
    switch (cat) {
      case 'Grocery':
        return {
          equipment: Math.round(baseCapital * 0.45),
          inventory: Math.round(baseCapital * 0.35),
          workingCapital: Math.round(baseCapital * 0.20)
        };
      case 'Tailoring':
        return {
          equipment: Math.round(baseCapital * 0.60),
          inventory: Math.round(baseCapital * 0.20),
          workingCapital: Math.round(baseCapital * 0.20)
        };
      case 'Agri-Inputs':
        return {
          equipment: Math.round(baseCapital * 0.30),
          inventory: Math.round(baseCapital * 0.50),
          workingCapital: Math.round(baseCapital * 0.20)
        };
      case 'Dairy':
        return {
          equipment: Math.round(baseCapital * 0.65),
          inventory: Math.round(baseCapital * 0.15),
          workingCapital: Math.round(baseCapital * 0.20)
        };
      default:
        return {
          equipment: Math.round(baseCapital * 0.50),
          inventory: Math.round(baseCapital * 0.30),
          workingCapital: Math.round(baseCapital * 0.20)
        };
    }
  };

  const initialDefaults = getCategoryDefaults(currentCategory, globalAvailableCapital);

  // SECTION 1: Project Cost Inputs State
  const [equipment, setEquipment] = useState(initialDefaults.equipment);
  const [inventory, setInventory] = useState(initialDefaults.inventory);
  const [workingCapital, setWorkingCapital] = useState(initialDefaults.workingCapital);

  // SECTION 2: Funding Gap State
  const [selectedScheme, setSelectedScheme] = useState('pmegp-special');

  // SECTION 3: EMI Calculator State
  const [interestRate, setInterestRate] = useState(8.5); // Subsidized PMEGP/Rural rate
  const [tenureMonths, setTenureMonths] = useState(60);  // 5 Years default
  const [customLoanAmount, setCustomLoanAmount] = useState(0);

  // Proposal Modal State
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Sync defaults when global idea category or capital changes significantly
  useEffect(() => {
    const defaults = getCategoryDefaults(currentCategory, globalAvailableCapital);
    setEquipment(defaults.equipment);
    setInventory(defaults.inventory);
    setWorkingCapital(defaults.workingCapital);
  }, [currentCategory]);

  // Calculations
  const totalProjectCost = (Number(equipment) || 0) + (Number(inventory) || 0) + (Number(workingCapital) || 0);
  const fundingGap = totalProjectCost - globalAvailableCapital;
  const requiredLoanAmount = Math.max(0, fundingGap);

  // Calculate EMI for proposal preview
  const r = (interestRate / 12) / 100;
  const emiFactor = Math.pow(1 + r, tenureMonths);
  const previewEmi = requiredLoanAmount > 0 && interestRate > 0 && tenureMonths > 0
    ? Math.round((requiredLoanAmount * r * emiFactor) / (emiFactor - 1))
    : requiredLoanAmount > 0 && tenureMonths > 0
    ? Math.round(requiredLoanAmount / tenureMonths)
    : 0;
  const previewTotalPayable = previewEmi * tenureMonths;
  const previewTotalInterest = Math.max(0, previewTotalPayable - requiredLoanAmount);

  // Reset to active category benchmarks
  const handleResetToCategoryBenchmarks = () => {
    const defaults = getCategoryDefaults(currentCategory, globalAvailableCapital);
    setEquipment(defaults.equipment);
    setInventory(defaults.inventory);
    setWorkingCapital(defaults.workingCapital);
  };

  // Update Available Capital in Global State
  const handleUpdateAvailableCapital = (newCapital) => {
    updateIdeaData({
      availableCapital: newCapital,
      investment: newCapital
    });
  };

  // Scheme names helper
  const schemeNames = {
    'pmegp-special': 'PMEGP Rural Special (35% Grant)',
    'pmegp-general': 'PMEGP Rural General (25% Grant)',
    'mudra-kishore': 'MUDRA Scheme (0% Grant)',
    'nabard-agri': 'NABARD Agri-Infra Fund (33% Grant)',
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.calculator.badge}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            {t.calculator.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            type="button"
            onClick={handleResetToCategoryBenchmarks}
            className="btn btn-sm btn-ghost bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl gap-1.5"
            title="Reset equipment, inventory, and working capital to category standard"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'ta' ? 'இயல்புநிலை' : 'Reset Ratios'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsProposalModalOpen(true)}
            className="btn btn-sm btn-primary text-white text-xs font-bold rounded-xl gap-1.5 shadow-sm"
          >
            <FileDown className="w-4 h-4" />
            <span>{t.calculator.printReportBtn}</span>
          </button>
        </div>
      </div>

      {/* 2. Synced Idea & Global State Capital Indicator Bar */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-sky-50/90 border border-emerald-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-extrabold text-emerald-950 text-xs sm:text-sm">
                {currentCategory}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-800 font-medium">
                {currentLocation}
              </span>
              <span className="badge badge-xs bg-emerald-700 text-white font-bold border-none">
                {lang === 'ta' ? 'நடப்பு யோசனை' : 'Active Wizard Idea'}
              </span>
            </div>
            <div className="text-emerald-700 mt-0.5">
              <span>{lang === 'ta' ? 'உலகளாவிய மூலதனம் (Global Capital):' : 'Available Capital in Global State:'} </span>
              <strong className="text-emerald-950 font-black">₹{globalAvailableCapital.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('new-idea')}
          className="btn btn-xs bg-white hover:bg-emerald-100 text-emerald-800 border-emerald-300 font-bold rounded-lg shrink-0 shadow-2xs"
        >
          {lang === 'ta' ? 'வழிகாட்டியில் மாற்று' : 'Edit in Idea Wizard'}
        </button>
      </div>

      {/* 3. Logical Pipeline Stepper Banner */}
      <div className="hidden md:grid grid-cols-3 gap-4 text-xs">
        <div className="p-3 rounded-xl bg-white border border-slate-200/90 flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-[11px]">1</div>
          <div>
            <span className="font-bold text-slate-800 block">{t.calculator.projectCostTitle}</span>
            <span className="text-[10px] text-slate-400">Equipment + Inventory + WC</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white border border-slate-200/90 flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center text-[11px]">2</div>
          <div>
            <span className="font-bold text-slate-800 block">{t.calculator.fundingGapTitle}</span>
            <span className="text-[10px] text-slate-400">Total Cost - Available Capital</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white border border-slate-200/90 flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-[11px]">3</div>
          <div>
            <span className="font-bold text-slate-800 block">{t.calculator.emiSectionTitle}</span>
            <span className="text-[10px] text-slate-400">Instant Tenure & EMI Calculation</span>
          </div>
        </div>
      </div>

      {/* 4. THE MAIN DASHBOARD GRID WITH THREE MAIN SECTIONS */}
      <div className="space-y-6">
        {/* Row 1: Section 1 (Project Cost Estimation) & Section 2 (Funding Gap) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Section 1: Project Cost Estimation */}
          <ProjectCostSection
            equipment={equipment}
            setEquipment={setEquipment}
            inventory={inventory}
            setInventory={setInventory}
            workingCapital={workingCapital}
            setWorkingCapital={setWorkingCapital}
            category={currentCategory}
            t={t}
            lang={lang}
          />

          {/* Section 2: Funding Gap */}
          <FundingGapSection
            totalProjectCost={totalProjectCost}
            availableCapital={globalAvailableCapital}
            onUpdateAvailableCapital={handleUpdateAvailableCapital}
            selectedScheme={selectedScheme}
            setSelectedScheme={setSelectedScheme}
            t={t}
            lang={lang}
            category={currentCategory}
            location={currentLocation}
          />
        </div>

        {/* Row 2: Section 3: EMI Calculator */}
        <div className="w-full">
          <EmiCalculatorSection
            requiredLoanAmount={requiredLoanAmount}
            customLoanAmount={customLoanAmount}
            setCustomLoanAmount={setCustomLoanAmount}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            tenureMonths={tenureMonths}
            setTenureMonths={setTenureMonths}
            t={t}
            lang={lang}
            projectedMonthlyProfit={analysisResult?.monthlyProfitMin}
          />
        </div>
      </div>

      {/* 5. Bank Application Guidance Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
            <Landmark className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-900">
              {lang === 'ta' ? 'அருகிலுள்ள வங்கி கிளை மூலம் விண்ணப்பிக்கவும்' : 'Ready to Submit to Nearby Rural Banks?'}
            </h4>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              {lang === 'ta' 
                ? 'உங்கள் திட்ட மதிப்பீடு PMEGP மற்றும் முத்ரா கடன் விதிமுறைகளுடன் ஒத்துள்ளது. விரிவான திட்ட அறிக்கையை (DPR) பதிவிறக்கி SBI அல்லது பாண்டியன் கிராம வங்கி கிளையில் சமர்ப்பிக்கவும்.'
                : 'Your cost estimates and debt structure qualify for collateral-free PMEGP / MUDRA term financing up to ₹10 Lakh at SBI Kallupatti and Tamil Nadu Grama Bank branches.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsProposalModalOpen(true)}
          className="btn btn-sm btn-outline hover:bg-emerald-700 hover:text-white border-emerald-600 text-emerald-800 font-bold rounded-xl shrink-0 gap-1.5"
        >
          <FileDown className="w-4 h-4" />
          <span>{lang === 'ta' ? 'முன்மொழிவை பதிவிறக்கு' : 'Generate Bank Dossier'}</span>
        </button>
      </div>

      {/* Proposal Modal */}
      <ProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        lang={lang}
        t={t}
        data={{
          category: currentCategory,
          location: currentLocation,
          equipment,
          inventory,
          workingCapital,
          totalProjectCost,
          availableCapital: globalAvailableCapital,
          requiredLoanAmount,
          selectedSchemeName: schemeNames[selectedScheme] || 'PMEGP Rural Scheme',
          subsidyAmount: Math.round(totalProjectCost * (selectedScheme === 'pmegp-special' ? 0.35 : selectedScheme === 'pmegp-general' ? 0.25 : 0)),
          interestRate,
          tenureMonths,
          monthlyEmi: previewEmi,
          totalInterest: previewTotalInterest,
          totalPayable: previewTotalPayable
        }}
      />
    </div>
  );
}
