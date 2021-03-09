import React from 'react'
import {View,StyleSheet} from 'react-native'
import Field from './Field'

const chamadaOnSelect=(props,idxRow,idxCol)=>{
    console.log('Funcao chamadaOnSelect de MineField.js')
    return props.onSelect(idxRow,idxCol)
}
export default props=>{
    console.log('export default de mine field')
    // transformando o objeto Javascript criado em functions.js
    // para objetos JSX visuais a serem vistos na tela
    let rows= props.board.map((row,idxRow)=>{
        let columns = row.map((field,idxCol)=>{
            // gerando as colunas
            console.log('idx row: ',idxRow)
            console.log('idx col: ',idxCol)
            return<Field{...field} key={idxCol}
            onOpen={()=>props.onOpenField(idxRow,idxCol)}
            onSelect={()=>chamadaOnSelect(props,idxRow,idxCol)}
            />
        })
        // retornando o JSX das colunas criadas
        return <View style={{flexDirection:'row'}}
        key={idxRow}>{columns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}
const styles= StyleSheet.create({
    container:{
        backgroundColor:'#EEE'
    }
})