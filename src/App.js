import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';

function Square(props){
/*
class Square extends React.Component 
Al principio se tenía la clase, pero ahora se cambió por función, porque no tiene estado y sólo un render
{*/
  //se borró el constructor cuando el cuadrado ya no manejaba el estado de x, o, null
  /*constructor (props){
    super(props);
    this.state={
      value:null,
    };
  }
  */
  //render() {
    return (
      /*1) función on click para mostrar alert cuando se presione
      <button className="square" onClick={()=>alert("click")}>
      */
      /* 2) la siguiente función cambia el estado cuando se da click y se muestra X en el tablero
      <button className="square" onClick={()=>this.setState({value:"X"})}>
        {this.state.value}
      </button>*/
      /*3) cuando se contaba con clasese accedía con this. props, con función sólo props
      <button className="square" onClick={()=>this.props.onClick()}>*/
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }


class Board extends React.Component {
  //el estado lo tenían los cuadrados, pero es mejor que lo maneje el tablero. se agregó el constructor para inicializar el arreglo con nulos
/* Cuando el estado pasó a game para time travel, se quitó el constructor de aquí
  constructor (props){
  super(props);
  this.state={
    squares:Array(9).fill(null),
    //se agrega is Next para revisar los turnos de X, O
    xIsNext:true,
  };
}*/
// Con handle click el tablero administra los estados. con slice se crea una copia para modificarel tablero


 /* Se pasó a game para time travel
handleClick(i){
  const squares=this.state.squares.slice();
  //IGNORAR SI EL TABLERO ESTÁ LLENO, YA NO SE TOMA EN CUENTA 
  if (calculateWinner(squares)||squares[i]){
    return;
  }

  squares[i]=this.state.xIsNext?"X":"O";
  this.setState({squares:squares, xIsNext: !this.state.xIsNext});
  }*/


  renderSquare(i) {
    /*se pasó una prop de valor i, para el cuadrado
    return <Square value={i}/>;
    */
    //en el siguiente código ya se ocupó el estado
    /*
    En lugar de state se ocupó props cuando manejó game el estado del arreglo
    return <Square value={this.state.squares[i]} 
    */
    return (<Square value={this.props.squares[i]} 
    //se agregó la función para actualizar el estado, pero era privado en el tablero, por eso el método
    onClick={()=>this.props.onClick(i)}
    />);
  }

  render() {
    /* Esto era sólo para mostrar a quién le corresponde el siguiente turno. Se sustituyó por lo de abajo
    const status = 'Next player: '+(this.state.xIsNext?"X":"0");
    */


    /* Se quitó cuando lo va a calcular game
    const winner= calculateWinner(this.state.squares);
    let status;
    if (winner){
      status="Winner"+winner;
    }else{
      status= "Next player: "+ (this.state.xIsNext?"X":"O");
    }
  */


    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  //se agregó un constructor para la función de time travel
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
      //const history = this.state.history;
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        //se concatenan nuevas entradas de history para ir hacia atrás en los mocimientos
        history: history.concat([{
          squares: squares,
         }]),
        //stepNumber lleva cuenta del número de movimiento
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
    jumpTo(step){
      this.setState({
        stepNumber:step,
        xIsNext:(step%2===0)
      });
    }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    

    // Se llevará cuenta de los movimientos anteriores con map
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        //Se agregó un key como identificador para reconocer cada movimiento
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
//fUNCIÓN PARA SABER QUIÉN GANÓ
function calculateWinner(squares) {
  const lines = [//TODOS LOS POSIBLES RESULTADOS PARA QUE GANE ALGUIEN
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default Game;


//export default App;
//class no se puede usar
//there must be one root element
