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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { RegisterForm } from "../../types/auth";
import { AuthStackParamList } from "../../navigation/typeNavigation";
import { registerStyles } from "../../styles/appStyle";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

type RegisterScreenProps = StackScreenProps<AuthStackParamList, "Register">;

const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [loading, setLoading] = useState(false);

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (key: keyof RegisterForm, value: string) => {
    setRegisterForm({ ...registerForm, [key]: value });
  };

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    if (!isValidEmail(registerForm.email)) {
      setEmailError("Ingresa un email valido");
      valid = false;
    }

    if (registerForm.password.length < 6) {
      setPasswordError("Minimo 6 caracteres");
      valid = false;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setConfirmError("Las contrasenas no coinciden");
      valid = false;
    }

    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        registerForm.email.trim(),
        registerForm.password
      );
    } catch {
      Alert.alert("Error", "No se pudo registrar el usuario");
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
        contentContainerStyle={registerStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={registerStyles.header}>
          <Text style={registerStyles.title}>Crear cuenta</Text>
          <Text style={registerStyles.subtitle}>Registrate para comenzar</Text>
        </View>

        <View style={registerStyles.form}>
          <Input
            label="Correo electronico"
            placeholder="ejemplo@correo.com"
            value={registerForm.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />
          <Input
            label="Contrasena"
            placeholder="Minimo 6 caracteres"
            value={registerForm.password}
            onChangeText={(value) => handleInputChange("password", value)}
            isPassword
            error={passwordError}
          />
          <Input
            label="Confirmar contrasena"
            placeholder="Repite tu contrasena"
            value={registerForm.confirmPassword}
            onChangeText={(value) =>
              handleInputChange("confirmPassword", value)
            }
            isPassword
            error={confirmError}
          />
          <Button
            title="Registrarse"
            onPress={handleRegister}
            loading={loading}
            style={registerStyles.button}
          />
        </View>

        <View style={registerStyles.footer}>
          <Text style={registerStyles.footerText}>Ya tienes cuenta? </Text>
          <Text style={registerStyles.link} onPress={() => navigation.goBack()}>
            Inicia sesion
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
