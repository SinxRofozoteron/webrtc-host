import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input, { type InputProps } from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { FormattedMessage } from 'react-intl';

export type FormInputProps = {
  id: string;
  labelIntlId: string;
  errorIntId?: string;
  error: boolean;
  helperTextIntId?: string;
  value?: string;
  onChange: InputProps['onChange'];
  type?: string;
};

export const FormInput = ({
  id,
  labelIntlId,
  helperTextIntId,
  error = false,
  errorIntId,
  value,
  onChange,
  type
}: FormInputProps) => {
  const helperTextId = `${id}-helper-text`;

  return (
    <FormControl error={error}>
      <InputLabel htmlFor={id} variant="outlined">
        <FormattedMessage id={labelIntlId} />
      </InputLabel>
      <Input
        id={id}
        aria-describedby={helperTextIntId || error ? helperTextId : undefined}
        value={value}
        onChange={onChange}
        type={type}
      />
      {(helperTextIntId || error) && (
        <FormHelperText id={helperTextId}>
          <FormattedMessage id={error ? errorIntId : helperTextIntId} />
        </FormHelperText>
      )}
    </FormControl>
  );
};
