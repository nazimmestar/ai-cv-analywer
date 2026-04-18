import React from 'react'

interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
     // Determine background gradient based on score
     const bgClass = score > 69
         ? 'from-green-900/30 to-green-800/10'
         : score > 49
             ? 'from-yellow-900/30 to-yellow-800/10'
             : 'from-red-900/30 to-red-800/10';

     // Determine icon based on score
     const iconSrc = score > 69
         ? '/icons/ats-good.svg'
         : score > 49
             ? '/icons/ats-warning.svg'
             : '/icons/ats-bad.svg';

     // Determine subtitle based on score
     const subtitle = score > 69
         ? 'Great Job!'
         : score > 49
             ? 'Good Start'
             : 'Needs Improvement';

     // Determine text colors
     const titleColor = score > 69 ? 'text-green-400' : score > 49 ? 'text-yellow-400' : 'text-red-400';

     return (
         <div className={`bg-gradient-to-b ${bgClass} border border-dark-border rounded-2xl shadow-lg w-full p-6`}>
             {/* Top section with icon and headline */}
             <div className="flex items-center gap-4 mb-6">
                 <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
                 <div>
                     <h2 className={`text-2xl font-bold ${titleColor}`}>ATS Score - {score}/100</h2>
                 </div>
             </div>

             {/* Description section */}
             <div className="mb-6">
                 <h3 className="text-xl font-semibold mb-2 text-light-text">{subtitle}</h3>
                 <p className="text-secondary-text mb-4">
                     This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
                 </p>

                 {/* Suggestions list */}
                 <div className="space-y-3">
                     {suggestions.map((suggestion, index) => (
                         <div key={index} className="flex items-start gap-3 bg-[#0f172a]/50 p-3 rounded-lg border border-dark-border">
                             <img
                                 src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                                 alt={suggestion.type === "good" ? "Check" : "Warning"}
                                 className="w-5 h-5 mt-1 flex-shrink-0"
                             />
                             <p className={suggestion.type === "good" ? "text-green-400" : "text-yellow-400"}>
                                 {suggestion.tip}
                             </p>
                         </div>
                     ))}
                 </div>
             </div>

             {/* Closing encouragement */}
             <p className="text-secondary-text italic">
                 Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
             </p>
         </div>
     )
}

export default ATS