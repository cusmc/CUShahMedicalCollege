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
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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
          <TouchableOpacity onPress={onBackPress}>
            <Text style={[styles.backButtonText, { color: textColor }]}>
              <Icon name="arrow-back-outline" size={28} color="#fff" />
            </Text>
          </TouchableOpacity>
        )}
        {showMenu && (
          <TouchableOpacity onPress={onMenuPress}>
            {/* <Text style={[styles.iconText, { color: textColor }]}>☰</Text> */}
            <Menu name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        )}
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
            {leftIcon}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
          {title}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        {showList && (
          <TouchableOpacity onPress={onListPress}>
            {/* <Text style={[styles.iconText, { color: textColor }]}>☐</Text> */}
            <MaterialCommunityIcons
              name="postage-stamp"
              size={28}
              color={textColor}
            />
          </TouchableOpacity>
        )}
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
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
    padding: Metrics.md,
  },
  backButtonText: {
    fontSize: Metrics.fontSize.largeTitle,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;
