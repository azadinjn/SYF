
import { useState } from "react";
import { useNavigate } from "react-router";

import UploadZone from "../components/layout/upload/UploadZone.jsx";
import RejectedFilesList from "../components/layout/upload/RejectedFilesList.jsx";
import SelectedFiles from "../components/layout/upload/SelectedFiles.jsx";
import UploadActions from "../components/layout/upload/UploadActions.jsx";
import PackageSettings from "../components/layout/upload/PackageSettings.jsx";

import { validateFiles, validateTotalSize } from "../utils/uploadValidation";
import { uploadPackage } from "../services/uploadService.js";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [RejectedFiles, setRejectedFiles] = useState([]);

  const [packageSettings, setPackageSettings] = useState({
    packageName: "",
    password: "",
    expirationHours: 24,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const navigate = useNavigate();

  // Validate files and prevent duplicates
  function handleFiles(newFiles) {
    const result = validateFiles(newFiles);
    const validFiles = result.validFiles;

    setRejectedFiles(result.rejectedFiles);

    setFiles((prev) => {
      const uniqueNewFiles = validFiles.filter(
        (file, index, arr) =>
          arr.findIndex(
            (f) =>
              f.name === file.name &&
              f.size === file.size &&
              f.lastModified === file.lastModified
          ) === index
      );

      const filesToAdd = uniqueNewFiles.filter(
        (newFile) =>
          !prev.some(
            (oldFile) =>
              oldFile.name === newFile.name &&
              oldFile.size === newFile.size &&
              oldFile.lastModified === newFile.lastModified
          )
      );

      return [...prev, ...filesToAdd];
    });
  }

  // Check total files size
  const totalSizeExceeded = validateTotalSize(files);

  // Remove selected file
  function handleRemoveFile(fileToRemove) {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  }

  // Upload package
  async function handleUpload() {
    if (files.length === 0 || totalSizeExceeded || isUploading) {
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files[]", file);
      });

      formData.append("packageName", packageSettings.packageName.trim());

      formData.append(
        "expirationHours",
        String(packageSettings.expirationHours)
      );

      if (packageSettings.password) {
        formData.append("password", packageSettings.password);
      }

      const transfer = await uploadPackage(formData);

      navigate("/code", {
        state: {
          transfer,
        },
      });
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again later."
      );
    } finally {
      setIsUploading(false);
    }
  }

  
return (
  <main className="min-h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-b from-marina-50/40 via-white to-white">
    <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">

      {/* Page Heading */}
      <div className="animate-fade-up space-y-3 text-center">

        <h1 className="text-3xl font-extrabold tracking-tight text-marina-700 sm:text-4xl">
          Upload Your Files
        </h1>

        <p className="mx-auto max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          Select your files, customize your package settings, and share them
          securely with anyone.
        </p>
      </div>

      {/* Upload Error */}
      {uploadError && (
        <p
          role="alert"
          className="animate-fade-up rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600"
        >
          {uploadError}
        </p>
      )}

      {/* Upload Components */}
      <div className="animate-fade-up animation-delay-200 flex flex-col gap-6">
        <UploadZone onFilesSelected={handleFiles} />

        <RejectedFilesList rejectedFiles={RejectedFiles} />

        <SelectedFiles
          files={files}
          onRemove={handleRemoveFile}
        />

        <PackageSettings onSettingsChange={setPackageSettings} />

        <UploadActions
          files={files}
          totalSizeExceeded={totalSizeExceeded}
          onUpload={handleUpload}
          isUploading={isUploading}
        />
      </div>

      {/* Security Note */}
      <p className="animate-fade-up animation-delay-300 text-center text-xs leading-6 text-slate-400">
        Your files are transferred securely and automatically expire
        according to your package settings.
      </p>

    </div>
  </main>
);

}
