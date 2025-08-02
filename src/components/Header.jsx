import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
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
  showMenu = false,
  showList = false,
  onMenuPress,
  onListPress,
}) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor}
        translucent={false}
      />
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Text style={[styles.backButtonText, { color: textColor }]}>←</Text>
          </TouchableOpacity>
        )}
        {showMenu && (
          <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
            <Text style={[styles.iconText, { color: textColor }]}>☰</Text>
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
        {showList && (
          <TouchableOpacity onPress={onListPress} style={styles.iconButton}>
            <Text style={[styles.iconText, { color: textColor }]}>☐</Text>
          </TouchableOpacity>
        )}
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
    height:
      Platform.OS === 'ios'
        ? Metrics.headerHeight + 44
        : Metrics.headerHeight + 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.md,
    paddingTop: Platform.OS === 'ios' ? 44 : 24,
    ...Metrics.shadow.large,
    zIndex: Metrics.zIndex.header,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Metrics.fontSize.xl,
    fontWeight: 'bold',
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
    padding: Metrics.md,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: Metrics.fontSize.xl,
    fontWeight: 'bold',
  },
});

export default Header;
