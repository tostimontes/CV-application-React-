export default function Button({
  name,
  onClick,
  children,
  type = 'button',
  disabled = false,
  className,
  style,
  id,
  text,
  title,
  variant,
}) {
  const classNames = `button ${variant} ${className}`;
  function handleClick(e) {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  }

  return (
    <button
      name={name}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      className={classNames}
      style={style}
      id={id}
      title={title}
      value={text}
    >
      {children}
    </button>
  );
}
