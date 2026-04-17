import React, {useCallback, useState} from 'react'
import {useDropzone} from "react-dropzone";
import {formatSize} from "~/lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void,
}

const FileUploader = ({onFileSelect} : FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback( (acceptedFiles : File[])  => {
        const file = acceptedFiles[0] || null;
        setSelectedFile(file);
        onFileSelect?.(file);
    }, [onFileSelect]);

    const {getRootProps, getInputProps, isDragActive,acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept : {'application/pdf': ['.pdf']},
        maxSize: 20 * 1024 * 1024,
    })

    return (

        <div className="w-full gradient-border">
            <div {...getRootProps()} className="space-y-4 cursor-pointer">
                <input {...getInputProps()} />


                {selectedFile ?
                    (<div className="uploader-selected-file " onClick={(e) => e.stopPropagation() }>
                            <img src="/images/pdf.png" alt="pdf" className="size-10"/>
                            <div className="flex item-center space-x-3">

                                <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{selectedFile.name}</p>
                                <p className="text-sm text-gray-500">{formatSize(selectedFile.size)}</p>
                            </div>

                            <button type="button" className="p-2 cursor-pointer" onClick={(e) => { setSelectedFile(null); onFileSelect?.(null); }}>
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4"/>
                            </button>
                    </div>

                    ) :(
                            <div>
                                <div className="mx-auto w-16 h-16 flex items-center justify-cente mb-6">
                                    <img src = "/icons/info.svg" alt="upload" className="size-20"/>
                                </div>
                                <p className="text-lg text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop a
                                </p>
                                    <p className="text-gray-500">PDF (max 20MB)</p>

                            </div>

                    ) }

            </div>

        </div>
    )
}
export default FileUploader
