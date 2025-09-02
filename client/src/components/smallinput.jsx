import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useId } from "react";
import { AppContext } from '../context/AppContext';
import { useContext } from "react";
import { useState } from "react";

function Component({ onFileUpload }) {
  const { removeBg } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const handleFileUpload = async (event) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(newFiles);
    if (onFileUpload) {
      onFileUpload(newFiles);
    }
    if (newFiles.length > 0) {
      await removeBg(newFiles[0]);
    }
  };
  const id = useId();
  return (
    <div className="space-y-2 min-w-[300px]">
      <Label htmlFor={id}>File input</Label>
      <Input id={id} className="p-0 pe-3 file:me-3 file:border-0 file:border-e" type="file" onChange={handleFileUpload} accept='image/*' />
    </div>
  );
}

export { Component };