// Private members
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

function searchForSolution(boards) {
  // List[Board] -> Board or false
  // finds a valid solution to the sudoku problem
  if (boards.length < 1){
    return false;
  } else {
    // backtracking search for solution
    const first = boards.shift();
    const tryPath = puzzleHelper.solve(first);

    if (tryPath !== false){
        return tryPath;
    }
    else{
        return searchForSolution(boards);
    }
  }
}

function nextBoards(board) { 
  // Board -> List[Board]
  // finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
  let res = [];
  const firstEmpty = findEmptySquare(board);

  if (firstEmpty !== undefined){
    const y = firstEmpty[0];
    const x = firstEmpty[1];

    for (let i = 1; i <= 9; i++) {
      const newBoard = [...board];
      const row = [...newBoard[y]];

      row[x] = i;
      newBoard[y] = row;

      res.push(newBoard);
    }
  }
  return res;
}

function findEmptySquare(board) {
  // Board -> [Int, Int] 
  // (get the i j coordinates for the first empty square)
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == null) {
          return [i, j];
      }
    }
  }
}

function keepOnlyValid(boards){
  // THIS FUNCTION WORKS.
  // List[Board] -> List[Board]
  // filters out all of the invalid boards from the list
  let res = [];

  for (let i = 0; i < boards.length; i++) {
    if (validBoard(boards[i])){
       res.push(boards[i]);
    }
  }
  return res;
}

function validBoard(board){
  // Board -> Boolean
  // checks to see if given board is valid
  return rowsGood(board) && columnsGood(board) && boxesGood(board);
}

function rowsGood(board){
  // Board -> Boolean
  // makes sure there are no repeating numbers for each row
  for (let i = 0; i < 9; i++) {
    let cur = [];
    
    for (let j = 0; j < 9; j++){
      if (cur.includes(board[i][j])){
        return false;
      } else if (board[i][j] !== null){
        cur.push(board[i][j]);
      }
    }
  }

  return true;
}

function columnsGood(board){
  // Board -> Boolean
  // makes sure there are no repeating numbers for each column
  for (let i = 0; i < 9; i++) {
    var cur = [];

    for (let j = 0; j < 9; j++){
      if (cur.includes(board[j][i])){
        return false;
      }
      else if (board[j][i] != null){
        cur.push(board[j][i]);
      }
    }
  }

  return true;
}

function boxesGood(board){
  // transform this everywhere to update res
  const boxCoordinates = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2]
  ];

  // Board -> Boolean
  // makes sure there are no repeating numbers for each box
  for (let y = 0; y < 9; y += 3){
    for (let x = 0; x < 9; x += 3){
      // each traversal should examine each box
      let cur = [];

      for (let i = 0; i < 9; i++){
        const coordinates = [...boxCoordinates[i]];
        coordinates[0] += y;
        coordinates[1] += x;

        if (cur.includes(board[coordinates[0]][coordinates[1]])){
          return false;
        } else if (board[coordinates[0]][coordinates[1]] != null){
          cur.push(board[coordinates[0]][coordinates[1]]);
        }
      }
    }
  }

  return true;
}

// Public util functions
const puzzleHelper = {
  createPuzzle: (puzzleData) => {
    const puzzleArray = [];
    
    for (let i=1; i < 10; i++) {
      const arrayRow = [];
      
      for (let j=1; j < 10; j++) {
        const currentCel = letterToRowLookup[i] + j;
        if (puzzleData[currentCel]) {
          arrayRow.push(Number(puzzleData[currentCel]))
        } else {
          arrayRow.push(null);
        }      
      }
    
      puzzleArray.push(arrayRow);
    }
    
    return puzzleArray;
  },

  getEmptyBoard: () => {
    return emptyBoard;
  },

  solve: (board) => {
    // Board -> Board
    // solves the given sudoku board
    // ASSUMES the given sudoku board is valid
    if (puzzleHelper.solved(board)) {
      return board;
    } else {
      const possibilities = nextBoards(board);
      const validBoards = keepOnlyValid(possibilities);
  
      return searchForSolution(validBoards);
    }
  },
  
  solved: (board) => {
    // Board -> Boolean
    // checks to see if the given puzzle is solved
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] == null){
          return false;
        }
      }
    }
    return true
  }
};

export default puzzleHelper;
