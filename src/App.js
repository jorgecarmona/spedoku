import React from 'react';
import './App.css';

const b = null;

const emptyBoard = [
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b]
];

const letterToRowLookup = {
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E',
  '6': 'F',
  '7': 'G',
  '8': 'H',
  '9': 'I'
};

function createPuzzle(puzzleData) {
  const puzzleArray = [];
  
  for (let i=1; i < 10; i++) {
    const arrayRow = [];
    
    for (let j=1; j < 10; j++) {
      const currentCel = letterToRowLookup[i] + j;
      if (puzzleData[currentCel]) {
        arrayRow.push(Number(puzzleData[currentCel]))
      } else {
        arrayRow.push(b);
      }      
    }
  
    puzzleArray.push(arrayRow);
  }
  
  return puzzleArray;
}

function solve(board) {
  // Board -> Board
  // solves the given sudoku board
  // ASSUMES the given sudoku board is valid
  if (solved(board)) {
      return board
  }
  else {
      const possibilities = nextBoards(board)
      const validBoards = keepOnlyValid(possibilities)
      return searchForSolution(validBoards)
  }
}

function searchForSolution(boards){
  // List[Board] -> Board or false
  // finds a valid solution to the sudoku problem
  if (boards.length < 1){
      return false
  }
  else {
      // backtracking search for solution
      var first = boards.shift()
      const tryPath = solve(first)
      if (tryPath !== false){
          return tryPath
      }
      else{
          return searchForSolution(boards)
      }
  }
}

function solved(board){
  // Board -> Boolean
  // checks to see if the given puzzle is solved
  for (var i = 0; i < 9; i++){
      for (var j = 0; j < 9; j++){
          if (board[i][j] == null){
              return false
          }
      }
  }
  return true
}

function nextBoards(board){ 
  // Board -> List[Board]
  // finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
  var res = []
  const firstEmpty = findEmptySquare(board)
  if (firstEmpty !== undefined){
      const y = firstEmpty[0]
      const x = firstEmpty[1]
      for (var i = 1; i <= 9; i++){
          var newBoard = [...board]
          var row = [...newBoard[y]]
          row[x] = i
          newBoard[y] = row
          res.push(newBoard)
      }
  }
  return res
}

function findEmptySquare(board){
  // Board -> [Int, Int] 
  // (get the i j coordinates for the first empty square)
  for (var i = 0; i < 9; i++){
      for (var j = 0; j < 9; j++){
          if (board[i][j] == null) {
              return [i, j]
          }
      }
  }
}

function keepOnlyValid(boards){
  // THIS FUNCTION WORKS.
  // List[Board] -> List[Board]
  // filters out all of the invalid boards from the list
  var res = []
  for (var i = 0; i < boards.length; i++){
      if (validBoard(boards[i])){
          res.push(boards[i])
      }
  }
  return res
}

function validBoard(board){
  // Board -> Boolean
  // checks to see if given board is valid
  return rowsGood(board) && columnsGood(board) && boxesGood(board)
}

function rowsGood(board){
  // Board -> Boolean
  // makes sure there are no repeating numbers for each row
  for (var i = 0; i < 9; i++){
      var cur = []
      for (var j = 0; j < 9; j++){
          if (cur.includes(board[i][j])){
              return false
          }
          else if (board[i][j] != null){
              cur.push(board[i][j])
          }
      }
  }
  return true
}

function columnsGood(board){
  // Board -> Boolean
  // makes sure there are no repeating numbers for each column
  for (var i = 0; i < 9; i++){
      var cur = []
      for (var j = 0; j < 9; j++){
          if (cur.includes(board[j][i])){
              return false
          }
          else if (board[j][i] != null){
              cur.push(board[j][i])
          }
      }
  }
  return true
}

function boxesGood(board){
  // transform this everywhere to update res
  const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                          [1, 0], [1, 1], [1, 2],
                          [2, 0], [2, 1], [2, 2]]

  // Board -> Boolean
  // makes sure there are no repeating numbers for each box
  for (var y = 0; y < 9; y += 3){
      for (var x = 0; x < 9; x += 3){
          // each traversal should examine each box
          var cur = []
          for (var i = 0; i < 9; i++){
              var coordinates = [...boxCoordinates[i]]
              coordinates[0] += y
              coordinates[1] += x
              if (cur.includes(board[coordinates[0]][coordinates[1]])){
                  return false
              }
              else if (board[coordinates[0]][coordinates[1]] != null){
                  cur.push(board[coordinates[0]][coordinates[1]])
              }
          }
      }
  }
  return true
}

function App() {
  const inputRefs = React.createRef();

  const [puzzle, setPuzzle] = React.useState([]);
  const [difficulty, setDifficulty] = React.useState('easy');
  const [validationMsg, setValidationMsg] = React.useState('unsolved');
  const [loading, setLoading] = React.useState(true);
  

  React.useEffect(() => {
    setLoading(true);

    const getPuzzleData = async () => {
      const data = await fetch(`https://vast-chamber-17969.herokuapp.com/generate?difficulty=${difficulty}`);
      const json = await data.json();
      const puzzle = createPuzzle(json.puzzle);

      setPuzzle(puzzle);
      setLoading(false);
    }

    getPuzzleData()
      .catch(console.error);    
  }, [difficulty]);

  const handleClear = () => {
    setPuzzle(emptyBoard);
  }

  const handleSolve = () => {
    const solvedPuzzle = solve(puzzle);
    
    if (!solvedPuzzle) {
      setValidationMsg('unsolvable');
      return false;
    }

    setPuzzle(solvedPuzzle);
  }

  const handleValidate = () => {
    const validate = solved(puzzle);
    
    if (validate) {
      setValidationMsg('solved')
    } else {
      setValidationMsg('unsolved');
    }
  }

  const setValue = (x, y, value) => {
    const parsedValue = parseInt(value);
    const updatedPuzzle = [...puzzle];

    if (value.length > 1) {
      return false;
    }

    updatedPuzzle[y][x] = parsedValue;
    setPuzzle(updatedPuzzle);
  }

  if (loading) {
    return (
      <main className="App">
        <h1>SPEDOKU</h1>
        <h3
          className="loading"
        >
          Loading...
        </h3>
      </main>
    );
  }

  return (
    <main className="App">
      <h1>SPEDOKU</h1>
      <div className="spedoku-container">
        <table className="spedoku-table">
          <tbody>
            {
              puzzle.map((row, y) => (
                <tr
                  key={y}
                >
                  {
                    row.map((value, x) => (
                      <td
                        key={x}
                      >
                        <input
                          type="text"
                          value={value || ''}
                          onChange={e => setValue(x, y, e.target.value)}
                          ref={inputRefs}
                        />                        
                      </td>
                    ))
                  }
                </tr>
              ))
            }          
          </tbody>
        </table>
      </div>
      <section className="section-container">
        <h3>Generate Puzzle</h3>
        <button
          className="difficulty-btn easy"
          onClick={() => setDifficulty('easy')}
        >
          Easy
        </button>
        <button
          className="difficulty-btn medium"
          onClick={() => setDifficulty('medium')}
        >
          Medium
        </button>
        <button
          className="difficulty-btn hard"
          onClick={() => setDifficulty('hard')}
        >
          Hard
        </button>
        <button
          className="difficulty-btn clear-btn"
          onClick={() => handleClear()}
        >
          Clear
        </button>
      </section>
      <section className="section-container">
      <button
        className="solution-btn difficulty-btn validate-btn"
        onClick={() => handleValidate()}
      >
        validate
      </button>
      <span
        className="pair-message validate-message"
      >
        {validationMsg}
      </span>
      <span
        className="pair-message difficulty-message"
      >
        {difficulty}
      </span>
      <button
        className="solution-btn difficulty-btn difficulty-pair-btn"
      >
        Difficulty
      </button>
      </section>
      <section className="section-container">
        <button
          className="solve-btn"
          onClick={() => handleSolve()}
        >
          Solve Now!
        </button>
      </section>
    </main>
  );
}

export default App;
