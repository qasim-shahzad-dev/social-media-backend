export function logInfo(message: string) {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
}

export function logError(message: string) {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
}
//i will further enahance this and use winston for proper logging

