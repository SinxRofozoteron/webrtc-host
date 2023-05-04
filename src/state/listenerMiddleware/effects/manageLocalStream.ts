import { type ListenerEffectAPI } from '@reduxjs/toolkit';

import { type RootState, type AppDispatch } from '../../store';
import { getDevices } from '../../../hooks/mediaHooks/utils';
import {
  setVideoDevices,
  setAudioInputDevices,
  setAudioOutputDevices,
  setLocalStream
} from '../../slices';
import { type startLocalStream, stopLocalStream } from '../actions';
import { STOP_LOCAL_STREAM } from '../actions';

/**
 * Starts local stream and sets up listener for stream stop action
 */
export const manageLocalStream = async (
  _: ReturnType<typeof startLocalStream>,
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>
) => {
  // Make sure there are no active localStream
  const activeLocalStream = listenerApi.getState().connect.localStream;
  if (activeLocalStream) {
    listenerApi.dispatch(stopLocalStream());
    // Wait for stream state to clear
    await listenerApi.condition(
      (_, currentState) => currentState.connect.localStream === null
    );
  }

  const { videoDevices, audioInputDevices, audioOutputDevices } = await getDevices();

  listenerApi.dispatch(setVideoDevices(videoDevices));
  listenerApi.dispatch(setAudioInputDevices(audioInputDevices));
  listenerApi.dispatch(setAudioOutputDevices(audioOutputDevices));

  const initialVideoDeviceId = videoDevices.length ? videoDevices[0].deviceId : null;
  const initialAudioInputDeviceId = audioInputDevices.length
    ? audioInputDevices[0].deviceId
    : null;
  const initialConstraints: MediaStreamConstraints = {
    audio: initialAudioInputDeviceId
      ? {
          deviceId: initialAudioInputDeviceId
        }
      : true,
    video: initialVideoDeviceId
      ? {
          deviceId: initialVideoDeviceId
        }
      : true
  };

  const localStream = await navigator.mediaDevices.getUserMedia(initialConstraints);
  listenerApi.dispatch(setLocalStream(localStream));
  // Wait for stop stream action to be dispatched
  await listenerApi.condition(action => action.type === STOP_LOCAL_STREAM);
  // Stop all the tracks
  localStream.getTracks().forEach(track => track.stop());
  // Remove stream object from state
  listenerApi.dispatch(setLocalStream(null));
};
