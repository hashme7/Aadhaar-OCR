import React, { useState } from "react";

const UploadCard = ({
  title,
  onFileSelect,
}: {
  title: string;
  onFileSelect: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [preview, setPreview] = useState<string | ArrayBuffer>("");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-6">
      <p className="text-gray-600 mb-2">{title}</p>
      <div className="bg-white p-6 rounded shadow-sm">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-8 cursor-pointer hover:border-blue-500 transition-colors"
          onClick={() => document.getElementById(`upload-${title}`)?.click()}
        >
          {preview ? (
            <img
              src={preview.toString() || ""}
              alt={title}
              className="max-h-48 mb-3"
            />
          ) : (
            <>
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="text-indigo-500 text-sm">
                Click here to Upload/Capture
              </p>
            </>
          )}
          <input
            type="file"
            id={`upload-${title}`}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};
export default UploadCard;
