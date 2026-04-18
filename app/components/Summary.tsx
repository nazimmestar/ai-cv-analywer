import React from 'react'
import ScoreGauge from "~/components/Score50";
import Score50 from "~/components/Score50";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({title,score}:{title:string,score:number}) => {
   const textColor = score > 70 ? "text-green-400" : score >49 ? "text-yellow-400" : "text-red-400";
     return (
         <div className="resume-summary">
             <div className="category">
                 <div className="flex flex-row gap-2 items-center justify-center">
                     <p className="text-2xl text-light-text">{title}</p>
                     <ScoreBadge score={score} />
                 </div>
                 <p className="text-2xl">
                     <span className={textColor}>{score}</span>
                     <span className="text-secondary-text">/100</span>
                 </p>
             </div>
         </div>
     )
}

const Summary = ({feedback}:{feedback:Feedback}) => {
     return (
         <div className="bg-[#1e293b] rounded-2xl shadow-lg border border-dark-border w-full">
             <div className="flex flex-row gap-8 p-4">
                 <Score50 score={feedback.overallScore}/>
                 <div>
                     <h2 className="text-2xl font-bold text-light-text">Your Resume Score</h2>
                     <p className="text-sm text-secondary-text">
                         This score is calculated based on the variables listed below
                     </p>
                 </div>
             </div>
             <Category title="Tone and Style" score={feedback.toneAndStyle.score}/>
             <Category title="Content" score={feedback.content.score}/>
             <Category title="Structure" score={feedback.structure.score}/>
             <Category title="Skills" score={feedback.skills.score}/>
         </div>
     )
}
export default Summary
