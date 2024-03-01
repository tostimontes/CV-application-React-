export default function Button({ name, onClick, children, type = 'button', disabled = false, className, style, id, title, variant }) {
    const classNames = `button ${variant} ${className}`;
    
    return (
        <button
            name={name}
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={classNames}
            style={style}
            id={id}
            title={title}
        >
            {children}
        </button>
    );
}