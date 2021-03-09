import { parse } from "whatwg-mimetype";

const TAG = 'functions.js'
const createBoard = (rows,columns)=>{
    return Array(rows).fill(0).map((_,idxRow)=>{
        return Array(columns).fill(0).map((_,idxCol)=>{
            return {
                idxRow,// ou entao: idxRow:idxRow(nao e necessário pelo nome ser igual)
                idxCol,
                opened:false,
                flagged:false,
                mined:false
            }
        })
    })
}

const spreadMines=(board,qtMines)=>{
    // funcao que espalha minas num tabuleiro
    const rows = board.length
    const columns = board[0].length
    let minasAdicionadas = 0
    while(minasAdicionadas<qtMines){
        // gerando aleatoriamente o indice para colocar uma mina
        let rowSelected= parseInt(Math.random()*rows,10)
        let colSelected = parseInt(Math.random()*columns,10)
        
        if(!board[rowSelected][colSelected].mined){
            // se nao estiver minado, eu coloco uma mina aqui
            board[rowSelected][colSelected].mined = true
            minasAdicionadas++
        }
    }
}

const criaTabuleiroCMinas=(rows,columns,qtMines)=>{
    let board = createBoard(rows,columns)
    spreadMines(board,qtMines)
    return board
}

const clonaTabuleiro =board=>{
    return board.map(rows=>{
        return rows.map(field=>{
            return {...field}
        })
    })
}
const getVizinhos=(board,idxRow,idxCol)=>{
    let vizinhos = []
    let linhasPossiveis =[idxRow-1,idxRow,idxRow+1]
    let colPossiveis = [idxCol-1,idxCol,idxCol+1]
    linhasPossiveis.forEach(row=>{
        colPossiveis.forEach(col=>{
            let diferente = row != idxRow || col !=idxCol
            // se der falso, significa que ambos sao iguais,
            // o que significa que  se trata do elemento passado
            let idxLinhaValida = row>=0 && row<board.length// estou dentro
            // dos limites da matriz
            let idxColValida = col>=0 && col<board[0].length
            if(diferente && idxLinhaValida && idxColValida){
                vizinhos.push(board[row][col])
            }
        })
    })
    return vizinhos
}
const vizinhancaSegura = (board,row,col)=>{
    // essa funcao indica se existe algum vizinho com minas na vizinhanca
    const safes = (result,vizinho)=> result && !vizinho.mined
    return getVizinhos(board,row,col).reduce(safes,true)
}

const openField = (board,row,column)=>{
    // funcao responsavel por abrir um campo
    //console.log('board:',board)
    console.log('linha:',row)
    console.log('coluna: ',column)
    let field = board[row][column]
    if(!field.opened){
        field.opened = true
        if(field.mined){
            // se tiver, uma mina, explodo essa mina
            field.exploded= true
        }else if(vizinhancaSegura(board,row,column)){
            // tambem abro os vizinhos
            console.log('Abrindo os vizinhos')
            getVizinhos(board,row,column).forEach(n=>openField(board,n.idxRow,n.idxCol))
        }else{
            // nesse caso, calculo quantas minas tem ao redor
            let vizinhos = getVizinhos(board,row,column)
            field.nearMines = vizinhos.filter(n=>n.mined).length// pego o tamanho
            // da lista dos vizinhos minados
        }
    }
}

// a funcao abaixo converte uma matriz em um grande vetor
const getElsAsArray = board=>[].concat(...board)

const temExplosao = board => getElsAsArray(board)
.filter(field =>field.exploded).length>0 // varre a lista e me indica
// se o tamanho da lista com elementos explodidos é maior do que zero

const pendente = field=>(field.mined && !field.flagged)
|| (!field.mined && !field.opened)

// verifico se existe algum campo pendente na lista
const venceuOJogo = board =>{
    getElsAsArray(board).filter(pendente).length===0
}

// funcao que abre todos os campos minados
const showMines = board => getElsAsArray(board).filter(field=>field.mined)
.forEach(field=>field.opened=true)

const invertFlag = (board,row,col)=>{
    console.log(TAG,'funcao invertFlag')
    let field = board[row][col]
    field.flagged = !field.flagged
}
const flagsUsed = board =>{
    return getElsAsArray(board).filter(field=>field.flagged).length 
}
export {
    criaTabuleiroCMinas,
    clonaTabuleiro,
    openField,
    temExplosao,
    venceuOJogo,
    showMines,
    invertFlag,
    flagsUsed
}