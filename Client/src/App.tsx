import { useState } from "react";
import axios from "axios";
import UploadCard from "./components/UploadCard";
import ResponsePanel from "./components/ResponsePanel";

function App() {
  const [frontImage, setFrontImage] = useState<string>("");
  const [backImage, setBackImage] = useState<string>("");
  const [storedFileNames, setStoredFileNames] = useState({
    frontFileName: null,
    backFileName: null,
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUploadImages = async () => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image1", frontImage);
      formData.append("image2", backImage);

      const response = await axios.post("http://localhost:3000/api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStoredFileNames({
        frontFileName: response.data.fileNames[0],
        backFileName: response.data.fileNames[1],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleParseAadhaar = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/${storedFileNames.frontFileName}/${storedFileNames.backFileName}`
      );
      setApiResponse(response.data.result);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <UploadCard title="Aadhaar Front" onFileSelect={setFrontImage} />
            <UploadCard title="Aadhar Back" onFileSelect={setBackImage} />

            <div className="flex gap-4 mb-4">
              <button
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
                onClick={handleUploadImages}
                disabled={isUploading || !frontImage}
              >
                {isUploading ? "UPLOADING" : "UPLOAD IMAGES"}
              </button>

              <button
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                onClick={handleParseAadhaar}
                disabled={!storedFileNames.frontFileName}
              >
                {isLoading ? "PROCESSING..." : "PARSE AADHAAR"}
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            {apiResponse && <ResponsePanel apiResponse={apiResponse} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
