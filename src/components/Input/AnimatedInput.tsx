import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from '../../constants';
import {TextInput, DefaultTheme} from 'react-native-paper';

const AnimatedInput = ({
  label,
  value,
  errorMsg,
  onChangeText,
  keyboardType,
  editable,
  secureTextEntry,
  onSubmitEditing,
  returnKeyType,
}: any) => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.DEFAULT_BLACK,
      background: Colors.DEFAULT_WHITE,
      text: Colors.DEFAULT_BLACK,
    },
    roundness: 5,
  };

  return (
    <View style={styles.container}>
      <TextInput
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        editable={editable}
        keyboardType={keyboardType}
        cursorColor={Colors.DEFAULT_BLACK}
        outlineColor={Colors.INPUT_BORDER}
        mode="flat"
        underlineColor={Colors.DEFAULT_BLACK}
        label={label}
        style={[styles.textInput]}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        theme={theme}
      />

      {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    marginVertical: 15,
  },
  textInput: {
    width: '100%',
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  errorMsg: {
    marginTop: 3,
    marginBottom: 2,
   
    color: 'red',
  },
});

export default AnimatedInput;
