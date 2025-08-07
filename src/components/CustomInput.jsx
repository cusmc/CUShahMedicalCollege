import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  editable = true,
  error,
  onBlur,
  onFocus,
  style,
  textInputStyle,
  labelStyle,
  errorStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur && onBlur();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const labelAnimatedStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [18, -8],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.85],
        }),
      },
    ],
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Animated.Text
          style={[
            styles.label,
            labelAnimatedStyle,
            labelStyle,
            error && styles.labelError,
          ]}
        >
          {label}
        </Animated.Text>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          !editable && styles.inputDisabled,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, textInputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          placeholderTextColor={Colors.grayLight}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={togglePasswordVisibility}
          >
            <Text style={styles.passwordToggle}>
              {showPassword ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && !secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.md,
  },
  label: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
    fontSize: Metrics.fontSize.sm,
    color: Colors.textSecondary,
    backgroundColor: Colors.white,
    paddingHorizontal: 4,
  },
  labelError: {
    color: Colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Metrics.borderRadius.md,
    backgroundColor: Colors.white,
    minHeight: Metrics.inputHeight,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  inputError: {
    borderColor: Colors.error,
  },
  inputDisabled: {
    backgroundColor: Colors.grayLighter,
  },
  input: {
    flex: 1,
    paddingLeft: Metrics.md,
    paddingRight: Metrics.xl, // extra right padding to avoid overlap with icons
    paddingVertical: Metrics.sm,
    fontSize: Metrics.fontSize.md,
    color: Colors.textPrimary,
  },
  leftIconContainer: {
    paddingLeft: Metrics.md,
    paddingRight: Metrics.sm,
  },
  rightIconContainer: {
    paddingRight: Metrics.md,
    paddingLeft: Metrics.sm,
  },
  passwordToggle: {
    fontSize: Metrics.fontSize.lg,
  },
  errorText: {
    fontSize: Metrics.fontSize.sm,
    color: Colors.error,
    marginTop: Metrics.xs,
    marginLeft: Metrics.sm,
  },
});

export default CustomInput;
