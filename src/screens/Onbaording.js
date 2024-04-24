import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import data from '../assets/Data';

const {height, width} = Dimensions.get('screen');

const Onboarding = () => {
  const ref = useRef(null);
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState('0');

  const updateslide = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const scrollCurrentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(scrollCurrentIndex);
    // console.log(scrollCurrentIndex);
  };

  const handleNext = () => {
    const nextSlide = currentIndex + 1;
    if (nextSlide !== data.length) {
      const offset = nextSlide * width;
      ref?.current?.scrollToOffset({offset});
    }
  };

  const handleSkip = () => {
    const lastSlide = data.length - 1;
    const offset = lastSlide * width;
    ref?.current?.scrollToOffset({offset});
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <FlatList
        bounces={false}
        ref={ref}
        onMomentumScrollEnd={updateslide}
        pagingEnabled
        horizontal
        data={data}
        renderItem={({item, index}) => (
          <View style={styles.slide} key={index}>
            <Image
              source={item.image}
              style={{height: height, width: width}}
              resizeMode="cover"
            />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.indicatorContainer}>
                {data.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      currentIndex == index && {
                        backgroundColor: 'white',
                        width: 25,
                      },
                    ]}
                  />
                ))}
              </View>
              {currentIndex === data.length - 1 ? (
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => navigation.replace('Login')}>
                  <Image source={require('../images/enter.png')} />
                </TouchableOpacity>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={handleSkip}>
                    <Text style={styles.buttonText}>Skip</Text>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={handleNext}>
                      <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                    <AntDesign
                      name="arrowright"
                      size={width * 0.04}
                      color={'white'}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    backgroundColor: '#FE8C00',
    bottom: height * 0.06,
    height: height * 0.48,
    width: width * 0.75,
    borderRadius: 48,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    letterSpacing: 1,
    fontSize: width * 0.09,
    color: 'white',
    lineHeight: height * 0.04,
    textAlign: 'center',
    marginVertical: height * 0.03,
  },
  description: {
    textAlign: 'center',
    fontSize: width * 0.04,
    color: 'white',
    paddingHorizontal: width * 0.045,
  },
  indicatorContainer: {
    marginTop: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: width,
  },
  indicator: {
    width: width * 0.07,
    height: height * 0.008,
    borderRadius: 100,
    backgroundColor: '#C2C2C2',
  },
  buttonContainer: {flex:0.8,
    width: width * 0.65,
    alignItems:'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.05,
  },
  loginBtn: {
    marginTop: height * 0.04,
  },
});

export default Onboarding;
