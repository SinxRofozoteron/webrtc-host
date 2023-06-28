import { useState } from 'react';

import { FormInput, type FormInputProps } from '../core';

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

  const handleValueChange: FormInputProps['onChange'] = e => {
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
    <FormInput
      fullWidth
      value={value}
      id={id}
      labelIntlId={labelIntlId}
      onChange={handleValueChange}
      onBlur={handleBlur}
      error={!!errorIntlId}
      errorIntId={errorIntlId || undefined}
    />
  );
};
