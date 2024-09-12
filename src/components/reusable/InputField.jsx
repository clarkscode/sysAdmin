const InputField = ({
  id,
  name,
  type,
  value,
  onChange,
  required,
  placeholder,
}) => {
  return (
    <div>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="block w-full rounded-lg border border-gray-300 py-5 px-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default InputField;
