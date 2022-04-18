/**
 * SPEDOKU is just another React Sudoku game.
 * 
 * @author Jorge Carmona <jc@carmonaweb.com>
 * @license Released under the MIT license.
 * 
 * Credits:
 * API to fecth puzzle on different complexities: 
 * - https://vast-chamber-17969.herokuapp.com/generate?difficulty=medium
 * 
 * App is based on the following sudoku app:
 * - https://sugoku.herokuapp.com/
 * 
 * Some code/functions/ideas were taken from the following projects.
 * - https://github.com/JackHeTech/Sudoku-Solver
 * - https://github.com/cenxky/sudoku-react
 * 
 */
import React from 'react';
import './App.css';

import {
  DifficultyButtonGroup,
  StatusButtonGroup
} from './components';

import utils from './utils';

const {
  createPuzzle,
  getEmptyBoard,
  solve,
  solved,
} = utils;

const SOLVED = 'solved';
const UNSOLVABLE = 'unsolvable';
const UNSOLVED = 'unsolved';


function App() {
  const inputRefs = React.createRef();

  const [puzzle, setPuzzle] = React.useState([]);
  const [difficulty, setDifficulty] = React.useState('easy');
  const [validationMsg, setValidationMsg] = React.useState(UNSOLVED);
  const [loading, setLoading] = React.useState(true);
  
  const getPuzzleData = async (level) => {
    const data = await fetch(`https://vast-chamber-17969.herokuapp.com/generate?difficulty=${level}`);
    const json = await data.json();
    const puzzle = createPuzzle(json.puzzle);

    setPuzzle(puzzle);
    setLoading(false);
  }

  React.useEffect(() => {
    setLoading(true);
    setValidationMsg(UNSOLVED);

    getPuzzleData()
      .catch(console.error);    
  }, []);

  const handleClear = () => {
    setValidationMsg(UNSOLVED);
    setPuzzle(getEmptyBoard());
  }

  const handleSolve = () => {
    const solvedPuzzle = solve(puzzle);
    
    if (!solvedPuzzle) {
      setValidationMsg(UNSOLVABLE);
      return false;
    }

    setPuzzle(solvedPuzzle);
  }

  const handleValidate = () => {
    const validate = solved(puzzle);
    
    if (validate) {
      setValidationMsg(SOLVED)
    } else {
      setValidationMsg(UNSOLVED);
    }
  }

  const setValue = (x, y, value) => {
    const parsedValue = parseInt(value);
    const updatedPuzzle = [...puzzle];

    if (value.length > 1) {
      return false;
    }

    updatedPuzzle[y][x] = Number.isNaN(parsedValue) ? null : parsedValue;
    setPuzzle(updatedPuzzle);
  }

  const handleDifficultyLevel = (level) => {
    setValidationMsg(UNSOLVED);
    
    getPuzzleData(level)
      .catch(console.error); 

    setDifficulty(level);
  }

  return (
    <main className="App">
      <h1>SPEDOKU</h1>
      <div className="spedoku-container">
        {
          loading &&
          <h3 className="loading">
            Loading Puzzle...
          </h3>
        }
        {
          !loading &&
          <table className="spedoku-table">
            <tbody>
              {
                puzzle.map((row, y) => {
                  const bottomCellStyle = y % 3 === 2 ? 'block-bottom-border' : '';

                  return (
                    <tr
                      className={bottomCellStyle}
                      key={y}
                    >
                      {
                        row.map((value, x) => {
                          const sideCellStyle = x % 3 === 2 ? 'block-side-border' : '';

                          return (
                            <td
                            className={sideCellStyle}
                              key={x}
                            >
                              <input
                                type="text"
                                value={value || ''}
                                onChange={e => setValue(x, y, e.target.value)}
                                ref={inputRefs}
                              />                        
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }          
            </tbody>
          </table>
        }        
      </div>
      <section className="section-container">
        <h3>Puzzle Controls</h3>
        <DifficultyButtonGroup
          setDifficultyLevel={handleDifficultyLevel}
        />
        <button
          className="difficulty-btn clear-btn"
          onClick={() => handleClear()}
        >
          Clear
        </button>
      </section>
      <section className="section-container">
        <StatusButtonGroup
          buttonLabel="Validate"
          textSectionLabel={validationMsg}
          trigger={handleValidate}
        />
        <span
          className="spacer"
        />   
        <StatusButtonGroup
          buttonLabel="Difficulty"
          buttonLocation="right"
          textSectionLabel={difficulty}
        />
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
