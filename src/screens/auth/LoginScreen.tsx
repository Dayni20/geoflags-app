import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { LoginForm } from "../../types/auth";
import { AuthStackParamList } from "../../navigation/typeNavigation";
import { loginStyles } from "../../styles/appStyle";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

type LoginScreenProps = StackScreenProps<AuthStackParamList, "Login">;

const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleInputChange = (key: keyof LoginForm, value: string) => {
    setLoginForm({ ...loginForm, [key]: value });
  };

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!isValidEmail(loginForm.email)) {
      setEmailError("Ingresa un email valido");
      valid = false;
    }

    if (loginForm.password.length < 6) {
      setPasswordError("La contrasena debe tener al menos 6 caracteres");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        loginForm.email.trim(),
        loginForm.password
      );
    } catch {
      Alert.alert("Error", "No se pudo iniciar sesion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={loginStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={loginStyles.header}>
          <Text style={loginStyles.title}>GeoFlags</Text>
          <Text style={loginStyles.subtitle}>Inicia sesion para continuar</Text>
        </View>

        <View style={loginStyles.form}>
          <Input
            label="Correo electronico"
            placeholder="ejemplo@correo.com"
            value={loginForm.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />
          <Input
            label="Contrasena"
            placeholder="Minimo 6 caracteres"
            value={loginForm.password}
            onChangeText={(value) => handleInputChange("password", value)}
            isPassword
            error={passwordError}
          />
          <Button
            title="Iniciar sesion"
            onPress={handleLogin}
            loading={loading}
            style={loginStyles.button}
          />
        </View>

        <View style={loginStyles.footer}>
          <Text style={loginStyles.footerText}>No tienes cuenta? </Text>
          <Text
            style={loginStyles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Registrate
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
