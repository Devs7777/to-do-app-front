import { Injectable } from '@angular/core';
import { remoteConfig, fetchAndActivate, getValue } from '../../firebase-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  constructor() { }

  /**
   * Initializes Remote Config and retrieves the value of 'showTaskComponent'.
   * @returns {Promise<boolean>} - Returns true if the component should be shown, otherwise false.
   */
  async initializeRemoteConfig(): Promise<boolean> {
    try {
      // Fetch and activate the latest configurations
      await fetchAndActivate(remoteConfig);
      
      // Get the value of the 'showTaskComponent' parameter
      const showTask = getValue(remoteConfig, 'showTaskComponent').asBoolean();
      return showTask;
    } catch (error) {
      console.error('Error initializing Remote Config:', error);
      return remoteConfig.defaultConfig?.['showTaskComponent'] as boolean;
    }
  }
}
