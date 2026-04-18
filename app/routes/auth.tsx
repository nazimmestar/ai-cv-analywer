import React, {useEffect} from 'react'
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";

export const meta = () => {[
    {title : 'ResumeIQ | Auth'},
    {name : 'description' , content : 'log into your account'},
]
}

const Auth = () => {
     const {isLoading,auth} = usePuterStore();
     const location = useLocation();
     const next = location.search.split("next=")[1] || "/";
     const navigate = useNavigate();
    useEffect(() => {
         if (auth.isAuthenticated) navigate(next);
     }, [auth.isAuthenticated,next]);

     return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-2xl hover:shadow-accent-blue/30 transition-all">
                <section className="flex flex-col gap-8 bg-[#1e293b] rounded-2xl p-10 border border-dark-border">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <h1 className="text-gradient">Welcome Back</h1>
                        <h2 className="text-secondary-text">Log In To Continue Your Job Journey</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse" disabled>
                                <p>Signing you in ...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button hover:primary-gradient-hover transition-all" onClick={auth.signOut}>
                                        👋 Log Out
                                    </button>
                                ) : (
                                    <button className="auth-button hover:primary-gradient-hover transition-all" onClick={auth.signIn}>
                                        🔓 Log In
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
     )
}
export default Auth
