
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
    <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      {uploadError && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600"
        >
          {uploadError}
        </p>
      )}

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
  );
}
