import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/UI/PrimaryButton';
import Title from '../components/UI/title';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction) {

    if ( 
        (direction === 'lower' && currentGuess < userNumber) || 
        (direction === 'greater' && currentGuess > userNumber)
    ) {
        Alert.alert("Don't lie!", "You know that this is wrong...", [
            {text: 'Sorry', style: 'cancel' },
        ]);
        return;
    }
        if(direction === 'lower') {
            maxBoundary = currentGuess;
           const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        } else {
            minBoundary = currentGuess + 1;
        }
            const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
            setCurrentGuess(newRndNumber);
    }

    return <View style={styles.screen}>
    <Title>Opponent's Guess</Title>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card>
        <InstructionText style={styles.instructionTextinstructionText}>Higher or Lower</InstructionText>
        <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
       <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white" /></PrimaryButton>
       </View>
       <View style={styles.buttonContainer}>
       <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white" /></PrimaryButton>
       </View>
       </View>
    </Card>
    <View>
        {/* LOG ROUNDS */}
    </View>
    </View>
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    buttonsContainer:{
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1,
    },
    instructionText: {
        marginBottom: 12
    }
})