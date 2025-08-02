// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Header from '../components/Header'; // Adjust if in different path
import styles from './styles';

const Home = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="C U SHAH MEDICAL COLLEG..." showList={true} />

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Shri C. U. Shah</Text>
          <Text style={styles.subtitle}>Founder & Visionary</Text>
        </View>

        {/* Circular Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/cushah_saheb.jpg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>
            C.U. Shah Medical College is a " Dream come True " of the great
            visionary and philanthropist Shri C. U. Shah.
          </Text>
          <Text style={styles.paragraph}>
            A man with a mission " Never hurt-ever help ", a person who
            dedicated his life for social upliftment, enhancement of healthcare
            and education in service of humankind not only in the state of
            Gujarat (especially the district of Surendranagar), but also in
            other parts of the Country.
          </Text>
          <Text style={styles.paragraph}>
            He left us for his heavenly abode on 31-1-2013 but his Spiritual
            Presence is always with us guiding us into the right path.
          </Text>
          <Text style={styles.centeredText}>"THE END OF AN ERA"</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
