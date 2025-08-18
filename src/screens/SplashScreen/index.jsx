import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';
import { Strings } from '../../constants/Strings';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: Metrics.animation.normal,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: Metrics.animation.slow,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    // Auto navigate after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, logoAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim, scale: logoAnim }],
          alignItems: 'center',
        }}
      >
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/cusmc_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* App Name */}
        <Animated.View
          style={{
            opacity: logoAnim,
            alignItems: 'center',
          }}
        >
          <Text style={styles.appName}>{Strings.appName}</Text>
          <Text style={styles.tagline}>{Strings.appTagline}</Text>
        </Animated.View>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          {[0, 1, 2].map(index => (
            <Animated.View
              key={index}
              style={{
                opacity: logoAnim,
                transform: [
                  {
                    translateY: logoAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
                width: 12,
                height: 12,
                backgroundColor: Colors.white,
                borderRadius: 6,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
