import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import { Constants } from 'react-native-unimodules'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandomUser } from '../store/actions'
import { ListItem } from 'react-native-elements'

export default function DataList() {

    const [ currentPage, setCurrentPage ] = useState(1)

    const dispatch = useDispatch()
    const randomUsers = useSelector(state => state.randomUsers)

    useEffect(() => {
        dispatch(fetchRandomUser(currentPage))
    }, [currentPage])

    const goToPage = (text) => {
        if(text === '') {
            setCurrentPage(parseInt(0))    
        } else {
            setCurrentPage(parseInt(text))
        }
        dispatch(fetchRandomUser(parseInt(text)))
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        {
                            randomUsers.map((user,i) => (
                                <ListItem 
                                    key={i}
                                    leftAvatar={{ source: { uri: user.picture.thumbnail } }}
                                    title={user.name.first}
                                    titleStyle={{ color: 'black', fontWeight: 'bold' }}
                                    subtitle={user.email}
                                    subtitleStyle={{ color: 'black' }}
                                    bottomDivider
                                    chevron     
                                />
                            ))
                        }
                    </View>
                    <View style={styles.paginationControl}>
                        {
                            currentPage > 1 ? (
                                <TouchableOpacity onPress={() => setCurrentPage(currentPage - 1)}>
                                    <Text>
                                        Prev
                                    </Text>
                                </TouchableOpacity>
                            ) : (<Text></Text>)
                        }
                        <Text>Current Page: {currentPage}</Text>
                        {/* <TextInput placeholder="go to" onChangeText={text => goToPage(text)} keyboardType="numeric"/> */}
                        <TouchableOpacity onPress={() => setCurrentPage(currentPage + 1)}>
                            <Text>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    },
    container: {
        backgroundColor: '#fafafa',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 400,
        flexDirection: "column"
    },
    paginationControl: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        height: 50,
        padding: 10
    },
    content: {
        width: '100%',

    },  
})

