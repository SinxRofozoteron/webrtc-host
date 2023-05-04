export const createListenerMiddlewareActionType = <T extends string>(actionName: T) =>
  `listenerMiddleware/${actionName}` as const;
