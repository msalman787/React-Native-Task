import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants';

const EmployeeCards = ({item, goToEmployeeDetail}: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <View style={styles.userDetailContainer}>
          <Text style={styles.userInfo}>{item.firstName || ''}</Text>
          <Text style={styles.userInfo}>{item.lastName || ''}</Text>
          <Text style={styles.userInfo}>{item.email || ''}</Text>
        </View>
      </View>
      <View style={styles.horizontalBorder} />
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            const location = {
              latitude: item?.latitude || 0,
              longitude: item?.longitude || 0,
            };
            goToEmployeeDetail(location);
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Employee Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  userDetailContainer: {
    flex: 1,
  },
  userInfo: {
    fontSize: 14,
  },

  horizontalBorder: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.DEFAULT_BLACK,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 12,
  },
});

export default EmployeeCards;
