import { useContext, useMemo } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormattedMessage } from 'react-intl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

import { DEVICE_KINDS } from '../../constants';

import { MediaDeviceContext } from './MediaDeviceContext';
import { NoPermissionText } from './NoPermissionText';

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const StyledFromControlLabel = styled(FormControlLabel)`
  justify-content: center;
`;

const LABEL_ID = 'video-devices-radio-btn-group';

type VideoConfigProps = {
  onChange: (deviceId: ConstrainDOMString) => void;
  value: ConstrainDOMString | null;
};

export const VideoConfig = ({ onChange, value }: VideoConfigProps) => {
  const devices = useContext(MediaDeviceContext);

  // If no video devices present set this variable to []
  // If video devices don't have labels it means user did not grant permission.
  // Set it to null
  const videoDevices = useMemo<MediaDeviceInfo[] | null>(() => {
    let devs: MediaDeviceInfo[] | null = [];

    if (devices) {
      for (const device of devices) {
        if (device.kind === DEVICE_KINDS.VIDEO) {
          if (!device.label) {
            devs = null;
            break;
          }
          devs.push(device);
        }
      }
    }

    return devs;
  }, [devices]);

  return (
    <FormControl>
      <StyledFormLabel id={LABEL_ID}>
        <FormattedMessage id="callWindow.videoConfig.label" />
      </StyledFormLabel>
      {videoDevices ? (
        <RadioGroup
          aria-labelledby={LABEL_ID}
          onChange={e => onChange(e.target.value)}
          value={value}>
          {videoDevices.map(device => (
            <StyledFromControlLabel
              value={device.deviceId}
              control={<Radio />}
              label={device.label}
              key={device.deviceId}
            />
          ))}
        </RadioGroup>
      ) : (
        <NoPermissionText />
      )}
    </FormControl>
  );
};
