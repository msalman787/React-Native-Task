import Geolocation from 'react-native-geolocation-service';
import { Alert, PermissionsAndroid, Platform } from "react-native";

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        resolve(coords);
      },
      error => {
        reject(error.message);
      },
      { enableHighAccuracy: true, timeout: 60000, maximumAge: 5000 },
    );
  });

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization('always');
        if (permissionStatus === 'granted') {
          return resolve('granted');
        } else {
          Alert.alert('Please Enable Your Location');
          reject('Permission not granted');
        }
      } catch (error) {
        console.log('Ask Location permission error: ', error);
        reject(error);
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        } else {
          Alert.alert('Please Enable Your Location');
          reject('Location Permission denied');
        }
      } catch (error) {
        console.log('Ask Location permission error: ', error);
        reject(error);
      }
    }
  });
