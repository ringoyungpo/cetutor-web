import {
  GET_CURRENT_USER_PAPERS,
  PAPERS_LOADING,
  CLEAR_CURRENT_PAPER,
  GET_PAPERS_ALL,
  GET_PAPER,
  ON_PAPER_EDIT_CHANGE
} from '../actions/types'
import {
  listeningSectionTemplate,
  listeningModuleTemplate,
  listeningQuestionTemplate,
  readingPassagesTemplate,
  readingPassageQuestionTemplate
} from '../components/paper/paperTemplate'

const initialState = {
  paper: null,
  allPapers: null,
  currentUserPapers: null,
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PAPERS_LOADING:
      return {
        ...state,
        loading: true
      }
      break
    case GET_CURRENT_USER_PAPERS:
      return {
        ...state,
        currentUserPapers: action.payload,
        loading: false
      }
      break
    case GET_PAPERS_ALL:
      return {
        ...state,
        allPapers: action.payload,
        loading: false
      }
      break
    case GET_PAPER:
      return {
        ...state,
        paper: action.payload,
        loading: false
      }
      break
    case ON_PAPER_EDIT_CHANGE:
      {
        const { name, value } = action.payload
        let [
          valueThis,
          valueState,
          papers,
          valuePaper,
          partField,
          ...partChild
        ] = name.split('.')

        const { paper } = state
        let { title, level, writing, reading, listening, translation } = paper

        switch (partField) {
          case 'title':
            title = value
            break
          case 'level':
            level = value
            break
          case 'writing':
            const [directions] = partChild
            writing[directions] = value
            break
          case 'listening':
            {
              const [
                sections,
                sectionIndex,
                sectionField,
                ...sectionChild
              ] = partChild
              switch (sectionField) {
                case undefined:
                  if (sectionIndex === 'unshift')
                    listening[sections].unshift(
                      JSON.parse(listeningSectionTemplate)
                    )
                  break
                case 'insert':
                  listening[sections].splice(
                    sectionIndex + 1,
                    0,
                    JSON.parse(listeningSectionTemplate)
                  )
                  break
                case 'delete':
                  listening[sections].splice(sectionIndex, 1)
                  break
                case 'sectionTitle':
                  const sectionTitle = sectionField
                  listening[sections][sectionIndex][sectionTitle] = value
                  break
                case 'modules':
                  const [modules, moduleIndex, moduleField, ...moduleChild] = [
                    sectionField,
                    ...sectionChild
                  ]
                  switch (moduleField) {
                    case undefined:
                      if (moduleIndex === 'unshift')
                        listening[sections][[sectionIndex]][modules].unshift(
                          JSON.parse(listeningModuleTemplate)
                        )
                      break
                    case 'insert':
                      listening[sections][[sectionIndex]][modules].splice(
                        moduleIndex + 1,
                        0,
                        JSON.parse(listeningModuleTemplate)
                      )
                      break
                    case 'delete':
                      listening[sections][[sectionIndex]][modules].splice(
                        moduleIndex,
                        1
                      )
                      break
                    case 'moduleSound':
                      const [moduleSound, url] = [moduleField, ...moduleChild]
                      listening[sections][sectionIndex][modules][moduleIndex][
                        moduleSound
                      ][url] = value
                      break
                    case 'questions':
                      const [
                        questions,
                        questionIndex,
                        questionField,
                        ...questionChild
                      ] = [moduleField, ...moduleChild]
                      switch (questionField) {
                        case undefined:
                          if (questionIndex === 'unshift')
                            listening[sections][[sectionIndex]][modules][
                              moduleIndex
                            ][questions].unshift(
                              JSON.parse(listeningQuestionTemplate)
                            )
                          break
                        case 'insert':
                          listening[sections][[sectionIndex]][modules][
                            moduleIndex
                          ][questions].splice(
                            questionIndex + 1,
                            0,
                            JSON.parse(listeningQuestionTemplate)
                          )
                          break
                        case 'delete':
                          listening[sections][[sectionIndex]][modules][
                            moduleIndex
                          ][questions].splice(questionIndex, 1)
                          break
                        case 'questionSound':
                          const [questionSound, url] = [
                            questionField,
                            ...questionChild
                          ]
                          listening[sections][sectionIndex][modules][
                            moduleIndex
                          ][questions][questionIndex][questionSound][
                            url
                          ] = value
                          break
                        case 'options':
                          const [options, optionIndex] = [
                            questionField,
                            ...questionChild
                          ]
                          listening[sections][sectionIndex][modules][
                            moduleIndex
                          ][questions][questionIndex][options][
                            optionIndex
                          ] = value
                          break
                        case 'rightAnswer':
                          const rightAnswer = questionField
                          listening[sections][sectionIndex][modules][
                            moduleIndex
                          ][questions][questionIndex][rightAnswer] = Number(
                            value
                          )
                          break
                      }
                      break
                  }
              }
            }
            break
          case 'reading':
            {
              const [sections, sectionField, ...sectionChild] = partChild
              switch (sectionField) {
                case 'bankedCloze':
                  const [bankedCloze, bankedClozeField, ...bankedClozeChild] = [
                    sectionField,
                    ...sectionChild
                  ]
                  switch (bankedClozeField) {
                    case 'passage':
                      const passage = bankedClozeField
                      reading[sections][bankedCloze][passage] = value
                      break
                    case 'options':
                      const [options, optionIndex, optionOperate] = [
                        bankedClozeField,
                        ...bankedClozeChild
                      ]
                      switch (optionOperate) {
                        case undefined:
                          reading[sections][bankedCloze][options][
                            optionIndex
                          ] = value
                          break
                        case 'insert':
                          reading[sections][bankedCloze][options].splice(
                            optionIndex + 1,
                            0,
                            ''
                          )
                          break
                        case 'delete':
                          reading[sections][bankedCloze][options].splice(
                            optionIndex,
                            1
                          )
                          break
                      }

                      break
                    case 'rightOrder':
                      const [rightOrder, rightOrderIndex] = [
                        bankedClozeField,
                        ...bankedClozeChild
                      ]
                      reading[sections][bankedCloze][rightOrder][
                        rightOrderIndex
                      ] = value
                      break
                  }
                  break
                case 'locating':
                  const [locating, locatingField, ...locatingChild] = [
                    sectionField,
                    ...sectionChild
                  ]
                  switch (locatingField) {
                    case 'title':
                      const tilte = locatingField
                      reading[sections][locating][tilte] = value
                      break
                    case 'paragraphs':
                      const [paragraphs, paragraphIndex, operate] = [
                        locatingField,
                        ...locatingChild
                      ]
                      switch (operate) {
                        case 'insert':
                          reading[sections][locating][paragraphs].splice(
                            paragraphIndex + 1,
                            0,
                            ''
                          )
                          break
                        case 'delete':
                          reading[sections][locating][paragraphs].splice(
                            paragraphIndex,
                            1
                          )
                          break
                        default:
                          reading[sections][locating][paragraphs][
                            paragraphIndex
                          ] = value
                          break
                      }
                      break
                    case 'questions':
                      const [questions, questionIndex, questionField] = [
                        locatingField,
                        ...locatingChild
                      ]
                      switch (questionField) {
                        case 'questionContent':
                          const questionContent = questionField
                          reading[sections][locating][questions][questionIndex][
                            questionContent
                          ] = value
                          break
                        case 'rightAnswer':
                          const rightAnswer = questionField
                          reading[sections][locating][questions][questionIndex][
                            rightAnswer
                          ] = value
                          break
                      }

                      break
                  }
                  break
                case 'selection':
                  const [
                    selection,
                    passages,
                    passageIndex,
                    passageField,
                    ...passageChild
                  ] = [sectionField, ...sectionChild]
                  switch (passageField) {
                    case 'insert':
                      reading[sections][selection][passages].splice(
                        passageIndex + 1,
                        0,
                        JSON.parse(readingPassagesTemplate)
                      )
                      break
                    case 'delete':
                      reading[sections][selection][passages].splice(
                        passageIndex,
                        1
                      )
                      break
                    case 'passageContent':
                      const passageContent = passageField
                      reading[sections][selection][passages][passageIndex][
                        passageContent
                      ] = value
                      break
                    case 'questions':
                      const [
                        questions,
                        questionIndex,
                        questionField,
                        ...questionChild
                      ] = [passageField, ...passageChild]
                      switch (questionField) {
                        case 'delete':
                          reading[sections][selection][passages][passageIndex][
                            questions
                          ].splice(questionIndex, 0)
                          break
                        case 'insert':
                          reading[sections][selection][passages][passageIndex][
                            questions
                          ].splice(
                            questionIndex + 1,
                            0,
                            JSON.parse(readingPassageQuestionTemplate)
                          )
                          break
                        case 'questionContent':
                          const questionContent = questionField
                          reading[sections][selection][passages][passageIndex][
                            questions
                          ][questionIndex][questionContent] = value
                          break
                        case 'options':
                          const [options, optionIndex] = [
                            questionField,
                            ...questionChild
                          ]
                          reading[sections][selection][passages][passageIndex][
                            questions
                          ][questionIndex][options][optionIndex] = value
                          break
                        case 'rightAnswer':
                          const rightAnswer = questionField
                          reading[sections][selection][passages][passageIndex][
                            questions
                          ][questionIndex][rightAnswer] = Number(value)
                          break
                      }

                      break
                  }

                  break
              }
            }
            break
          case 'translation':
            translation = translation
            translation.question = value
            break
        }
        return {
          ...state,
          paper: {
            ...paper,
            title,
            level,
            writing,
            listening,
            reading,
            translation
          }
        }
      }
      break
    default:
      return state
  }
}
