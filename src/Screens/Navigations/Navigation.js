import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LogBox, SafeAreaView, View, Image, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from '../Splash/SplashScreen';
import Otp from '../Authentication/Otp/Otp';
import SignUpOtpp from '../SignUpOtp/SignUpOtpp';
import Verify from '../Authentication/Otp/Verify';
import Location from '../Location/Location';
import HomeScreen from '../Home/HomeScreen';
import OrderDetail from '../OrderDetail/OrderDetail';
import ProfileScreen from '../Profile/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const OtpStack = () => (
  <Stack.Navigator
    initialRouteName="OtpStack"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen options={{header: () => null}} name="Otp" component={Otp} />

    <Stack.Screen
      options={{header: () => null}}
      name="SignUpOtpp"
      component={SignUpOtpp}
    />
    <Stack.Screen
      options={{header: () => null}}
      name="Verify"
      component={Verify}
    />
  </Stack.Navigator>
);

function Navigation({}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{header: () => null}}
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="OtpStack"
        component={OtpStack}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        options={{header: () => null}}
        name="Location"
        component={Location}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="OrderDetail"
        component={OrderDetail}
      />
      {/* <Stack.Screen
        options={{header: () => null}}
        name="ProfileScreen"
        component={ProfileScreen}
      /> */}
    </Stack.Navigator>
  );
}
export default Navigation;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.45,
    elevation: 5,
    shadowRadius: 3.5,
  },
  cartBtnBlue: {
    width: '10%',
    borderRadius: 100,
    height: 45,
    width: 45,
    backgroundColor: '#DA2328',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
