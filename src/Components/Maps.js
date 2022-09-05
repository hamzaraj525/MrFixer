import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Maps = props => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDAhaR1U_-EQJZu4Ckm0iUQ4gxSWqIMOvY';
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: props.lat ? props.lat : 0,
          longitude: props.long ? props.long : 0,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapView.Marker
          coordinate={{
            latitude: props.lat ? props.lat : 0,
            longitude: props.long ? props.long : 0,
          }}
          title={
            props.locationText ? props.locationText : 'Fetching Location...'
          }
        />

        <MapView.Marker
          pinColor={'orange'}
          coordinate={{
            latitude: props.userLat ? props.userLat : 0,
            longitude: props.userLong ? props.userLong : 0,
          }}
          title="Order Location"
        />
        {props.showGngOdr ? (
          <MapViewDirections
            origin={{
              latitude: props.lat ? props.lat : 0,
              longitude: props.long ? props.long : 0,
            }}
            destination={{
              latitude: props.userLat ? props.userLat : 0,
              longitude: props.userLong ? props.userLong : 0,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="red"
          />
        ) : null}
      </MapView>
    </>
  );
};
export default Maps;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
