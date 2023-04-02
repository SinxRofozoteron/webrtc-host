import { useCallback, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormattedMessage } from 'react-intl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

import { DEVICE_KINDS } from '../../constants';

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const LABEL_ID = 'video-devices-radio-btn-group';

type VideoConfigProps = {
  onChange: (deviceId: ConstrainDOMString) => void;
  value: ConstrainDOMString | null;
};

export const VideoConfig = ({ onChange, value }: VideoConfigProps) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[] | null>(null);

  const updateDevices = useCallback(() => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      setDevices(null);
    }

    navigator.mediaDevices
      .enumerateDevices()
      .then(devs => {
        const videoDevices = devs.filter(dev => dev.kind === DEVICE_KINDS.VIDEO);
        setDevices(videoDevices);
      })
      .catch(err => console.log(err));
  }, []);

  // Get devices on initial render
  useEffect(() => {
    updateDevices();
  }, [updateDevices]);

  // Setup listener to update devices on devicechange event
  useEffect(() => {
    navigator.mediaDevices.addEventListener('devicechange', updateDevices);

    return () =>
      navigator.mediaDevices.removeEventListener('devicechange', updateDevices);
  }, [updateDevices]);

  return (
    <FormControl>
      <StyledFormLabel id={LABEL_ID}>
        <FormattedMessage id="callWindow.videoConfig.label" />
      </StyledFormLabel>
      <RadioGroup
        aria-labelledby={LABEL_ID}
        onChange={e => onChange(e.target.value)}
        value={value}>
        {devices?.map(device => (
          <FormControlLabel
            value={device.deviceId}
            control={<Radio />}
            label={device.label}
            key={device.deviceId}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
