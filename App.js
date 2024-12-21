import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [winners, setWinners] = useState([]);
  const [winnerMessage, setWinnerMessage] = useState(""); 

  const teamA = "Tim A";
  const teamB = "Tim B";

  const increaseScore = (team) => {
    if (team === 'A') {
      const newScore = scoreA + 1;
      setScoreA(newScore);
      if (newScore === 10) {
        const message = `${teamA} Menang!`;
        setWinnerMessage(message); 
        setWinners((prevWinners) => [...prevWinners, teamA]);
        resetScores();
      }
    } else if (team === 'B') {
      const newScore = scoreB + 1;
      setScoreB(newScore);
      if (newScore === 10) {
        const message = `${teamB} Menang!`;
        setWinnerMessage(message); 
        setWinners((prevWinners) => [...prevWinners, teamB]);
        resetScores();
      }
    }
  };

  const decreaseScore = (team) => {
    if (team === 'A' && scoreA > 0) {
      setScoreA(scoreA - 1);
    } else if (team === 'B' && scoreB > 0) {
      setScoreB(scoreB - 1);
    }
  };

  const resetScores = () => {
    setScoreA(0);
    setScoreB(0);
  };

  const CustomButton = ({ title, onPress, color }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Pengelola Skor Futsal</Text>

      {winnerMessage !== "" && (
        <View style={styles.winnerMessageContainer}>
          <Text style={styles.winnerMessageText}>{winnerMessage}</Text>
        </View>
      )}

      <View style={styles.teamContainer}>
        <Text style={[styles.teamName, { color: '#ff6f61' }]}>{teamA}</Text>
        <Text style={styles.score}>{scoreA}</Text>
        <View style={styles.buttonRow}>
          <CustomButton title="+" onPress={() => increaseScore('A')} color="#ff6f61" />
          <CustomButton title="-" onPress={() => decreaseScore('A')} color="#ff6f61" />
        </View>
      </View>

      <View style={styles.teamContainer}>
        <Text style={[styles.teamName, { color: '#4caf50' }]}>{teamB}</Text>
        <Text style={styles.score}>{scoreB}</Text>
        <View style={styles.buttonRow}>
          <CustomButton title="+" onPress={() => increaseScore('B')} color="#4caf50" />
          <CustomButton title="-" onPress={() => decreaseScore('B')} color="#4caf50" />
        </View>
      </View>

      <TouchableOpacity onPress={resetScores} style={[styles.resetButton, { backgroundColor: '#f44336' }]}>
        <Text style={styles.resetButtonText}>Reset Skor</Text>
      </TouchableOpacity>

      {winners.length > 0 && (
        <View style={styles.winnersContainer}>
          <Text style={styles.winnersTitle}>Daftar Pemenang:</Text>
          {winners.map((winner, index) => (
            <Text key={index} style={styles.winnerItem}>
              {index + 1}. {winner}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  teamContainer: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    width: 80,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 3,
    width: '20%',
    backgroundColor: '#f44336',
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  winnersContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  winnersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  winnerItem: {
    fontSize: 16,
    color: '#555',
  },
  winnerMessageContainer: {
    backgroundColor: '#4caf50',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  winnerMessageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
