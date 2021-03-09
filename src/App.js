/**
 * Comentários do projeto
 */

import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  Alert
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Cabecalho from './components/Cabecalho'
import params from './params'
import MineField from './components/MineField'
import {
  criaTabuleiroCMinas,
  clonaTabuleiro,
  openField,
  temExplosao,
  venceuOJogo,
  showMines,
  invertFlag,
  flagsUsed

} from './components/funtions'
import LevelSelection from './components/screens/LevelSelection'
const ObjApp = class App extends Component{
  constructor(props){
    super(props)
    // eu posso mudar o state nesse caso pois estou no construtor
    // caso eu estivesse em qualquer outra funcao
    // eu poderia apenas alterar o state
    this.state = this.createState()
  }
  onSelectField=(row,column)=>{
    // funcao que coloca uma flag numa posicao
    console.log('funcao onSelectField de App.js (coloca flag)')
    let board = clonaTabuleiro(this.state.board)
    invertFlag(board,row,column)
    let venceu =venceuOJogo(board)
    if(venceu){
      Alert.alert('Parabéns','Você venceu!')
    }
    this.setState({won:venceu,board})
    
  }
  onOpenField = (row,col)=>{
    console.log('Chegou na onOpenField de App.js')
    console.log('row passada: ,',row)
    console.log('col passada: ,',col)
    let copiaBoard = clonaTabuleiro(this.state.board)
    openField(copiaBoard,row,col)
    let perdeu = temExplosao(copiaBoard)
    let venceu = venceuOJogo(copiaBoard)

    if(perdeu){
      showMines(copiaBoard)
      Alert.alert('Você perdeu!','Tente novamente')
      // reinicio o tabuleiro
    }
    if(venceu){
      Alert.alert('Parabéns','Você venceu')
    }
    this.setState({board:copiaBoard,won:venceu,lost:perdeu})
  }
  getQtMines=()=>{
    let rows = params.getRowsAmount()
    let cols = params.getColumnsAmount()
    return Math.ceil(cols*rows*params.difficultLevel)
  }
  createState=()=>{
    const cols = params.getColumnsAmount()
    const rows =params.getRowsAmount()
    return {
      board:criaTabuleiroCMinas(rows,cols,this.getQtMines()),
      won:false,
      lost:false,
      showLevelSelection:false
    }
  }
  onLevelSelected= level=>{
    params.difficultLevel = level
    this.recarregaJogo()
  }
  recarregaJogo=()=>{
    this.setState(this.createState())
  }
    render(){
      return(
        <View style={styles.container}>
            <LevelSelection isVisible={this.state.showLevelSelection}
              onLevelSelected={this.onLevelSelected}
              onCancel={()=>this.setState({showLevelSelection:false})}
            />
            <Cabecalho flagsLeft={this.getQtMines()-flagsUsed(this.state.board)}
              onNewGame={()=>this.recarregaJogo()}
              onFlagPress={()=>this.setState({showLevelSelection:true})}
            />
            <View style={styles.board}>
              <MineField board={this.state.board}
                onOpenField={this.onOpenField}
                onSelect={this.onSelectField}
              />
            </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5fcff'
  },
  board:{
    alignItems:'center',
    backgroundColor:'#AAA'
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});

export default ObjApp;
