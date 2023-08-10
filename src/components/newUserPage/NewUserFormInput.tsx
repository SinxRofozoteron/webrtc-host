import { useState } from 'react';
import TextField, { type TextFieldProps } from '@rtcapp/webrtc-ui/build/TextField';
import { FormattedMessage } from 'react-intl';

export type NewUserFormInputProps = {
  id: string;
  initialValue: string;
  onChange: (value: string) => void;
  verifyInput: (value: string) => void;
  errorIntlId: string | null;
  labelIntlId: string;
};

export const NewUserFormInput = ({
  id,
  initialValue,
  onChange,
  errorIntlId,
  verifyInput,
  labelIntlId
}: NewUserFormInputProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const [onBlurTriggered, setOnBlurTriggered] = useState(false);

  const handleValueChange: TextFieldProps['onChange'] = e => {
    const val = e.target.value;
    if (onBlurTriggered) {
      verifyInput(value);
    }
    setValue(val);
  };

  // Trigger onChange only onBlur event
  const handleBlur = () => {
    setOnBlurTriggered(true);
    verifyInput(value);
    onChange(value);
  };

  return (
    <TextField
      fullWidth
      value={value}
      id={id}
      variant="outlined"
      label={<FormattedMessage id={labelIntlId} />}
      onChange={handleValueChange}
      onBlur={handleBlur}
      error={!!errorIntlId}
      helperText={errorIntlId ? <FormattedMessage id={errorIntlId} /> : undefined}
    />
  );
};
