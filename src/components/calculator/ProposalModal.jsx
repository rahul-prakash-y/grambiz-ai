import React, { useId } from 'react';
import { 
  X, 
  Printer, 
  Landmark, 
  ShieldCheck,
} from 'lucide-react';

export default function ProposalModal({
  isOpen,
  onClose,
  data,
  lang,
}) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const {
    category,
    location,
    equipment,
    inventory,
    workingCapital,
    totalProjectCost,
    availableCapital,
    requiredLoanAmount,
    selectedSchemeName,
    subsidyAmount,
    interestRate,
    tenureMonths,
    monthlyEmi,
    totalInterest,
    totalPayable
  } = data;

  const dateStr = new Date().toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Landmark className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-base font-extrabold">
                {lang === 'ta' ? 'வங்கி கடன் திட்ட முன்மொழிவு (DPR)' : 'Bank Loan Proposal & DPR Dossier'}
              </h3>
              <p className="text-xs text-emerald-100/90 font-medium">
                PMEGP & MUDRA Compliant • {category} ({location})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="btn btn-xs sm:btn-sm bg-white hover:bg-emerald-50 text-emerald-900 font-bold border-none rounded-lg gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'அச்சிடு / PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="btn btn-xs sm:btn-sm btn-ghost text-white hover:bg-white/20 rounded-lg p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Printable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 printable-content text-xs sm:text-sm">
          {/* Header Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 block">
                GramBiz AI Micro-Enterprise Financial Feasibility
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">
                {category} Unit Setup Project Proposal
              </h2>
              <span className="text-xs text-slate-500">
                Location: {location} • Date: {dateStr}
              </span>
            </div>
            <div className="text-left sm:text-right">
              <span className="badge badge-success text-white font-bold text-xs py-2 px-3">
                Bank Ready Dossier
              </span>
              <span className="block text-[11px] text-slate-400 mt-1">
                Ref ID: GBZ-202688
              </span>
            </div>
          </div>

          {/* Section 1: Project Cost Estimation Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] inline-flex items-center justify-center font-bold">1</span>
              <span>1. Project Cost Estimation (திட்ட செலவு விவரங்கள்)</span>
            </h4>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="table table-sm w-full bg-white">
                <thead className="bg-slate-50 text-slate-600 text-[11px]">
                  <tr>
                    <th>Item Description</th>
                    <th>Category</th>
                    <th className="text-right">Cost (₹)</th>
                    <th className="text-right">% Share</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-slate-100">
                  <tr>
                    <td className="font-semibold text-slate-800">Machinery, Equipment & POS Tools</td>
                    <td className="text-slate-500">Capital Asset</td>
                    <td className="text-right font-bold text-slate-900">₹{Number(equipment).toLocaleString('en-IN')}</td>
                    <td className="text-right text-slate-500">
                      {totalProjectCost > 0 ? Math.round((equipment / totalProjectCost) * 100) : 0}%
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-slate-800">Initial Inventory, Raw Materials & Goods</td>
                    <td className="text-slate-500">Working Stock</td>
                    <td className="text-right font-bold text-slate-900">₹{Number(inventory).toLocaleString('en-IN')}</td>
                    <td className="text-right text-slate-500">
                      {totalProjectCost > 0 ? Math.round((inventory / totalProjectCost) * 100) : 0}%
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-slate-800">3-Month Operating Working Capital Reserve</td>
                    <td className="text-slate-500">Liquidity Buffer</td>
                    <td className="text-right font-bold text-slate-900">₹{Number(workingCapital).toLocaleString('en-IN')}</td>
                    <td className="text-right text-slate-500">
                      {totalProjectCost > 0 ? Math.round((workingCapital / totalProjectCost) * 100) : 0}%
                    </td>
                  </tr>
                  <tr className="bg-slate-50 font-black text-slate-900">
                    <td colSpan="2">Total Project Cost Outlay</td>
                    <td className="text-right text-emerald-800 text-sm">₹{Number(totalProjectCost).toLocaleString('en-IN')}</td>
                    <td className="text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Means of Finance & Funding Gap */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-800 text-[10px] inline-flex items-center justify-center font-bold">2</span>
              <span>2. Means of Finance & Funding Gap (நிதி இடைவெளி)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">Promoter Self-Equity</span>
                <span className="text-base font-black text-emerald-900 block mt-1">₹{Number(availableCapital).toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-emerald-700">Available capital from entrepreneur</span>
              </div>
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
                <span className="text-[10px] uppercase font-bold text-teal-800 block">Eligible Govt Subsidy</span>
                <span className="text-base font-black text-teal-900 block mt-1">₹{Number(subsidyAmount).toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-teal-700">{selectedSchemeName}</span>
              </div>
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <span className="text-[10px] uppercase font-bold text-sky-800 block">Bank Term Loan Required</span>
                <span className="text-base font-black text-sky-900 block mt-1">₹{Number(requiredLoanAmount).toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-sky-700">To be financed by SBI / Grama Bank</span>
              </div>
            </div>
          </div>

          {/* Section 3: Loan Terms & EMI Repayment Schedule */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 text-[10px] inline-flex items-center justify-center font-bold">3</span>
              <span>3. Loan Terms & EMI Calculation (வங்கி தவணை அட்டவணை)</span>
            </h4>
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Principal Loan</span>
                  <span className="font-extrabold text-slate-800">₹{Number(requiredLoanAmount).toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Interest Rate</span>
                  <span className="font-extrabold text-slate-800">{interestRate}% p.a.</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Loan Tenure</span>
                  <span className="font-extrabold text-slate-800">{tenureMonths} Months ({Math.round(tenureMonths / 12)} Yrs)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Repayment Mode</span>
                  <span className="font-extrabold text-slate-800">Monthly Reducing EMI</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Monthly Equated Installment</span>
                  <span className="text-lg font-black text-emerald-700 block mt-0.5">₹{Number(monthlyEmi).toLocaleString('en-IN')} / mo</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Interest over Tenure</span>
                  <span className="text-lg font-black text-amber-600 block mt-0.5">₹{Number(totalInterest).toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Payout (Principal + Interest)</span>
                  <span className="text-lg font-black text-slate-900 block mt-0.5">₹{Number(totalPayable).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & Signatures */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Prepared in accordance with Ministry of MSME / PMEGP Guidelines.</span>
            </div>
            <div className="text-right">
              <span className="block font-bold text-slate-700">Beneficiary / Applicant Signature</span>
              <span className="text-[10px] text-slate-400">Verified via GramBiz AI System</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="btn btn-sm btn-ghost rounded-xl text-xs font-semibold"
          >
            {lang === 'ta' ? 'மூடு' : 'Close'}
          </button>
          <button
            onClick={handlePrint}
            className="btn btn-sm btn-primary rounded-xl text-xs font-bold gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'அறிக்கையை அச்சிடு' : 'Print Proposal'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
