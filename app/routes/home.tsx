import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cv Analyzer" },
    { name: "description", content: "The best way to enhance your Cv" },
  ];
}

export default function Home() {

  const {auth,kv} = usePuterStore();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);


  useEffect(() => {

   const loadResume= async () => {
        setLoadingResumes(true);
        const resumes = (await kv.list('resume:*',true)) as KVItem[];
        const parsedResumes = resumes?.map((resume) => (
            JSON.parse(resume.value) as Resume
     ));
        console.log("parsedResumes",parsedResumes);
        setResumes(parsedResumes || []);
        setLoadingResumes(false);

    }
    loadResume()
  }, []);


  return <main>
    <Navbar />
    <section className= "main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes.length === 0 ? (
          <h2 className="text-secondary-text text-xl font-light">
            No resumes found. Upload your first resume to get AI-powered feedback
          </h2>
        ) : (
          <h2 className="text-secondary-text text-xl font-light">
            Review your submissions and check AI-powered feedback
          </h2>
        )}
      </div>

      {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-12">
            <img src="/images/resume-scan-2.gif" className="w-[200px] rounded-2xl shadow-lg"/>
            <p className="text-secondary-text mt-4 text-lg">Loading your resumes...</p>
          </div>
      )}
      {!loadingResumes && resumes.length>0 && (
        <div className="resumes-section">
          {resumes.map((resume)=> (
              <ResumeCard key ={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes.length ===0 && (
          <div className="flex flex-col items-center justify-center mt-16 gap-6">
              <Link to={"/upload"} className="primary-button w-fit px-8 py-4 text-xl font-semibold rounded-full hover:shadow-lg hover:shadow-accent-blue/30 transition-all">
                📤 Upload Your First Resume
              </Link>
              <p className="text-secondary-text text-center max-w-md">
                Get instant AI-powered analysis and improve your resume based on ATS compatibility and industry standards
              </p>
          </div>
      )}
    </section>

  </main>;
}
