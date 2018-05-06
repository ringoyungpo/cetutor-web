export const PaperTemplate = JSON.stringify({
  title: '',
  level: 'CET_4',
  writing: {
    directions: ''
  },
  listening: {
    sections: [
      {
        sectionTitle: 'NEWS_REPORT',
        modules: [
          {
            moduleSound: {
              url: ''
            },
            questions: [
              {
                questionSound: {
                  url: ''
                },
                rightAnswer: 0,
                options: ['', '', '', '']
              }
            ]
          }
        ]
      }
    ]
  },
  reading: {
    sections: {
      bankedCloze: {
        passage: '',
        options: ['', '', '', '', '', '', '', '', '', ''],
        rightOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
      locating: {
        title: '',
        paragraphs: ['', '', '', '', '', '', '', '', '', ''],
        questions: [
          { questionContent: '', rightAnswer: 0 },
          { questionContent: '', rightAnswer: 1 },
          { questionContent: '', rightAnswer: 2 },
          { questionContent: '', rightAnswer: 3 },
          { questionContent: '', rightAnswer: 4 },
          { questionContent: '', rightAnswer: 5 },
          { questionContent: '', rightAnswer: 6 },
          { questionContent: '', rightAnswer: 7 },
          { questionContent: '', rightAnswer: 8 },
          { questionContent: '', rightAnswer: 9 }
        ]
      },
      selection: {
        passages: [
          {
            passageContent: '',
            questions: [
              {
                questionContent: '',
                options: ['', '', '', ''],
                rightAnswer: 0
              }
            ]
          }
        ]
      }
    }
  },
  translation: {
    question: ''
  }
})

export const listeningSectionTemplate = JSON.stringify({
  sectionTitle: 'NEWS_REPORT',
  modules: [
    {
      moduleSound: {
        url: ''
      },
      questions: [
        {
          questionSound: {
            url: ''
          },
          rightAnswer: 0,
          options: ['', '', '', '']
        }
      ]
    }
  ]
})

export const listeningModuleTemplate = JSON.stringify({
  moduleSound: {
    url: ''
  },
  questions: [
    {
      questionSound: {
        url: ''
      },
      rightAnswer: 0,
      options: ['', '', '', '']
    }
  ]
})

export const listeningPassageQuestionTemplate = JSON.stringify({
  questionContent: '',
  options: ['', '', '', ''],
  rightAnswer: 0
})

export const listeningQuestionTemplate = JSON.stringify({
  questionSound: {
    url: ''
  },
  rightAnswer: 0,
  options: ['', '', '', '']
})

export const readingPassagesTemplate = JSON.stringify({
  passageContent: '',
  questions: [
    {
      questionContent: '',
      options: ['', '', '', ''],
      rightAnswer: 0
    }
  ]
})

export const readingPassageQuestionTemplate = JSON.stringify({
  questionContent: '',
  options: ['', '', '', ''],
  rightAnswer: 0
})
