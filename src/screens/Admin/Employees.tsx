import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {EmployeeCards} from '../../components';
import {verticalScale} from '../../utils/Dimentions';
import {Colors} from '../../constants';

const Employees = ({navigation}: any) => {
  const [users, setUsers]: any = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const usersCollection = firestore().collection('users');
      const querySnapshot = await usersCollection.get();

      const loadedUsers: any = [];
      querySnapshot.forEach(documentSnapshot => {
        const userData = documentSnapshot.data();
        loadedUsers.push(userData);
      });

      setUsers(loadedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
    }
  };
  const goToEmployeeDetail = (location: any) => {
    navigation.navigate('Home', {location});
  };
  const renderCardRow = ({item}: any) => (
    <EmployeeCards goToEmployeeDetail={goToEmployeeDetail} item={item} />
  );
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
          <Text style={styles.text}>All Employees</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UpdateProfile');
          }}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data={users}
          renderItem={renderCardRow}
          keyExtractor={(_: any, index: number) => '' + index}
        />
      </View>
    </View>
  );
};

export default Employees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  text: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 20,
  },
  cardsContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(10),
    paddingBottom: 100,
  },
});
