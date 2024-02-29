import { useState } from 'react'
import './App.css'
import Input from "./components/Input";
import Button from "./components/Buttons";
import Form from "./components/Form";
import CVDisplay from './components/CVDisplay';
import { v4 as uuidv4 } from "uuid";

function App() {
  // Hooks


  // Helpers and handlers
  function handleSubmit() {}

  function handleDelete() {}

  function handleEdit() {}

  // Arrays to pass props to components
  const personalInfo = {
    title: 'Personal information',
    inputs: [
      {
        name: 'fullName',
        value: '',
        placeholder: 'Enter your full name',
        type: 'text',
        id: uuidv4(),
        className: 'full-name',
        isRequired: true,
        dataLabel: 'Full name'
      },
      {
        name: 'email',
        value: '',
        placeholder: 'Enter your email',
        type: 'email',
        id: uuidv4(),
        className: 'email',
        isRequired: true,
        dataLabel: 'Email'
      },
      {
        name: 'phone',
        value: '',
        placeholder: 'Enter your phone number',
        type: 'text',
        id: uuidv4(),
        className: 'phone-number',
        isRequired: true,
        dataLabel: 'Phone number'
      },
      {
        name: 'address',
        value: '',
        placeholder: 'Zip code, city, country',
        type: 'text',
        id: uuidv4(),
        className: 'address',
        isRequired: true,
        dataLabel: 'Address'
      },
    ],
    buttons: [
      {
        name: 'cancel',
        className: 'cancel-button',
        id: uuidv4(),
        children: [
          'Cancel',
          'C'
        ]
      },
      {
        name: 'save',
        type: 'submit',
        className: 'save-button',
        id: uuidv4(),
        children: [
          'Save',
          'S'
        ]
      } 
    ]
  }

  const education =[];
  const jobs =[];

  return (
    <>
    <h1>CV Builder</h1>
    <div className='forms'>
      <Form title={personalInfo.title} inputs={personalInfo.inputs} buttons={personalInfo.buttons}></Form>
    </div>
      {/* <div className='education'>
        <h2>Education</h2>
      <Form></Form>
      <Button></Button>
      </div>
      <div className='jobs'>
        <h2>Professional experience</h2>
      <Form></Form>
      <Button></Button>
      </div>
    <CVDisplay></CVDisplay> */}
    </>
  )
}

export default App
