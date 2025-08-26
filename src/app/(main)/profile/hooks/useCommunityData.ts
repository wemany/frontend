"use client";

import { useState } from "react";
import { ApiResponse, TransformedData } from "../types/api.types";

const transformApiData = (apiData: ApiResponse["data"]): TransformedData => {
  return {
    currencies: apiData.currencies.map((currency) => ({
      id: currency.id,
      value: currency.code,
      label: currency.name,
      symbol: currency.symbol,
    })),
    languages: apiData.languages.map((language) => ({
      id: language.id,
      value: language.code,
      label: language.name,
      flag: "🌐",
    })),
    categories: apiData.categories.map((category) => ({
      id: category.id,
      value: category.name.toLowerCase().replace(/\s+/g, "_"),
      label: category.name,
      icon: category.icon,
    })),
  };
};

export const useCommunityData = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState<TransformedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCommunityData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/community/utils`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      if (response.status !== 200) {
        console.error("Error fetching community data:", result);
        setIsDialogOpen(false);
      }

      const transformedData = transformApiData(result.data);
      setData(transformedData);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching community data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  return {
    isLoading,
    isDialogOpen,
    data,
    setIsDialogOpen,
    handleCloseDialog,
    fetchCommunityData,
  };
};
