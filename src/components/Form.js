import React, {useState, useEffect} from 'react';
import {View, Button, Platform, TextInput, Picker, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Constants } from 'react-native-unimodules';
import DateTimePicker from 'react-native-modal-datetime-picker'
import { fetchProvinceList, fetchConstituencyList, fetchDistrictList, fetchVillageList } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

export const Form = () => {
  const [ datePicked, setDatePicked ] = useState(new Date())
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ salary, setSalary ] = useState(0)
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const provinceList = useSelector(state => state.provinceList)
  const constituencyList = useSelector(state => state.constituencyList)
  const districtList = useSelector(state => state.districtList)
  const villageList = useSelector(state => state.villageList)

  const showDatepicker = () => {
      setShow(true)
  };

  const handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    hideDateTimePicker();
    setDatePicked(date)
  };
  
  const hideDateTimePicker = () => {
    setShow(false)
  };

  const handleProvince = (province) => {
      setSelectedProvince(province)
      dispatch(fetchConstituencyList(province.id))
  }

  const handleConstituency = (constituent) => {
      setSelectedConstituency(constituent)
      dispatch(fetchDistrictList(constituent.id))
  }

  const handleDistrict = (district) => {
    setSelectedDistrict(district)
    dispatch(fetchVillageList(district.id))
  }

  const handlePress = () => {
    Alert.alert(
        "Data Confirmation",
        `Data confirmed for 
        Firstname : ${firstName}
        Lastname : ${lastName}
        Province : ${selectedProvince.nama}
        Constituency : ${selectedConstituency.nama}
        District : ${selectedDistrict.nama}
        Village : ${selectedVillage.nama}
        Salary : ${salary}
        `
    )
  }

  useEffect(() => {
    dispatch(fetchProvinceList())
  }, [])
 
 
  return (
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text>Firstname</Text>
                    <Text>:</Text>
                    <TextInput 
                        style={styles.textInputStyle} 
                        placeholder="first name" 
                        onChangeText={text => setFirstName(text)}
                        defaultValue={firstName}
                    />
                </View>
                <View style={styles.innerView}>
                    <Text>Lastname</Text>
                    <Text>:</Text>
                    <TextInput 
                        style={styles.textInputStyle} 
                        placeholder="last name"  
                        onChangeText={text => setLastName(text)}
                        defaultValue={lastName}
                    />
                </View>
                <View style={styles.innerView}>
                    <Text>Date of Birth</Text>
                    <Text>:</Text>
                    <TouchableOpacity style={styles.datePicker} onPress={showDatepicker}>
                        <Text>
                            {datePicked.toDateString()}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={show}
                        onConfirm={handleDatePicked}
                        onCancel={hideDateTimePicker}
                    />
                </View>
                
                <View style={styles.innerView}>
                    {/**Province */}
                    <Text>Province</Text>
                    <Text>:</Text>
                    <Picker
                        selectedValue={selectedProvince}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => handleProvince(itemValue)}
                    >   
                        {
                            provinceList.map(province => (
                                <Picker.Item key={province.id} label={province.nama} value={province} />
                            ))
                        }
                    </Picker>
                </View>
                <View style={styles.innerView}>
                    {/**Constituency */}
                    <Text>Constituency</Text>
                    <Text>:</Text>
                    <Picker
                        selectedValue={selectedConstituency}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => handleConstituency(itemValue)}
                    >
                        {
                            constituencyList.map(constituent => (
                                <Picker.Item key={constituent.id} label={constituent.nama} value={constituent} />
                            ))
                        }
                    </Picker>
                </View>
                <View style={styles.innerView}>
                    {/**District */}
                    <Text>District</Text>
                    <Text>:</Text>
                    <Picker
                        selectedValue={selectedDistrict}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => handleDistrict(itemValue)}
                    >
                        {
                            districtList.map(district => (
                                <Picker.Item key={district.id} label={district.nama} value={district} />
                            ))
                        }
                    </Picker>
                </View>
                <View style={styles.innerView}>
                    {/**Village */}
                    <Text>Village</Text>
                    <Text>:</Text>
                    <Picker
                        selectedValue={selectedVillage}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedVillage(itemValue)}
                    >
                        {
                            villageList.map(village => (
                                <Picker.Item key={village.id} label={village.nama} value={village} />
                            ))
                        }
                    </Picker>
                </View>
                
                <View style={styles.innerView}>
                    {/**Salary */}
                    <Text>Salary</Text>
                    <Text>:</Text>
                    <TextInput 
                        style={styles.textInputStyle} 
                        keyboardType="numeric" 
                        placeholder="e.q. 3,000,000" 
                        onChangeText={text => setSalary(parseFloat(text))}
                        defaultValue={salary.toString()}
                    />
                </View>
                <View style={styles.singleItem}>
                    <Button style={styles.confirmButton} onPress={() => handlePress()} title="Confirm" />
                </View>
            </View>
        </ScrollView>
      </SafeAreaView>


  );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        alignItems: "center",
        justifyContent: "center"
    },
    scrollView: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
    },
    container: {
        display: "flex",
        width: '85%',
        backgroundColor: '#fafafa',
        padding: 10,
        borderRadius: 5
    },
    innerView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 25,
        width: '100%',
    },
    textInputStyle: {
        borderBottomWidth: 0.3,
        height: 40,
        width: 200
    },
    confirmButton: {
        alignSelf: "center"
    },
    singleItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        width: '100%',

    },
    datePicker: {
        width: 150,
    }
})