export interface Country {
  cca3: string;
  flags: Flags;
  name: Name;
  currencies?: Record<string, Currency>;
  capital?: string[];
  region?: Region;
  population?: number;
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Flags {
  png: string;
  svg?: string;
  alt?: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: Record<string, NativeName>;
}

export interface NativeName {
  official: string;
  common: string;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}
