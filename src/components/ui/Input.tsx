import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { inputStyles } from '../../styles/appStyle';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

export const Input = ({
  label,
  error,
  isPassword = false,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.label}>{label}</Text>
      <View style={inputStyles.inputWrapper}>
        <TextInput
          {...props}
          secureTextEntry={isPassword && !showPassword}
          style={[inputStyles.input, error ? inputStyles.inputError : null]}
          placeholderTextColor="#A0AEC0"
        />
        {isPassword && (
          <TouchableOpacity
            style={inputStyles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={inputStyles.eyeText}>{showPassword ? 'Ocultar' : 'Ver'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={inputStyles.errorText}>{error}</Text> : null}
    </View>
  );
};
