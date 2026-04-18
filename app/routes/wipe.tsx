import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

     if (isLoading) {
         return <main className="min-h-screen flex items-center justify-center">
            <div className="text-light-text text-xl">Loading...</div>
         </main>;
     }

     if (error) {
         return <main className="min-h-screen flex items-center justify-center">
            <div className="text-red-400 text-xl">Error: {error}</div>
         </main>;
     }

     return (
         <main className="min-h-screen py-10">
             <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto px-4">
                 <h1 className="text-light-text text-center">Data Management</h1>
                 <div className="w-full bg-[#1e293b] rounded-2xl p-6 border border-dark-border">
                     <p className="text-light-text font-semibold mb-2">Authenticated as:</p>
                     <p className="text-accent-light-blue">{auth.user?.username}</p>
                 </div>

                 <div className="w-full">
                     <h2 className="text-light-text font-semibold mb-4">Existing Files:</h2>
                     <div className="flex flex-col gap-3 bg-[#1e293b] rounded-2xl p-6 border border-dark-border max-h-[400px] overflow-y-auto">
                         {files.length > 0 ? (
                             files.map((file) => (
                                 <div key={file.id} className="flex flex-row gap-4 items-center p-3 bg-[#0f172a]/50 rounded-lg border border-dark-border hover:border-accent-light-blue transition-all">
                                     <p className="text-secondary-text text-sm flex-1">{file.name}</p>

                                 </div>
                             ))
                         ) : (
                             <p className="text-secondary-text text-center py-8">No files found</p>
                         )}
                     </div>
                 </div>

                 <button
                     className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full cursor-pointer font-semibold transition-all hover:shadow-lg hover:shadow-red-600/30"
                     onClick={() => handleDelete()}
                 >
                     🗑️ Wipe All App Data
                 </button>
             </div>
         </main>
     );
};

export default WipeApp;