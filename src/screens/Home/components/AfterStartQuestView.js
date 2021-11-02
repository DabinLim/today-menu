import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { questionList } from '../utils';
import Button from '../../../components/Button';

const AfterStartQuestView = ({ scenarioIdx }) => {
  const questions = questionList[scenarioIdx];
  const [question, setQuestion] = useState(questions.depth2.question);
  const [currentDepth, setCurrentDepth] = useState(2);
  const [isDone, setIsDone] = useState(false);

  const submitAnswer = (answer) => {
    console.log(currentDepth);
    switch (currentDepth) {
      case 2:
        if (answer) {
          if (questions.depth2.positive) {
            setQuestion(questions.depth3.previousPositive.question);
            break;
          } else {
            setIsDone(true);
            break;
          }
        } else if (questions.depth2.negative) {
          setQuestion(questions.depth3.previousNegative.question);
          break;
        } else {
          setIsDone(true);
          break;
        }
      case 3:
        if (question === '고기랑 같이 드실래요?' && !answer) {
          setQuestion(questions.depth4.question);
          break;
        }
        break;
      default:
        break;
    }
    setCurrentDepth((n) => n + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionCard}>
        <View>
          <Text styles={styles.question}>
            {question.text}
          </Text>
        </View>
      </View>
      <View style={styles.btnBox}>
        <Button
          onPress={() => submitAnswer(false)}
          title="별로..."
          type="gray"
          containerStyle={{ flex: 0.5, marginRight: 10 }}
        />
        <Button
          onPress={() => submitAnswer(true)}
          title="좋아요"
          type="dark"
          containerStyle={{ flex: 0.5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  questionCard: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  question: {
  },
  btnBox: {
    flexDirection: 'row',
    marginTop: 40,
  },
});

export default AfterStartQuestView;
