import { useState } from 'react';
import '../styles/Form.css';
import Button from './Buttons';
import Input from './Input';
import { validate } from 'uuid';

function createInitialState(id, inputs) {
  const initialState = { id };

  inputs.forEach((input) => {
    initialState[input.name] = input.value || '';
  });

  return initialState;
}

export default function Form({
  id,
  title,
  inputs,
  buttons,
  onSubmit,
  onCancel,
  onReset,
  onDelete,
  initialData,
}) {
  const [originalData] = useState(
    initialData || createInitialState(id, inputs),
  );

  const [formData, setFormData] = useState({ ...originalData });


  function handleChange(field) {
    return function (e) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: e.target.value,
      }));
    };
  }

  function handleEdit(params) {}

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  function handleCancel(e) {
    e.preventDefault();
    setFormData({ ...originalData });
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit} onReset={handleCancel}>
        {title && <h2>{title}</h2>}
        {inputs.map((input) => {
          return (
            <>
              <label htmlFor={input.id}>
                {input.dataLabel} <span>{input.isRequired && 'required'}</span>
              </label>
              <Input
                key={input.id}
                id={input.id}
                value={formData[input.name]}
                placeholder={input.placeholder}
                type={input.type}
                onChange={handleChange(input.name)}
                name={input.name}
                className={input.className}
                isRequired={input.isRequired}
              ></Input>
            </>
          );
        })}
        {buttons.map((button) => {
          return (
            <Button
              key={button.id}
              id={button.id}
              type={button.type}
              onClick={button.onClick}
            >
              {button.children.join(' ')}
            </Button>
          );
        })}
      </form>
    </>
  );
}
