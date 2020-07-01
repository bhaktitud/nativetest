import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Button, Alert, Image, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Constants } from 'react-native-unimodules'
import * as ImagePicker from 'expo-image-picker'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash, faCamera, faFolderOpen } from '@fortawesome/free-solid-svg-icons'


export default function Camera() {
    const [ image_Url, setImageUrl ] = useState('')
    const [ isLoading, setLoading ] = useState(false)

    const chooseImageOnPress = async () => {

        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync()
        if (result.cancelled === true) {
            return;
          }
        
        setImageUrl(result.uri)
        
        // let result = await ImagePicker.launchCameraAsync({
        //     base64: true
        // })
        // if(!result.cancelled){
        //     setLoading(true)
      
        //     let base64Img = `data:image/jpg;base64,${result.base64}`
      
        //     let apiUrl = 'https://api.cloudinary.com/v1_1/dp8pdb1ns/image/upload';
        //     let data = {
        //         "file": base64Img,
        //         "upload_preset": "cldimage"
        //     }

        //     fetch(apiUrl, {
        //         body: JSON.stringify(data),
        //         headers: {
        //         'content-type': 'application/json'
        //         },
        //         method: 'POST',
        //     }).then(async r => {
        //         let data = await r.json()
        //         // console.log(data.secure_url)
        //         setImageUrl(data.secure_url)
        //         Alert.alert(
        //             "Upload Information",
        //             "Snapshot has been added successfully!",
        //             [
        //               {
        //                 text: "Ok",
        //                 onPress: () => setLoading(false),
        //                 style: "cancel"
        //               }
        //             ]
        //           );
        //         return data.secure_url
        //     }).catch(err=>{
        //         setLoading(false)
        //         console.log(err)
        //     })
        // }
    }

    const chooseImagefromGallery = async () => {

        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickedImage = await ImagePicker.launchImageLibraryAsync();

        if (pickedImage.cancelled === true) {
            return;
        }
        setImageUrl(pickedImage.uri)
    }

    const handleDelete = () => {
        Alert.alert(
            "Delete Confirmation",
            "Do you really want to delete this image?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => setImageUrl('') }
            ],
            { cancelable: false }
          );
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.imageContainer}>
                    <Image source={image_Url ? { uri: image_Url } : require('../../assets/default.png')} style={{ width: 380, height: 380 }} />
                    {
                        image_Url ? (<View style={styles.trashIcon}>
                                        <TouchableOpacity onPress={() => handleDelete()}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </TouchableOpacity>
                                    </View>
                        ) : (<Text></Text>)
                    }

                </View>
                <View style={styles.controlOptions}>
                    {
                        isLoading ? ( 
                            <View>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                            ) : (
                            <TouchableOpacity 
                                onPress={() => chooseImageOnPress()}
                            >
                                <FontAwesomeIcon icon={faCamera} size={32} />
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity 
                        onPress={() => chooseImagefromGallery()}
                    >
                        <FontAwesomeIcon icon={faFolderOpen} size={32} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

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
    imageContainer: {
        width: '100%',
        padding: 10,
        alignItems: "center",
        justifyContent:"center",
        marginBottom: 10,
    },
    trashIcon: {
        width:25,
        height:25,
        position: "absolute",
        top: '5%',
        right: '5%',
        alignItems: "center",
        justifyContent: "center"
    },
    controlOptions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-around',
        width: '50%'
    }

})