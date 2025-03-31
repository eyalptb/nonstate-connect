
// Using device detection instead of Capacitor Platform API
import i18next from 'i18next';

export interface PlatformTranslation {
  android: string | null;
  ios: string | null;
  web: string | null;
}

export async function getPlatformTranslation(key: string, language: string = 'en'): Promise<string | null> {
  try {
    // Use simple platform detection instead of Capacitor
    const platform = detectPlatform();
    
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
      translation = i18next.t(key);
    }
    
    return translation;
  } catch (error) {
    console.error('Error getting platform translation:', error);
    return null;
  }
}

// Simple platform detection function that doesn't rely on Capacitor
function detectPlatform(): 'android' | 'ios' | 'web' {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  
  // Check for iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'ios';
  }
  
  // Check for Android
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  
  // Default to web
  return 'web';
}

// Helper function to determine if we're running on a mobile platform
export async function isMobilePlatform(): Promise<boolean> {
  const platform = detectPlatform();
  return platform === 'android' || platform === 'ios';
}

// Helper to get the current device language
export async function getDeviceLanguage(): Promise<string> {
  try {
    // Use browser's navigator language
    return navigator.language.split('-')[0] || 'en';
  } catch {
    return 'en';
  }
}
