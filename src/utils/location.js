import Geolocation from 'react-native-geolocation-service';
import { get } from 'lodash';
import { PermissionsAndroid, Platform } from 'react-native';

export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const fetchCurrentLocation = async () => {
  const result = await requestLocationPermission();
  return new Promise((resolve) => {
    console.log(result);
    if (result === 'granted') {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(`position: ${JSON.stringify(position)}`);
          resolve({
            latitude: get(position, 'coords.latitude'),
            longitude: get(position, 'coords.longitude'),
          });
        },
        () => {
          console.log('error occured!');
          resolve({
            latitude: 37.56076511299618,
            longitude: 126.92748328492733,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        },
      );
    } else {
      console.log('not granted');
      resolve({
        latitude: 37.56076511299618,
        longitude: 126.92748328492733,
      });
    }
  });
};
