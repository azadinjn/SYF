const allowedExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "pdf",
  "txt",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "csv",
  "zip",
  "mp3",
  "wav",
  "ogg",
  "mp4",
  "webm",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024;


function validateFilesType(files) {
  const regecedFiles = files.filter((file) => {
    return !allowedExtensions.includes(file.name.split(".")[1]);
  });
  return regecedFiles;
}
function validateFileSize(files) {
  const regecedFiles = files.filter((file) => {
    return file.size > MAX_FILE_SIZE;
  });
  return regecedFiles;
}
export function calculateTotalSize(files) {
  return files.reduce((totalSize, file) => totalSize + file.size, 0);
}

export const validateTotalSize = (files) => calculateTotalSize(files) > MAX_FILE_SIZE;

export function validateFiles(files) {
    const invalidFilesType = validateFilesType(files);
    const invalidFilesSize = validateFileSize(files);

    const rejectedFiles = [
        {
            files: invalidFilesType,
            message: "Invalid file type"
        },
        {
            files: invalidFilesSize,
            message: "File size exceeds 10 MB"
        }
    ].filter((item) => item.files.length > 0);

    const validFiles = files.filter(
        (file) =>
            !invalidFilesType.includes(file) &&
            !invalidFilesSize.includes(file)
    );

    return {
        validFiles,
        rejectedFiles
    };
}


