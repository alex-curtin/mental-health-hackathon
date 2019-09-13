import React from 'react';
import { Form, Button, Radio, Input, TextArea } from 'semantic-ui-react';

export default function MoodForm(props) {
  return (
    <div>
      <Form onSubmit={props.handleSubmit}>
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
        <Form.Group>
          <label>Mood</label>
          <Form.Field
            control={Radio}
            value='-1'
          />
          <Form.Field
            control={Radio}
            label='0'
            value='0'
          />
          <Form.Field
            control={Radio}
            label='1'
            value='1'
          />
        </Form.Group>
        <Form.Group>
          <label>Have you taken time for yourself:</label>
          <Form.Field
            control={Radio}
            label='Yes'
            value={true}
          />
          <Form.Field
            control={Radio}
            label='No'
            value={false}
          />
        </Form.Group>
        <Button>Submit</Button>
      </Form>
    </div>
  )
}
