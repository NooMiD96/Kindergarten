export const errorCreater = (message: string) => (
  Promise.reject(new Error(message))
);

export const errorCatcher = (
  componentName: string,
  methodName = "",
  error: Error,
  action: (message: string) => void,
  dispatch: (action: any) => void
) => {
  console.warn(`Catch the error at ${componentName}.\r\nCall ${methodName} method.${
    error.stack
    ? `\r\n${error.stack}`
    : ` ${error.message}`
  }`);
  dispatch(action(error.message));
};
