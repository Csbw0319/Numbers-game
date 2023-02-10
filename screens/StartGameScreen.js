import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';

import PrimaryButton from '../components/UI/PrimaryButton';
import Title from '../components/UI/title';
import Colors from '../constants/colors';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';


function StartGameScreen({onPickNumber}) {
    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const choseNumber = parseInt(enteredNumber);  


        
        if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99 ) {
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        onPickNumber(choseNumber);
    }

    return (
        <View style={styles.rootContainer}>
            <Title>Guess My Number</Title>
        <Card>
            <InstructionText>
                Enter a Number
            </InstructionText>
            <TextInput 
            style={styles.numberInput} 
            maxLength={2} keyboardType="number-pad" 
            autoCapitalize="none" 
            autoCorrect={false} 
            onChangeText={numberInputHandler}
            value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>
            </View>
        </Card>
        </View>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',  
    },
    buttonContainer: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
})