const ResponsePanel = ({ apiResponse }: any) => {
  const hasData = apiResponse && Object.keys(apiResponse).length > 0;
  return (
    <div>
      {hasData && (
        <div className="bg-white p-4 rounded-md shadow-sm mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Aadhaar Number</p>
              <p className="font-medium">{apiResponse.aadharNumber || "Not Found"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name on Aadhaar</p>
              <p className="font-medium">{apiResponse.name || "Not Found"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of birth</p>
              <p className="font-medium">{apiResponse.dob || "Not Found"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{apiResponse.gender || "Not Found"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">
                {apiResponse.address || "Not Found"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pincode</p>
              <p className="font-medium">
                {apiResponse.pincode || "Not Found"}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-100 p-4 rounded min-h-32">
        {apiResponse ? (
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500 text-center py-8">
            "Start Performing OCR by inputting your Aadhaar front and back"
          </p>
        )}
      </div>
    </div>
  );
};
export default ResponsePanel;
