const NameField = props => (
  <label>
    Name: <input type="text" name="name" required {...props} />
  </label>
);

const EmailField = props => (
  <label>
    Email: <input type="email" name="email" required {...props} />
  </label>
);

const DropdownOption = ({ value, label, disabled }) => (
  <option value={value ?? label} disabled={disabled}>
    {label}
  </option>
);

const DropdownField = ({ label, valueName, value, onChange, options }) => (
  <label>
    {label}:
    <select name={valueName} required value={value} onChange={onChange}>
      <DropdownOption label={`Select a ${label}`} value="" disabled />
      {options.map((option, i) => (
        <DropdownOption key={i} {...option} />
      ))}
    </select>
  </label>
);

const MessageField = props => (
  <label>
    Message: <textarea name="message" required {...props} />
  </label>
);

export { NameField, EmailField, MessageField, DropdownField };
