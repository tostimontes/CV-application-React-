import { useState } from 'react';
import '../styles/Form.css';
import Button from './Buttons';
import Input from './Input';
import { validate } from 'uuid';

export default function Form({
  id,
  title,
  inputs,
  buttons,
  onSubmit,
  onCancel,
  onEdit,
  onReset,
  onDelete,
  initialData,
  isEditing,
}) {
  const [formData, setFormData] = useState({ id, ...initialData });

  function handleChange(field) {
    return function (e) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: e.target.value,
      }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  function handlePersonalEdit() {
    onEdit();
  }

  function handleCancel(e) {
    e.preventDefault();
    const newFormData = { id, ...initialData };
    setFormData(newFormData);
    onReset(newFormData);
  }

  function handleDelete() {
    onDelete();
  }

  // TODO: autoFocus on first input
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
                disabled={!isEditing && id === 'personal-info'}
              ></Input>
            </>
          );
        })}
        {buttons.map((button) => {
          // Handle delete button for all forms
          if (button.name === 'delete') {
            return (
              <Button key={button.id} onClick={handleDelete}>
                {button.children}
              </Button>
            );
          }

          // Specific logic for 'personal-info' form
          if (id === 'personal-info') {
              if (
                (isEditing &&
                  (button.name === 'save' || button.name === 'cancel')) ||
                (!isEditing && button.name === 'edit')
              ) {
                
                return (
                  <Button
                    key={button.id}
                    id={button.id}
                    type={button.type}
                    onClick={button.name === 'edit' ? handlePersonalEdit: button.onClick}
                  >
                    {button.children.join(' ')}
                  </Button>
                );
              }
            // Skip rendering other buttons in edit mode for personal-info
            return null;
          }

          // Default button render for other forms
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
