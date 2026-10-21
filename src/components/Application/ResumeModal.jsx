import React from "react";

const ResumeModal = ({ resumeUrl, onClose }) => {
    // const previewUrl = imageUrl.replace("/view", "/preview");
    // debugger
    console.log(resumeUrl,"imageUrl");
    
  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
  <div className="relative w-full max-w-3xl rounded-lg bg-white p-4 shadow-lg">
    <button
      className="absolute right-3 top-2 text-2xl text-gray-500 hover:text-red-500"
      onClick={onClose}
    >
      &times;
    </button>

    <h2 className="mb-3 text-lg font-semibold text-gray-800">
      Resume Preview
    </h2>

    <a
            target={"_blank"}
            href={resumeUrl}
            className="flex justify-start items-center gap-1"
            rel="noreferrer"
          >
            <span>View Resume</span>
            {/* <RiProfileLine /> */}
          </a>
  </div>
</div>
  );
};

export default ResumeModal;
