import React from "react";

const InputField = React.forwardRef(
  ({ label, type, value, onChange, inputRef, error, ...otherProps }, ref) => {
    return (
      <label className="flex mt-3 flex-wrap">
        <div className="mr-2 text-md">{label}</div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          ref={ref}
          {...otherProps}
          aria-invalid={error ? "true" : undefined}
          className="grow px-2 border-l border-b border-solid border-black text-md text-black"
        />
        {error && <div>⚠️ {error}</div>}
      </label>
    );
  }
);

export default InputField;
