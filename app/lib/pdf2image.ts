export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
        // Set the worker source to use local file
        // Try local first, fallback to CDN
        lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        pdfjsLib = lib;
        isLoading = false;
        return lib;
    }).catch((err) => {
        isLoading = false;
        loadPromise = null;
        throw new Error(`Failed to load PDF.js library: ${err.message}`);
    });

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        const lib = await loadPdfJs();

        if (!lib || !lib.getDocument) {
            throw new Error("PDF.js library failed to load");
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;

        if (!pdf) {
            throw new Error("Failed to load PDF document");
        }

        const page = await pdf.getPage(1);

        if (!page) {
            throw new Error("Failed to get first page from PDF");
        }

        const viewport = page.getViewport({ scale: 4 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Failed to get canvas 2D context");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        const renderTask = page.render({ canvasContext: context, viewport });
        await renderTask.promise;

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        // Create a File from the blob with the same name as the pdf
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob from canvas",
                        });
                    }
                },
                "image/png",
                1.0
            );
        });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${errorMessage}`,
        };
    }
}