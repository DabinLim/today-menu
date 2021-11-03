import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { questionList } from '../utils';
import Button from '../../../components/Button';

const AfterStartQuestView = ({
  scenarioIdx,
  setIsDone,
  setAnswerList,
  answerList,
  setNegativeList,
  negativeList,
}) => {
  const questions = questionList[scenarioIdx];
  const [question, setQuestion] = useState(questions.depth2.question);
  const [currentDepth, setCurrentDepth] = useState(2);

  const submitAnswer = (answer) => {
    const newList = answerList;
    const newNegativeList = negativeList;
    switch (currentDepth) {
      case 2:
        if (answer) {
          // 답이 true면 true를 선택했을때 다음 질문이 있는지 확인
          newList.push(question.key);
          setAnswerList(newList);
          if (questions.depth2.positive) {
            setQuestion(questions.depth3.previousPositive.question);
            break;
          } else {
            setIsDone(true);
            break;
          }
          // 답이 false면 false를 선택했을때 다음 질문이 있는지 확인
        } else if (questions.depth2.negative) {
          newNegativeList.push(question.key);
          setNegativeList(newNegativeList);
          setQuestion(questions.depth3.previousNegative.question);
          break;
        } else {
          newNegativeList.push(question.key);
          setNegativeList(newNegativeList);
          setIsDone(true);
          break;
        }
      case 3:
        if (question.text === '고기랑 같이 드실래요?' && !answer) {
          newNegativeList.push(question.key);
          setNegativeList(newNegativeList);
          setQuestion(questions.depth4.question);
          break;
        } else if (question.text !== '고기랑 같이 드실래요?' && !answer) {
          newNegativeList.push(question.key);
          setNegativeList(newNegativeList);
        }
        newList.push(question.key);
        setAnswerList(newList);
        setIsDone(true);
        break;
      case 4:
        if (answer) {
          newList.push(question.key);
          setAnswerList(newList);
        }
        setIsDone(true);
        break;
      default:
        setIsDone(true);
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
