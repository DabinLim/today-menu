export const questionList = [
  {
    depth1: {
      question: {
        text: '오늘은 시원한 음식이 먹고 싶어요',
        key: 'isCold',
      },
    },
    depth2: {
      question: {
        text: '면 음식은 어떠세요?',
        key: 'isNoodle',
      },
      positive: false,
      negative: false,
    },
  },
  {
    depth1: {
      question: {
        text: '오늘은 술과 함께 할 술안주를 찾아요.',
        key: 'isWithAlcohol',
      },
    },
    depth2: {
      question: {
        text: '국물이 들어간 음식은 어떠세요?',
        key: 'isSoup',
      },
      positive: true,
      negative: true,
    },
    depth3: {
      previousPositive: {
        question: {
          text: '매콤한 요리는 어떠세요?',
          key: 'isSpicy',
        },
        positive: false,
        negative: false,
      },
      previousNegative: {
        question: {
          text: '매콤한 요리는 어떠세요?',
          key: 'isSpicy',
        },
        positive: false,
        negative: true,
      },
    },
  },
  {
    depth1: {
      question: {
        text: '오늘은 해장이 필요해요.',
        key: 'isHangoverFood',
      },
    },
    depth2: {
      question: {
        text: '국물이 들어간 음식은 어떠세요?',
        key: 'isSoup',
      },
      positive: true,
      negative: true,
    },
    depth3: {
      previousPositive: {
        question: {
          text: '매콤한 요리는 어떠세요?',
          key: 'isSpicy',
        },
        positive: false,
        negative: false,
      },
      previousNegative: {
        question: {
          text: '매콤한 요리는 어떠세요?',
          key: 'isSpicy',
        },
        positive: false,
        negative: true,
      },
    },
  },
  {
    depth1: {
      question: {
        text: '한국인은 역시 밥심! 밥과 함께 먹고 싶어요.',
        key: 'isRice',
      },
    },
    depth2: {
      question: {
        text: '국물이 들어간 음식은 어떠세요?',
        key: 'isSoup',
      },
      positive: true,
      negative: true,
    },
    depth3: {
      previousPositive: {
        question: {
          text: '얼큰한 요리는 어떠세요?',
          key: 'isSpicy',
        },
        positive: false,
        negative: false,
      },
      previousNegative: {
        question: {
          text: '고기랑 같이 드실래요?',
          key: 'isMeat',
        },
        positive: false,
        negative: true,
      },
    },
    depth4: {
      question: {
        text: '그럼 해산물은 어떠세요?',
        key: 'isSeafood',
      },
    },
  },
];

export const getFirstQuestion = questionList.map((v, idx) => ({
  label: v.depth1.question.text,
  value: idx,
  key: v.depth1.question.key,
}));
