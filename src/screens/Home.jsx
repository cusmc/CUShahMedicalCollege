// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Header from '../components/Header'; // Adjust if in different path
import styles from './HomeStyles';

const Home = ({ navigation }) => {
  const handleMenuPress = () => {
    try {
      // Try different methods to open drawer
      if (navigation?.openDrawer) {
        navigation.openDrawer();
      } else if (navigation?.getParent()?.openDrawer) {
        navigation.getParent().openDrawer();
      } else {
        console.log('Drawer navigation not available');
      }
    } catch (error) {
      console.log('Navigation error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="C U SHAH MEDICAL COLLAGE..."
        showMenu={true}
        onMenuPress={handleMenuPress}
        showList={true}
      />

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Circular Image */}
        <View style={styles.imageContainer}>
          <Text style={styles.mainTitle}>Shari C. U. Shah</Text>
          <Text style={styles.subtitle}>Founder & Visionary {'\n'}</Text>

          <Image
            source={require('../../assets/images/cushah_saheb.jpg')}
            style={styles.profileImage}
            resizeMode="cover"
          />

          {/* Text Content */}
          {/* <View style={styles.textContainer}> */}
          <Text style={styles.paragraph}>
            {'\n'}
            C.U. Shah Medical College is a " Dream come True " of the great
            visionary and philanthropist Shri C. U. Shah.
            {'\n'}
            {'\n'}A man with a mission " Never hurt-ever help ", a person who
            dedicated his life for social upliftment, enhancement of healthcare
            and education in service of humankind not only in the state of
            Gujarat (especially the district of Surendranagar), but also in
            other parts of the Country.
          </Text>
          <Text style={styles.centeredText}>"THE END OF AN ERA"</Text>
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default Home;
