"use client";
import React, { useState, useContext } from "react";
import { FileUpload } from "./ui/file-upload";
import { AppContext } from '../context/AppContext';

export function FileUploadDemo({ onFileUpload }) {
  const { removeBg } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const handleFileUpload = async (newFiles) => {
    
    setFiles(newFiles);
    if (onFileUpload) {
      onFileUpload(newFiles);
    }
    if (newFiles && newFiles.length > 0) {
      
      await removeBg(newFiles[0]);
    }
  };

  const handlePush = () => {
    if (files.length > 0) {
      console.log('Pushed file:', files[0]);
    } else {
      console.log('No file to push');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} accept='image/*' />
    </div>
  );
}
