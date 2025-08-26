"use client";

import { useRef, useState } from "react";
import convertToBase64 from "../utils/convertToBase64";

export function useImageUpload({
  maxSize,
  onChange,
}: {
  maxSize: number;
  onChange: (value: string) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`El archivo debe ser menor a ${maxSize}MB`);
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten archivos de imagen");
      return;
    }

    setIsUploading(true);

    try {
      const base64String = await convertToBase64(file);

      onChange(base64String);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error al procesar la imagen");
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return {
    isDragOver,
    isUploading,
    fileInputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleClick,
    handleFileChange,
  };
}
