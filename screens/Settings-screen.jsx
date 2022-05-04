import React, { useState, useEffect } from 'react';
// native components
import { Text, View, Alert, SafeAreaView, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { displayFormContainer, landingPagesOrientation, } from '../styles/styles-screens';
import { Colors } from '../styles/styles-colors';
import { getLocation } from "../apis/get-all-location";
import CustomButton from '../_utils/CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';

const SettingsScreen = () => {
  // default states
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(null);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  
  const getCurrentLocation = async () => {
    const location = await AsyncStorage.getItem('selectedLocation')
    setValue(location);
  }

  const getAllLocations = async () => {
    try {
      const data = await getLocation();
      setItems(data.data.data);
    } catch (error) {
      setLocations([])
    }
  };

  const updateUserTypeFunction = async () => {
    setModalConfirmVisible(true);
  };

  useEffect(() => {
    getAllLocations();
    getCurrentLocation();
  }, []);

  const showSuccessAlert = () => {
    Alert.alert(
      'Update Success',
      'Your profile changes was saved successfully on your device.',
      [
        {
          text: 'Close',
          style: 'default',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <SafeAreaView style={landingPagesOrientation.container}>
      <Text style={displayFormContainer.formsHeader}>Admin Scanner Settings</Text>
      <View style={{ marginTop: 10 }}>
        <View style={{ marginBottom: 15 }}>
          <Text style={[displayFormContainer.formCaptions, { marginBottom: 10}]}>Set Current Location</Text>
          <DropDownPicker
          schema={{
              label: 'label',
              value: 'name'
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onSelectItem={ async (item) => {
              await AsyncStorage.setItem('selectedLocation', item.name)
            }}
          />
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <CustomButton color={Colors.primary} textColor="white" onPress={() => {updateUserTypeFunction()}} title="Update" />
        </View>
      </View>

      {/* confirm modal for saving the data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalConfirmVisible}
        onRequestClose={() => {
          setModalConfirmVisible(!modalConfirmVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.modalText}>Do you want to save the changes?</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 15,
              }}
            >
            <TouchableOpacity
                style={{ width: '50%' }}
                onPress={() => setModalConfirmVisible(!modalConfirmVisible)}
              >
                <View
                  style={{
                    backgroundColor: Colors.lightGrey,
                    height: 50,
                    justifyContent: 'center',
                    marginRight: 10,
                    alignItems: 'center',
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>No</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: '50%' }}
                onPress={() => {
                  setModalConfirmVisible(false);
                  showSuccessAlert();
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.accent,
                    height: 50,
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>Yes</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000AA',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 7,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.primary,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '700',
    width: '100%',
  },
});


export default SettingsScreen;
