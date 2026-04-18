import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import Deatails from "~/components/Deatails";
import ATS from "~/components/ATS";

export const meta = () => {[
    {title : 'Resumind | Review'},
    {name : 'description' , content : 'Detailed overview of your resume'},
]
}

const Resume = () => {
    const{ auth , isLoading, fs,kv } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [auth.isAuthenticated]);

    const {id} = useParams();
    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);
            if (!resume) return;
            const resumeData = JSON.parse(resume);
            const resumeBlob =  await fs.read(resumeData.resumePath);
            if(!resumeBlob) return;
            const pdfBlob = new Blob([resumeBlob], {type: 'application/pdf'});
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(pdfUrl);

            const imageBlob = await fs.read(resumeData.imagePath);
            if(!imageBlob) return;
            const imgBlob = new Blob([imageBlob], {type: 'image/png'});
            const imgUrl = URL.createObjectURL(imgBlob);
            setImageUrl(imgUrl);

            setFeedback(resumeData.feedback);
            console.log(resumeData);
            console.log({resumeUrl, imageUrl, feedback: resumeData.feedback});
        }
        loadResume();
    }, [id]);

     return (
         <main>
             <nav className='resume-nav'>
                 <Link to='/' className="back-button">
                     <img src="/icons/back.svg" alt="Back" className="w-2.5 h-2.5"/>
                     <span className="font-semibold text-light-text text-sm">← Back to Home Page</span>
                 </Link>
             </nav>
             <div className="flex flex-row w-full max-lg:flex-col-reverse">
                 <section className="feedback-section h-[100vh] sticky top-0 items-center justify-center w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
                     {imageUrl && resumeUrl &&(
                         <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                             <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                 <img
                                     src={imageUrl}
                                     className="w-full h-full object-contain rounded-2xl shadow-lg"
                                     title="resume"
                                     alt="Resume Preview"
                                 />
                             </a>
                         </div>
                     )}
                 </section>
                 <section className="feedback-section bg-gradient-to-br from-[#0f172a] via-[#1a1a2e] to-[#1e293b]">
                     <h2 className="text-4xl text-light-text font-bold">
                         📋 Resume Review
                     </h2>
                     {feedback
                         ? (
                             <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                                 <Summary feedback={feedback} />
                                 <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
                                 <Deatails feedback={feedback} />
                             </div>
                         )
                         :(
                             <div className="flex flex-col items-center justify-center gap-4">
                                 <img src="/images/resume-scan-2.gif" alt="Loading" className="w-[200px] rounded-2xl"/>
                                 <p className="text-secondary-text">Analyzing your resume...</p>
                             </div>
                         )
                     }
                 </section>
             </div>
         </main>
     )
}
export default Resume
