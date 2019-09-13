import React from 'react';
import { Form, Button, Radio, Input, TextArea, Dropdown } from 'semantic-ui-react';

const moodOptions = [
  {
    key: "happy",
    text: "happy",
    value: "happy",
  },
  {
    key: "neutral",
    text: "neutral",
    value: "neutral",
  },
  {
    key: "stressed",
    text: "stressed",
    value: "stressed",
  }
]

export default function EntryForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor='title'>Title</label>
        <Input
          type="string"
          name='title'
          value={props.formData.title}
          onChange={props.handleChange}
          placeholder='title'
        />
        <label htmlFor="details">Details</label>
        <TextArea
          name='details'
          value={props.formData.details}
          onChange={props.handleChange}
          placeholder='details'
        />
        <label htmlFor="mood">How are you feeling:</label>
        <select
          onChange={props.handleChange}
          placeholder="select your mood"
          value={props.formData.mood}
          name="mood"
        >
          {moodOptions.map(option => (
            <option
              key={option.key}
              value={option.value}
            >{option.text}</option>
          ))}
        </select>
        <label htmlFor="self_care">Have you taken time for yourself:</label>
        <select
          onChange={props.handleChange}
          placeholder={'yes'}
          value={props.formData.self_care}
          name='self_care'
        >
          <option key="Yes" value="Yes">Yes</option>
          <option key="No" value="No">No</option>
        </select>
        <Button>Submit</Button>
      </form>
    </div>
  )
}
