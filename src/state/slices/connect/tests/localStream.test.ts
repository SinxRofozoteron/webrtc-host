import { connectReducer, setLocalStream, initialConnectState } from '../connectSlice';
import { type ConnectState } from '../types';

describe('localStream reducers', () => {
  describe('setLocalStream', () => {
    const testMediaStrem = { name: 'testStream' };
    let stateAfterUpdate: ConnectState;

    beforeAll(() => {
      stateAfterUpdate = connectReducer(
        initialConnectState,
        // @ts-expect-error
        setLocalStream(testMediaStrem)
      );
    });

    it('sets localStream state correctly', () => {
      expect(stateAfterUpdate.localStream).toBe(testMediaStrem);
    });
  });
});
