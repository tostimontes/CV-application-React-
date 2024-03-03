export default function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  name,
  id,
  max,
  className,
  disabled = false,
  style,
  isRequired = false,
  dataLabel,
  autoFocus,
}) {
  return type === 'textarea' ? (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      id={id}
      className={className}
      disabled={disabled}
      style={style}
      required={isRequired}
      dataLabel={dataLabel}
    />
  ) : (
    <input
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      name={name}
      id={id}
      max={max}
      className={className}
      disabled={disabled}
      style={style}
      required={isRequired}
      dataLabel={dataLabel}
    />
  );
}
