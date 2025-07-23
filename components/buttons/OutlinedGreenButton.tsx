"use client";

interface OutlinedGreenButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const OutlinedGreenButton: React.FC<OutlinedGreenButtonProps> = ({
  label = 'Learn how to hire',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  // Check if a custom rounded class is already present
  const hasCustomRadius = /\brounded-[^\s]+\b/.test(className);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${
          disabled
            ? 'border border-gray-300 text-gray-400 cursor-not-allowed'
            : 'border border-green-600 text-green-600 hover:bg-green-50'
        }
        font-medium py-2 px-6 transition-colors duration-200 bg-white
        ${hasCustomRadius ? '' : 'rounded-lg'}
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default OutlinedGreenButton;
