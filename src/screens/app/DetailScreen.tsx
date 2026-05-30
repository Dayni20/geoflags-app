import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Country } from "../../types/country";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { detailStyles, cardStyles } from "../../styles/appStyle";

type DetailScreenProps = StackScreenProps<AppStackParamList, "Detail">;

const getCurrencies = (country: Country): string => {
  if (!country.currencies) return "N/A";

  return Object.values(country.currencies)
    .map((currency) =>
      currency.symbol ? `${currency.name} (${currency.symbol})` : currency.name
    )
    .join(", ");
};

export const DetailScreen = ({ route }: DetailScreenProps) => {
  const { country } = route.params;
  const [imageError, setImageError] = useState(false);

  return (
    <ScrollView
      style={detailStyles.container}
      contentContainerStyle={detailStyles.content}
    >
      {imageError ? (
        <View style={detailStyles.flagFallback}>
          <Text style={cardStyles.badgeText}>Sin imagen</Text>
        </View>
      ) : (
        <Image
          source={{ uri: country.flags.png }}
          style={detailStyles.flag}
          onError={() => setImageError(true)}
        />
      )}

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
