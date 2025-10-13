export const consoleLog = (message: string): void => {
  process.stdout.write(`${message}\n`);
};

export const consoleError = (message: string): void => {
  process.stderr.write(`${message}\n`);
};

export const consoleWarn = (message: string): void => {
  process.stdout.write(`${message}\n`);
};
