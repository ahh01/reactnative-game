import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const generateEmptyBoard = (size) => {
  let board = [];
  for (let i = 0; i < size; i++) {
    board[i] = new Array(size).fill(null);
  }
  return board;
};

const placeBombs = (board, numBombs) => {
  let bombsPlaced = 0;
  while (bombsPlaced < numBombs) {
    const row = Math.floor(Math.random() * board.length);
    const col = Math.floor(Math.random() * board[0].length);
    if (board[row][col] !== "B") {
      board[row][col] = "B";
      bombsPlaced++;
    }
  }
};

const calculateNumbers = (board) => {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "B") continue;

      let bombCount = 0;
      directions.forEach(([dx, dy]) => {
        const newRow = i + dx;
        const newCol = j + dy;
        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < board[0].length
        ) {
          if (board[newRow][newCol] === "B") bombCount++;
        }
      });
      board[i][j] = bombCount;
    }
  }
};

export default function MinesweeperScreen() {
  const [board, setBoard] = useState(generateEmptyBoard(10));
  const [gameOver, setGameOver] = useState(false);
  const [revealed, setRevealed] = useState(generateEmptyBoard(10));
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [highscore, setHighscore] = useState(0);

  // Ladda highscore vid start
  useEffect(() => {
    const loadHighscore = async () => {
      const savedHighscore = await AsyncStorage.getItem("highscore");
      if (savedHighscore) {
        setHighscore(parseInt(savedHighscore, 10));
      }
    };
    loadHighscore();
  }, []);

  const startGame = () => {
    let newBoard = generateEmptyBoard(10);
    placeBombs(newBoard, 10);
    calculateNumbers(newBoard);
    setBoard(newBoard);
    setRevealed(generateEmptyBoard(10));
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  const saveHighscore = async (currentScore) => {
    if (currentScore > highscore) {
      setHighscore(currentScore);
      await AsyncStorage.setItem("highscore", currentScore.toString());
    }
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < revealed.length; i++) {
      for (let j = 0; j < revealed[i].length; j++) {
        if (revealed[i][j] !== null && revealed[i][j] !== "B") {
          score++;
        }
      }
    }
    return score;
  };

  const revealCell = (row, col) => {
    if (gameOver || revealed[row][col] !== null) return;

    let newRevealed = [...revealed];
    newRevealed[row][col] = board[row][col];
    setRevealed(newRevealed);

    if (board[row][col] === "B") {
      setGameOver(true);
      const finalScore = calculateScore();
      setScore(finalScore);
      saveHighscore(finalScore);
    } else {
      setScore(calculateScore());
    }
  };

  const renderCell = (row, col) => {
    if (revealed[row][col] === null) {
      return (
        <TouchableOpacity
          key={`${row}-${col}`}
          style={styles.cell}
          onPress={() => revealCell(row, col)}
        />
      );
    }
    return (
      <View key={`${row}-${col}`} style={styles.cell}>
        {revealed[row][col] === "B" ? (
          <Text style={styles.bomb}>💣</Text>
        ) : (
          <Text style={styles.number}>{revealed[row][col]}</Text>
        )}
      </View>
    );
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {gameOver && (
        <View style={styles.infoContainer}>
          <View style={styles.gameOverCard}>
            <Text style={styles.gameOverText}>GAME OVER</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreText}>Poäng: {score}</Text>
          </View>
          <View style={styles.highscoreCard}>
            <Text style={styles.highscoreText}>Högsta Poäng: {highscore}</Text>
          </View>
        </View>
      )}

      {renderBoard()}

      <View style={styles.buttonContainer}>
        {gameOver || !gameStarted ? (
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>
              {gameOver ? "Börja om" : "Starta spelet"}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#c086e2",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 30,
    height: 30,
    margin: 2,
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
  },
  bomb: {
    fontSize: 18,
  },
  number: {
    fontSize: 14,
    color: "black",
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  gameOverCard: {
    backgroundColor: "red", // Röd bakgrund för spelet slut
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scoreCard: {
    backgroundColor: "orange", // Orange bakgrund för poäng
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  highscoreCard: {
    backgroundColor: "orange", // Orange bakgrund för högsta poäng
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  highscoreText: {
    fontSize: 18,
    fontWeight: "bold",

  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
