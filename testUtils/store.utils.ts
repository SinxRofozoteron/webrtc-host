import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import { type RootStore } from '../src/state/store';
import { type AtLeastOne } from '../src/types';

/**
 * Wait for expected state
 * @param {RootStore} store redux store
 * @param {string} statePath
 * string representing desired attr path. Example: connect.localStream
 * @param {AtLeastOne<{ expectedValue: any; isSet: boolean }>} config
 * specify either expected value to check against, or if value needs to be set
 * @param {number} timeout timeout to wait for in ms
 * @returns
 */
export const waitForState = async (
  store: RootStore,
  statePath: string,
  config: AtLeastOne<{ expectedValue: any; isSet: boolean }>,
  timeout = 100
): Promise<boolean> => {
  const { expectedValue, isSet } = config;
  return new Promise((resolve, reject) => {
    let currentValue: any;
    const timer = setTimeout(
      () =>
        reject(
          new Error(
            `Actual: ${JSON.stringify(currentValue)}. Expected: ${
              expectedValue
                ? JSON.stringify(expectedValue)
                : isSet
                ? 'value to be truthy'
                : 'value to be falsy'
            }`
          )
        ),
      timeout
    );

    const dispatCallback = () => {
      currentValue = get(store.getState(), statePath);
      if (
        expectedValue
          ? isEqual(currentValue, expectedValue)
          : isSet
          ? currentValue
          : !currentValue
      ) {
        clearTimeout(timer);
        resolve(true);
      }
    };
    store.subscribe(dispatCallback);
  });
};
