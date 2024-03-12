import React, { ChangeEvent } from 'react';

interface FileUploadInputProps {
  onChange: (file: File) => void;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ onChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onChange(file);
    }
  };

  return (
    <input type="file" onChange={handleFileChange} />
  );
};

export default React.memo(FileUploadInput);
