import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Country } from "../../types/api";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { useCountryDetail } from "../../hooks/useCountries";
import { detailStyles } from "../../styles/appStyle";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

type DetailScreenProps = StackScreenProps<AppStackParamList, "Detail">;

const DEFAULT_FLAG_URL =
  "https://mcstifzdbsbebrkcrcaa.supabase.co/storage/v1/object/public/flags/default-flag.png";

const getCurrencies = (country: Country): string => {
  if (!country.currencies) return "N/A";

  return Object.values(country.currencies)
    .map((currency) =>
      currency.symbol ? `${currency.name} (${currency.symbol})` : currency.name
    )
    .join(", ");
};

export const DetailScreen = ({ route }: DetailScreenProps) => {
  const { code } = route.params;
  const { country, loading, error } = useCountryDetail(code);
  const [imageError, setImageError] = useState<boolean>(false);

  if (loading) {
    return <LoadingSpinner message="Cargando pais..." />;
  }

  if (error || !country) {
    return (
      <View style={detailStyles.errorContainer}>
        <Text style={detailStyles.errorText}>{error || "Pais no encontrado"}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={detailStyles.container}
      contentContainerStyle={detailStyles.content}
    >
      <Image
        source={{ uri: imageError ? DEFAULT_FLAG_URL : country.flags.png }}
        style={detailStyles.flag}
        onError={() => setImageError(true)}
      />

      <View style={detailStyles.divider} />

      <Text style={detailStyles.title}>{country.name.common}</Text>

      <View style={detailStyles.divider} />

      <Text style={detailStyles.bodyLabel}>Nombre oficial</Text>
      <Text style={detailStyles.body}>{country.name.official}</Text>

      <Text style={detailStyles.bodyLabel}>Capital</Text>
      <Text style={detailStyles.body}>{country.capital?.[0] || "N/A"}</Text>

      <Text style={detailStyles.bodyLabel}>Region</Text>
      <Text style={detailStyles.body}>{country.region || "N/A"}</Text>

      <Text style={detailStyles.bodyLabel}>Poblacion</Text>
      <Text style={detailStyles.body}>
        {country.population?.toLocaleString() || "N/A"}
      </Text>

      <Text style={detailStyles.bodyLabel}>Moneda</Text>
      <Text style={detailStyles.body}>{getCurrencies(country)}</Text>
    </ScrollView>
  );
};
