interface FormInputProps {
  label: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
}

const FormInput = ({ label, type, value, setValue }: FormInputProps) => {
  return (
    <label>
      {label}:
      <input
        className="form-input"
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
};

export default FormInput;
