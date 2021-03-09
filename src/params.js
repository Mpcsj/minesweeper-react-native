import {Dimensions} from 'react-native'

const game_params = {
    blockSize:30,
    borderSize:5,
    fontSize:15,
    headerRatio:0.15,// indica quantos porc da tela será de cabecalho
    difficultLevel:0.1,// indica que 10% dos campos têm minas
    getColumnsAmount(){
        // retorna, pelas dimensoes do dispositivo,
        // quantos blocos terá na horizontal
        // e quantos blocos na vertical
        const width = Dimensions.get('window').width
        return Math.floor(width/this.blockSize)// quantos blocos na horizontal
    },
    getRowsAmount(){
        const heigth = Dimensions.get('window').height
        const boardHeight = heigth*(1-this.headerRatio)// quantos por linha tirando
        // a parte de cabeçalho
        return Math.floor(boardHeight/this.blockSize)
    }

}
export default game_params