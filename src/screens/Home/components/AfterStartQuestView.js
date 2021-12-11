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
        <View style={styles.questionWrap}>
          <Text style={styles.question}>
            {question.text}
          </Text>
        </View>
        <View style={styles.btnBox}>
          <Button
            onPress={() => submitAnswer(false)}
            title="별로..."
            type="gray"
            containerStyle={{ flex: 0.4, height: 40 }}
          />
          <Button
            onPress={() => submitAnswer(true)}
            title="좋아요"
            type="dark"
            containerStyle={{ flex: 0.4, height: 40 }}
          />
        </View>
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    shadowColor: '#7d7d7d',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6,
    elevation: 14,
    backgroundColor: '#ffffff',
  },
  questionWrap: {
    justifyContent: 'center',
    flex: 1,
  },
  question: {
    fontSize: 16,
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default AfterStartQuestView;
