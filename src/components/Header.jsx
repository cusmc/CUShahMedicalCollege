import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  backgroundColor = Colors.primary,
  textColor = Colors.white,
  showBackButton = false,
  onBackPress,
}) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Text style={[styles.backButtonText, { color: textColor }]}>←</Text>
          </TouchableOpacity>
        )}
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
            {leftIcon}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Metrics.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.md,
    ...Metrics.shadow.large,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 60,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    padding: Metrics.sm,
  },
  backButtonText: {
    fontSize: Metrics.fontSize.xl,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: Metrics.sm,
  },
});

export default Header;
