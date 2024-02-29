import { useState } from 'react'
import '../styles/Form.css'
import Button from './Buttons'
import Input from './Input'
import { validate } from 'uuid';

export default function Form({title, inputs, buttons, onSubmit}) {
    const [formData, setFormData] = useState({fullName: '', email: '', phone: '', address: ''});

    function handleChange(field) {
        return function(e) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [field]: e.target.value
            }));
        };
    }

    function handleSubmit() {
        // take formData and pass it to whatever, the disable buttons
    }
    
    return (
        <>
        <form action="" onSubmit={handleSubmit}>
            <h2>{title}</h2>
            {inputs.map(input => {
                return (
                <>
                <label htmlFor={input.id}>{input.dataLabel} <span>{input.isRequired && 'required'}</span></label>
                <Input
                        key={input.id}
                        id={input.id}
                        value={formData[input.name]}
                        placeholder={input.placeholder}
                        onChange={handleChange(input.name)}
                        name={input.name}
                        className={input.className}
                        isRequired={input.isRequired}
                    >
                    </Input>
                    </>)
                })
            }
            {buttons.map(button => {
                return (
                <Button
                    key={button.id}
                    id={button.id}
                    type={button.type}
                >{button.children.join(' ')}
                </Button>)
            })}
        </form>
        </>
    )
}