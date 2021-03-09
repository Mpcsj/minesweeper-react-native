import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native'

export default props=>{
    // ler a documentacao do Modal no site do React Native
    return(
        <Modal onRequestClose={props.onCancel}
            visible={props.isVisible} animationType='slide'
            transparent={true}>
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>Selecione o nivel de dificuldade</Text>
                    <TouchableOpacity
                        style={[styles.button,styles.easy]}
                        onPress={()=>props.onLevelSelected(0.1)}>
                        <Text style={styles.buttonLabel}>Fácil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button,styles.medium]}
                        onPress={()=>props.onLevelSelected(0.2)}>
                        <Text style={styles.buttonLabel}>Médio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button,styles.hard]}
                        onPress={()=>props.onLevelSelected(0.3)}>
                        <Text style={styles.buttonLabel}>Difícil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#EEE',
        alignItems:'center',
        justifyContent:'center',
        padding:15
    },
    frame:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.6)'
    },
    title:{
        fontSize:30,
        fontWeight:'bold'
    },
    button:{
        marginTop:10,
        padding:5
    },
    buttonLabel:{
        fontSize:20,
        color:'#EEE',
        fontWeight:'bold'
    },
    easy:{
        backgroundColor:'#49b65d'
    },
    medium:{
        backgroundColor:'#2765f7'
    },
    hard:{
        backgroundColor:'#f26337'
    }
})
