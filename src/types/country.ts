export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
  };
  capital?: string[];
  region?: string;
  population?: number;
  currencies?: Record<string, { name: string; symbol: string }>;
}
