import {
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MapView, {Marker} from 'react-native-maps';
import {
  getCurrentLocation,
  locationPermission,
} from '../../utils/MapHelperFunction';
import BackgroundService from 'react-native-background-actions';
import {Colors} from '../../constants';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const sleep = (time: any) =>
  new Promise(resolve => setTimeout(() => resolve(time), time));

const options = {
  taskName: 'LocationService',
  taskTitle: 'Location Service',
  taskDesc: 'Your Location is being shared to the admin',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: Colors.DEFAULT_BLACK,
  parameters: {
    delay: 5000,
  },
};

const Home = ({navigation, route}: any) => {
  const params = route?.params;
  const [currentPosition, setCurrentPosition]: any = useState(null);

  useEffect(() => {
    {
      !params?.location && permissionChecker();
    }
    getLiveLocation();
  }, []);

  const backgroundTask = async (taskDataArguments: any) => {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        await getLiveLocation();
        await sleep(delay);
      }
    });
  };

  const permissionChecker = async () => {
    const backgroundgranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: 'Background Location Permission',
        message:
          'We need access to your location ' +
          'so you can get live quality updates.',
        buttonPositive: 'OK',
      },
    );

    if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
      startBackgroundService();
      await BackgroundService.updateNotification({
        taskDesc: 'Your Current Location shared to admin',
      });
    }
  };

  const startBackgroundService = async () => {
    await BackgroundService.start(backgroundTask, options);
  };

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();

    if (locPermissionDenied) {
      const {longitude, latitude}: any = await getCurrentLocation();
      await setCurrentPosition({latitude, longitude});
      if (await (currentPosition?.latitude)) 
        return await updateUserData();
      }
    }
  };

  const updateUserData = async () => {
    try {
      const userRef = firestore()
        .collection('users')
        .doc(Auth()?.currentUser?.uid);
      const userDataToUpdate = {
        latitude: currentPosition?.latitude,
        longitude: currentPosition?.longitude,
      };
      await userRef.update(userDataToUpdate);
      return {success: true};
    } catch (error: any) {
      console.error('Error updating user document:', error.message);
      return {success: false};
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          padding: 20,
          backgroundColor: Colors.DEFAULT_BLACK,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity>
          <Text style={styles.text}>
            {params?.location ? 'Employee Detail' : 'Home'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UpdateProfile');
          }}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={{flex: 1}}
        provider="google"
        region={{
          latitude: currentPosition?.latitude || 0,
          longitude: currentPosition?.longitude || 0,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        {currentPosition && (
          <Marker
            coordinate={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            }}
            title="Employee Location"
          />
        )}
        {params?.location && (
          <Marker
            coordinate={{
              latitude: params?.location.latitude,
              longitude: params?.location.longitude,
            }}
            title="Admin Location"
          />
        )}
      </MapView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  text: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 20,
  },
});
