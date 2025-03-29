
// This file now contains only placeholder authentication functions
// Real implementation will be added when authentication is reimplemented

/**
 * Placeholder function that would normally handle Google sign-in
 */
export const handleSignInWithGoogle = async () => {
  console.log('Authentication functionality has been removed');
  return { error: new Error('Authentication functionality has been removed') };
};

/**
 * Placeholder function that would normally handle email sign-in
 */
export const handleSignInWithEmail = async (_email: string, _password: string) => {
  console.log('Authentication functionality has been removed');
  return { error: new Error('Authentication functionality has been removed') };
};

/**
 * Helper function to validate email format
 */
export const isEmailFormat = (input: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

/**
 * Placeholder function that would normally handle username sign-in
 */
export const handleSignInWithUsername = async (_username: string, _password: string) => {
  console.log('Authentication functionality has been removed');
  return { error: new Error('Authentication functionality has been removed') };
};

/**
 * Placeholder function that would normally handle sign-out
 */
export const handleSignOut = async () => {
  console.log('Authentication functionality has been removed');
  return { error: null };
};
