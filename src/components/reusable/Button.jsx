const Button = ({
  type,
  label,
  onClick,
  bgColor = "#0544B5",
  textColor = "#fff",
  customClass,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex w-full justify-center rounded-full bg-[#0544B5] px-3 py-3 text-md font-semibold leading-6  shadow-lg hover:shadow-xl transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  glass-effect ${customClass}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label}
    </button>
  );
};

export default Button;
