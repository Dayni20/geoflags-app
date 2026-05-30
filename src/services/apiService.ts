import { axiosInstance } from "../api/axiosInstance";
import { Country } from "../types/api";

export const getCountries = async (): Promise<Country[]> => {
  const response = await axiosInstance.get<Country[]>(
    "/all?fields=cca3,name,flags,capital,region,population,currencies"
  );
  return response.data;
};

export const getCountryByCode = async (code: string): Promise<Country> => {
  const response = await axiosInstance.get<Country>(
    `/alpha/${code}?fields=cca3,name,flags,capital,region,population,currencies`
  );
  return response.data;
};
