import BoardcastSender from './NativeBoardcastSender';

export function multiply(a: number, b: number): number {
  return BoardcastSender.multiply(a, b);
}

/**
 * Sends a broadcast intent with the given action and extras.
 * @param action The intent action string.
 * @param extras An object of key-value string pairs to add as extras.
 */
export function sendBroadcast(
  action: string,
  extras: { [key: string]: string }
) {
  return BoardcastSender.sendBroadcast(action, extras);
}
