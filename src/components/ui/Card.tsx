import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Country } from '../../types/country';
import { cardStyles } from '../../styles/appStyle';

interface CountryCardProps {
  country: Country;
  onPress: () => void;
}

export const CountryCard = ({ country, onPress }: CountryCardProps) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <TouchableOpacity
      style={cardStyles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={cardStyles.countryRow}>
        {imageError ? (
          <View style={cardStyles.flagFallback}>
            <Text style={cardStyles.badgeText}>Sin imagen</Text>
          </View>
        ) : (
          <Image
            source={{ uri: country.flags.png }}
            style={cardStyles.flag}
            onError={() => setImageError(true)}
          />
        )}
        <View style={cardStyles.content}>
          <Text
            style={cardStyles.title}
            numberOfLines={1}
          >
            {country.name.common}
          </Text>
          <Text
            style={cardStyles.body}
            numberOfLines={1}
          >
            {country.region || 'N/A'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
