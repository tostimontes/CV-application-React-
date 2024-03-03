import { useState } from 'react';
import '../styles/Form.css';
import Button from './Buttons';
import Input from './Input';
import { validate } from 'uuid';
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiCancel } from '@mdi/js';

export default function Form({
  id,
  className,
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

  const today = new Date().toISOString().split('T')[0];

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
      <form
        action=""
        className={className}
        onSubmit={handleSubmit}
        onReset={handleCancel}
      >
        {title && <h2>{title}</h2>}
        {inputs.map((input, index) => {
          return (
            <>
              <label htmlFor={input.id}>
                {input.dataLabel}{' '}
                <span>
                  {input.name === 'end-date' && (
                    <>
                      <br />
                      (Leave empty for ongoing activities)
                    </>
                  )}
                  {input.isRequired && 'required'}
                </span>
              </label>
              <Input
                autoFocus={input.name === 'company' || input.name === 'school'}
                key={input.id}
                id={input.id}
                value={formData[input.name]}
                placeholder={input.placeholder}
                type={input.type}
                max={input.name === 'end-date' ? today : undefined}
                onChange={handleChange(input.name)}
                name={input.name}
                className={input.className}
                isRequired={input.isRequired}
                disabled={!isEditing && id === 'personal-info'}
              ></Input>
            </>
          );
        })}
        <div className="buttons-wrapper">
          {buttons.map((button) => {
            if (button.name === 'delete') {
              return (
                <Button
                  key={button.id}
                  className={'delete'}
                  id={button.id}
                  iconPath={button.iconPath}
                  onClick={handleDelete}
                  value={button.text}
                >
                  {button.iconPath && <Icon path={button.iconPath} />}

                  {button.text}
                </Button>
              );
            }
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
                    iconPath={button.iconPath}
                    onClick={
                      button.name === 'edit'
                        ? handlePersonalEdit
                        : button.onClick
                    }
                    value={button.text}
                  >
                    {button.iconPath && <Icon path={button.iconPath} />}
                    {button.text}
                  </Button>
                );
              }
              return null;
            }
            return (
              <Button
                key={button.id}
                id={button.id}
                type={button.type}
                iconPath={button.iconPath}
                onClick={button.onClick}
                value={button.text}
              >
                {button.iconPath && <Icon path={button.iconPath} />}
                {button.text}
              </Button>
            );
          })}
        </div>
      </form>
    </>
  );
}
