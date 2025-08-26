/** biome-ignore-all lint/suspicious/noConsole: <explanation> */

export const log = (message: string) => {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
};

export const errorLog = (message: string) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
};
