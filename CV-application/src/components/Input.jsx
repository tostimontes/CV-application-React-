import '../styles/Input.css'

export default function Input({value, onChange, placeholder, type = 'text', name, id, className, disabled = false, style, isRequired = false, dataLabel }) {
    
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            name={name}
            id={id}
            className={className}
            disabled={disabled}
            style={style}
            required={isRequired}
            dataLabel={dataLabel}
        />
    )
}