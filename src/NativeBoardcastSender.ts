import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
  /**
   * Sends a broadcast intent with the given action and extras.
   * @param action The intent action string.
   * @param extras An object of key-value string pairs to add as extras.
   */
  sendBroadcast(action: string, extras: { [key: string]: string }): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BoardcastSender');
