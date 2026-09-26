import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Robust PDF Export function for the AI Advisory Feasibility Report.
 * Uses html2canvas + jsPDF with a pure jsPDF programmatic fallback.
 */
export async function exportAdvisoryReportToPdf({
  elementId = 'feasibility-report-container',
  category = 'Grocery',
  location = 'Kallupatti Village, Madurai',
  investment = 250000,
  viabilityScore = 94,
  breakEven = '5 - 7 months',
  monthlyProfit = '₹38,000 - ₹52,000',
  subsidyAmount = '₹87,500',
  subsidyScheme = 'PMEGP Rural Entrepreneur Subsidy (35% Grant)',
  swotData,
  insightsData,
  schemesData,
  _lang = 'en'
}) {
  const timestamp = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const fileName = `GramBiz_AI_Advisory_Report_${category.replace(/\s+/g, '_')}_${Date.now()}.pdf`;

  // 1. Attempt html2canvas capture
  const element = document.getElementById(elementId);
  if (element) {
    try {
      // Temporarily apply printable styling
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const printWidth = pageWidth - (margin * 2);
      const imgHeight = (canvas.height * printWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;
      let page = 1;

      // First page
      pdf.addImage(imgData, 'JPEG', margin, position, printWidth, imgHeight);
      heightLeft -= (pageHeight - (margin * 2));

      // Subsequent pages if content overflows A4 height
      while (heightLeft > 0) {
        position = margin - (page * (pageHeight - (margin * 2)));
        pdf.addPage();
        page += 1;
        pdf.addImage(imgData, 'JPEG', margin, position, printWidth, imgHeight);
        heightLeft -= (pageHeight - (margin * 2));
      }

      pdf.save(fileName);
      return { success: true, method: 'canvas' };
    } catch (canvasErr) {
      console.warn('html2canvas export failed, falling back to programmatic PDF:', canvasErr);
    }
  }

  // 2. Programmatic jsPDF Fallback Generator
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [6, 95, 70]; // Emerald 800
    const secondaryColor = [15, 118, 110]; // Teal 700
    const textColor = [30, 41, 59]; // Slate 800
    const grayColor = [100, 116, 139]; // Slate 500

    // Top Header Banner
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 28, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('GramBiz AI — Rural Business Feasibility Appraisal', 14, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Official Advisory Dossier | Verified for PMEGP, MUDRA & NABARD Subsidies`, 14, 18);
    doc.text(`Generated on: ${timestamp} | Location: ${location}`, 14, 23);

    let y = 36;

    // Executive Summary Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, y, 182, 34, 3, 3, 'FD');

    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Target Enterprise: ${category} Unit`, 18, y + 8);

    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Initial Capital Budget: Rs. ${Number(investment).toLocaleString('en-IN')}`, 18, y + 15);
    doc.text(`Projected Monthly Net Profit: ${monthlyProfit}`, 18, y + 21);
    doc.text(`Estimated Break-Even Period: ${breakEven}`, 18, y + 27);

    doc.setTextColor(5, 150, 105);
    doc.setFont('helvetica', 'bold');
    doc.text(`Viability Score: ${viabilityScore}% (High Potential)`, 115, y + 15);
    doc.setTextColor(...secondaryColor);
    doc.text(`Subsidy Allocation: ${subsidyAmount}`, 115, y + 21);
    doc.setFont('helvetica', 'normal');
    doc.text(`Recommended: ${subsidyScheme.substring(0, 36)}...`, 115, y + 27);

    y += 42;

    // Section 1: SWOT Analysis Heading
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('1. Strategic SWOT Analysis', 14, y);
    doc.setDrawColor(...primaryColor);
    doc.line(14, y + 2, 196, y + 2);

    y += 8;

    // SWOT Summary Grid in PDF
    const swot = swotData || {};
    const strengths = swot.strengths || [];
    const weaknesses = swot.weaknesses || [];
    const opportunities = swot.opportunities || [];
    const threats = swot.threats || [];

    // Strengths
    doc.setTextColor(4, 120, 87);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('STRENGTHS (Internal Advantages)', 14, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...textColor);
    strengths.slice(0, 3).forEach((item) => {
      y += 4.5;
      const text = `* ${item.text}`;
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 14, y);
      y += (splitText.length - 1) * 3.5;
    });

    y += 7;

    // Weaknesses
    doc.setTextColor(180, 83, 9);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('WEAKNESSES (Internal Constraints)', 14, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...textColor);
    weaknesses.slice(0, 2).forEach((item) => {
      y += 4.5;
      const text = `* ${item.text}`;
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 14, y);
      y += (splitText.length - 1) * 3.5;
    });

    y += 7;

    // Opportunities
    doc.setTextColor(2, 132, 199);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('OPPORTUNITIES (Market Growth Levers)', 14, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...textColor);
    opportunities.slice(0, 2).forEach((item) => {
      y += 4.5;
      const text = `* ${item.text}`;
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 14, y);
      y += (splitText.length - 1) * 3.5;
    });

    y += 7;

    // Threats
    doc.setTextColor(225, 29, 72);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('THREATS (External Risks & Competition)', 14, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...textColor);
    threats.slice(0, 2).forEach((item) => {
      y += 4.5;
      const text = `* ${item.text}`;
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 14, y);
      y += (splitText.length - 1) * 3.5;
    });

    // PAGE 2: Market Insights & Schemes
    doc.addPage();
    let y2 = 18;

    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('2. Hyper-Local Market Insights', 14, y2);
    doc.setDrawColor(...primaryColor);
    doc.line(14, y2 + 2, 196, y2 + 2);

    y2 += 8;
    const insights = insightsData || [];
    insights.slice(0, 4).forEach((ins) => {
      doc.setTextColor(...textColor);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(`[${ins.category}] ${ins.metric ? '— ' + ins.metric : ''}`, 14, y2);
      y2 += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const splitIns = doc.splitTextToSize(ins.text, 180);
      doc.text(splitIns, 14, y2);
      y2 += (splitIns.length * 4) + 2;
    });

    y2 += 4;

    // Section 3: Recommended Government Schemes
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('3. Recommended Government Schemes & Capital Grants', 14, y2);
    doc.setDrawColor(...primaryColor);
    doc.line(14, y2 + 2, 196, y2 + 2);

    y2 += 8;
    const schemes = schemesData || [];
    schemes.slice(0, 3).forEach((sch) => {
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, y2, 182, 22, 2, 2, 'FD');

      doc.setTextColor(...primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(`${sch.shortCode}: ${sch.name}`, 18, y2 + 5);

      doc.setTextColor(4, 120, 87);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(`MAX SUBSIDY: ${sch.maxSubsidy}`, 18, y2 + 10);

      doc.setTextColor(...textColor);
      doc.setFont('helvetica', 'normal');
      doc.text(`ELIGIBILITY: ${sch.eligibility.substring(0, 90)}...`, 18, y2 + 15);

      doc.setTextColor(...grayColor);
      doc.text(`Nodal Agency: ${sch.nodalAgency} | Interest: ${sch.interestRate}`, 18, y2 + 19);

      y2 += 26;
    });

    // Footer on page 2
    doc.setFontSize(8);
    doc.setTextColor(...grayColor);
    doc.text('GramBiz AI Report • PMEGP & NABARD Bankable Dossier • Helpline: 1800-180-1551', 14, 285);

    doc.save(fileName);
    return { success: true, method: 'programmatic' };
  } catch (err) {
    console.error('All PDF export methods failed:', err);
    throw err;
  }
}
