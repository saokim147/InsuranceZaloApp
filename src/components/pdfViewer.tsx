import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfView({ base64String }: { base64String: string }) {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(2);
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }
  return (
    <div className="border border-gray-300 rounded-lg overflow-auto max-h-96 w-full">
      <div className="flex">
        <Button
          size="icon"
          className=" -ml-px border rounded-r-none font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10   transition-all"
          onClick={() => setScale(scale + 0.5)}
        >
          <PlusIcon />
        </Button>
        <Button
          size="icon"
          className=" -ml-px rounded-l-none  border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10   transition-all"
          onClick={() => {
            if (scale > 1) {
              setScale(scale - 0.5);
            }
          }}
        >
          <MinusIcon size={25} />
        </Button>
      </div>
      <Document
        file={`data:application/pdf;base64,${base64String}`}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error("Failed to load PDF:", error)}
        className="flex flex-col"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div className="flex">
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={400}
              height={400}
              scale={1 * scale}
              className="mb-4 shadow-lg w-full"
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
