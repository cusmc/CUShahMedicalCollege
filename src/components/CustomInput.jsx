import React, { useState } from 'react';
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
  const animatedValue = new Animated.Value(value ? 1 : 0);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onBlur && onBlur();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputStyle = () => {
    const baseStyle = [styles.input];

    if (isFocused) {
      baseStyle.push(styles.inputFocused);
    }

    if (error) {
      baseStyle.push(styles.inputError);
    }

    if (!editable) {
      baseStyle.push(styles.inputDisabled);
    }

    return baseStyle;
  };

  const getLabelStyle = () => {
    const baseStyle = [styles.label];

    if (isFocused || value) {
      baseStyle.push(styles.labelFocused);
    }

    if (error) {
      baseStyle.push(styles.labelError);
    }

    return baseStyle;
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Animated.Text
          style={[
            getLabelStyle(),
            labelStyle,
            {
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
                  }),
                },
              ],
            },
          ]}
        >
          {label}
        </Animated.Text>
      )}

      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          style={[getInputStyle(), textInputStyle]}
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
              {showPassword ? '👁️' : '👁️‍🗨️'}
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
    fontSize: Metrics.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Metrics.xs,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  labelFocused: {
    color: Colors.primary,
    fontSize: Metrics.fontSize.xs,
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
  input: {
    flex: 1,
    paddingHorizontal: Metrics.md,
    paddingVertical: Metrics.sm,
    fontSize: Metrics.fontSize.md,
    color: Colors.textPrimary,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  inputError: {
    borderColor: Colors.error,
  },
  inputDisabled: {
    backgroundColor: Colors.grayLighter,
    color: Colors.textTertiary,
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
