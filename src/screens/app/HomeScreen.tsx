import React, { useState } from "react";
import { Alert, View, Text, FlatList, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useAuth } from "../../hooks/useAuth";
import { useCountries } from "../../hooks/useCountries";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { logout } from "../../services/authService";
import { homeStyles } from "../../styles/appStyle";
import { Input } from "../../components/ui/Input";
import { CountryCard } from "../../components/ui/Card";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

type HomeScreenProps = StackScreenProps<AppStackParamList, "Home">;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useAuth();
  const { countries, loading, error } = useCountries();
  const [search, setSearch] = useState<string>("");

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handleLogout = () => {
    Alert.alert("Cerrar sesion", "Estas seguro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: () => logout() },
    ]);
  };

  if (loading) {
    return <LoadingSpinner message="Cargando paises..." />;
  }

  if (error) {
    return (
      <View style={homeStyles.errorContainer}>
        <Text style={homeStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <View>
          <Text style={homeStyles.greeting}>GeoFlags</Text>
          <Text style={homeStyles.email} numberOfLines={1}>
            {user?.email}
          </Text>
        </View>
        <TouchableOpacity style={homeStyles.logoutBtn} onPress={handleLogout}>
          <Text style={homeStyles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <Text style={homeStyles.sectionTitle}>Paises</Text>

      <View style={homeStyles.list}>
        <Input
          label="Buscar"
          placeholder="Nombre del pais"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.name.common}
        renderItem={({ item }) => (
          <CountryCard
            country={item}
            onPress={() => navigation.navigate("Detail", { code: item.cca3 })}
          />
        )}
        ListEmptyComponent={
          <View style={homeStyles.errorContainer}>
            <Text style={homeStyles.errorText}>No hay resultados</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.list}
      />
    </View>
  );
};
