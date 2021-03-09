import React from 'react'
import {View,StyleSheet,Text,TouchableWithoutFeedback} from 'react-native'
import params from '../params'
import Mine from './Mine'
import Flag from '../components/Flag'
export default props =>{
    const {mined,opened,nearMines,exploded,flagged} = props
    const styleField =[styles.field]
    if(opened)styleField.push(styles.opened)
    if(exploded) styleField.push(styles.exploded)
    if(flagged)styleField.push(styles.flagged)
    if(!opened && !exploded)styleField.push(styles.regular)
    let color = null
    if(nearMines>0){
        if(nearMines == 1)color = '#2a28d7'
        if(nearMines == 2)color = '#2B520F'
        if(nearMines>2 && nearMines<6)color= '#F9060A'
        if(nearMines>=6)color = '#f221a9'
    }
    return(
        <TouchableWithoutFeedback onPress={testeChamada(props)}
        onLongPress={testeChamada2(props)}>
            <View style={styleField}>
                {!mined && opened && nearMines>0 ?
                <Text style = {[styles.label,{color:color}]}>
                {nearMines}</Text> : false}
                {mined && opened ? <Mine/>:false}
                {(flagged && !opened)?<Flag/>:false}
            </View>
        </TouchableWithoutFeedback>
    )
}
const testeChamada2 = props=>{
    console.log('funcao teste chamada2(para onLongPress)')
    return props.onSelect
}
const testeChamada = props=>{
    console.log('Teste chamada')
    return props.onOpen
}

const styles = StyleSheet.create({
    flagged:{
        
    },
    field:{
        height:params.blockSize,
        width:params.blockSize,
        borderWidth:params.borderSize,
        alignItems:'center',
        justifyContent:'center'
    },
    regular:{
        backgroundColor:'#999',
        borderLeftColor:'#CCC',
        borderTopColor:'#CCC',
        borderRightColor:'#333',
        borderBottomColor:'#333'
    },
    opened:{
        backgroundColor:'#999',
        borderColor:'#777',
        alignItems:'center',
        justifyContent:'center'
    },
    label:{
        fontWeight:'bold',
        fontSize:params.fontSize
    },
    exploded:{
        backgroundColor:'red',
        borderColor:'red'
    }
})