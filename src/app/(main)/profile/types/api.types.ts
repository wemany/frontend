export interface ApiCurrency {
  id: string;
  code: string;
  name: string;
  symbol: string;
}

export interface ApiLanguage {
  id: string;
  code: string;
  name: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  icon: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    currencies: ApiCurrency[];
    languages: ApiLanguage[];
    categories: ApiCategory[];
  };
}

export interface Currency {
  id: string;
  value: string;
  label: string;
  symbol: string;
}

export interface Language {
  id: string;
  value: string;
  label: string;
  flag: string;
}

export interface Category {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface TransformedData {
  currencies: Currency[];
  languages: Language[];
  categories: Category[];
}
