import React, { useReducer } from 'react'
import styles from './form.module.css'

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  body: '',
  status: 'ERROR'
}
//                 field          field value
// action >>> { type: 'dostuff', name: 'Art' }
const reducer = (state, action) => {
  switch (action.type) {
    // typename is updateFieldValue
    case 'updateFieldValue':
      return {
        ...state, [action.field]: action.value
      }


    case 'updateStatus':
      return { ...state, status: action.status }

    default:
      return INITIAL_STATE
  }
}


const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  // currying >> returned function uses second argument.
  const updateFieldValue = field => event => {
    dispatch({
      // action type is 'updateFieldValue'
      type: 'updateFieldValue',
      field,
      value: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    // actually send the message.target
    console.log(state)
  }

  if (state.status === 'SUCCESS') {
    return (
      <p className={styles.success}>
        Message Sent
      </p>
    )
  }

  return (
    <>
      {state.status === 'ERROR' && (
        <p className={styles.error}>Something went wrong...</p>
      )}
      <form
        className={`${styles.form} ${state.status === 'PENDING' &&
          styles.pending}`}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>
          Name
        <input className={styles.input}
            type='text'
            name='name'
            value={state.name}
            onChange={updateFieldValue('name')}
          />
        </label>
        <label className={styles.label}>
          Email
        <input
            className={styles.input}
            type='email'
            name='email'
            value={state.email}
            onChange={updateFieldValue('email')}
          />
        </label>
        <label className={styles.label}>
          Subject
        <input
            className={styles.input}
            type='text'
            name='subject'
            value={state.subject}
            onChange={updateFieldValue('subject')}
          />
        </label>
        <label className={styles.label}>
          Body
        <textarea
            className={styles.input}
            name='subject'
            value={state.body}
            onChange={updateFieldValue('body')} />
        </label>
        <button className={styles.button}>
          Send
        </button>
      </form>
    </>
  )
}

export default Form
