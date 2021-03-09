import React from 'react'
import {View,StyleSheet} from 'react-native'

export default(props) =>{
    return(
        <View style ={styles.container}>
            {renderizaBandeira(props.bigger|false)}
        </View>
    )
}

function renderizaBandeira(bigger){
    if(!bigger){
        return([
            <View style={styles.mastro} key={0}/>,
            <View style={styles.bandeira} key={1}/>,
            <View style={styles.base1} key={2}/>,
            <View style={styles.base2} key={3}/>
        ]
        )
    }else{
        return([
            <View style={styles.mastro_2} key={0}/>,
            <View style={styles.bandeira_2} key={1}/>,
            <View style={styles.base1_2} key={2}/>,
            <View style={styles.base2_2} key={3}/>
        ]
        )
    }
}

const styles= StyleSheet.create({
    container:{
        marginTop:0,
        //justifyContent:'center'
    },
    mastro:{
        position:'absolute',
        height:14,
        width:2,
        backgroundColor:'#222',
        marginLeft:1
    },
    bandeira:{
        position:'absolute',
        height:5,
        width:6,
        backgroundColor:'#f22',
        marginLeft:-5
    },
    base1:{
        width:6,
        height:2,
        backgroundColor:'#222',
        marginLeft:-1,
        marginTop:10
    },
    base2:{
        position:'absolute',
        height:2,
        width:10,
        backgroundColor:'#222',
        marginLeft:-3,
        marginTop:12
    },
    mastro_2:{
        position:'absolute',
        height:25,
        width:3,
        backgroundColor:'#222',
        marginLeft:1
    },
    bandeira_2:{
        position:'absolute',
        height:7,
        width:9,
        backgroundColor:'#f22',
        marginLeft:-8
    },
    base1_2:{
        width:9,
        height:2,
        backgroundColor:'#222',
        marginLeft:-2,
        marginTop:25
    },
    base2_2:{
        position:'absolute',
        height:2,
        width:15,
        backgroundColor:'#222',
        marginLeft:-5,
        marginTop:27
    }
})