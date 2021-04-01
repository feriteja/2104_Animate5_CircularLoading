import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimCircle = Animated.createAnimatedComponent(Circle);

const CircleRender = ({index, length}) => {
  const r = (130 * (index + 1)) / length;
  const circumference = 2 * Math.PI * r;
  const dashOff = useSharedValue(0);

  console.log(length - index);

  useEffect(() => {
    dashOff.value = withRepeat(
      withTiming(circumference * (length - index), {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  const aniProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: dashOff.value,
    };
  });

  return (
    <AnimCircle
      key={index}
      cx={330 / 2}
      cy={330 / 2}
      r={r}
      origin={(330 / 2, 330 / 2)}
      stroke="white"
      strokeWidth={10}
      strokeLinecap="round"
      animatedProps={aniProps}
      strokeDasharray={[circumference * 0.05, circumference * 0.95]}
    />
  );
};

const App = () => {
  const theArray = [...Array(5)];

  return (
    <View style={styles.container}>
      <MaskedView
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          height: '100%',
        }}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Svg
              height="330"
              width="330"
              viewBox="0 0 330 330"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Circle cx={330 / 2} cy={330 / 2} r={10} fill="white" /> */}
              {theArray.map((item, index) => (
                <CircleRender
                  key={index}
                  length={theArray.length}
                  index={index}
                />
              ))}
            </Svg>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              Feri Teja Kusuma
            </Text>
          </View>
        }>
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            backgroundColor: '#324376',
          }}
        />
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            backgroundColor: '#f34376',
          }}
        />
      </MaskedView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
