
import { Platform } from '@capacitor/core';

export interface PlatformTranslation {
  android: string | null;
  ios: string | null;
  web: string | null;
}

export async function getPlatformTranslation(key: string, language: string = 'en'): Promise<string | null> {
  try {
    const platform = await Platform.getName();
    
    // Default to web translations
    let translation = null;
    
    if (platform === 'android') {
      // Try to get Android string from strings.xml
      // In a real implementation, this would load from the actual Android resources
      const androidStrings = await import(`./platform/android/strings_${language}.xml`);
      translation = androidStrings[key] || null;
    } else if (platform === 'ios') {
      // Try to get iOS string from Localizable.strings
      // In a real implementation, this would load from the actual iOS resources
      const iosStrings = await import(`./platform/ios/${language}.lproj/Localizable.strings`);
      translation = iosStrings[key] || null;
    }
    
    // Fall back to web translations if platform-specific not found
    if (!translation) {
      // Get from i18next
      const i18next = await import('i18next');
      translation = i18next.default.t(key);
    }
    
    return translation;
  } catch (error) {
    console.error('Error getting platform translation:', error);
    return null;
  }
}

// Helper function to determine if we're running on a mobile platform
export async function isMobilePlatform(): Promise<boolean> {
  try {
    const platform = await Platform.getName();
    return platform === 'android' || platform === 'ios';
  } catch {
    return false;
  }
}

// Helper to get the current device language
export async function getDeviceLanguage(): Promise<string> {
  try {
    // This is a simplified implementation
    // In a real app, you would use Capacitor's Device API
    return navigator.language.split('-')[0] || 'en';
  } catch {
    return 'en';
  }
}
