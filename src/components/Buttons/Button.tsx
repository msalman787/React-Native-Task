import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants';
import { ActivityIndicator } from 'react-native-paper';

const LargeButton = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      
        style={[
          styles.signInButton,
          {
            backgroundColor: props.colorChanger
              ? Colors.DEFAULT_WHITE
              : '#121212'
          },
        ]}
        onPress={props.onPress}
        disabled={props.disabled}>
        {props.disabled ? (
          <ActivityIndicator color={Colors.DEFAULT_WHITE} size={'small'}/>
        ) : (
          <Text
            style={[
              styles.signInButtonText,
              {
                color: props.colorChanger
                  ? Colors.DEFAULT_BLACK
                  : Colors.DEFAULT_WHITE,
              },
            ]}>
            {props.text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.DEFAULT_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  signInButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 16,
  },
});

export default LargeButton;
