
// This file contains placeholder authentication functions
// Real implementation will be added when authentication is reimplemented

export const handleSignInWithGoogle = async () => {
  console.log('Authentication has been removed');
  return { error: new Error('Authentication has been removed') };
};

export const handleSignInWithEmail = async (_email: string, _password: string) => {
  console.log('Authentication has been removed');
  return { error: new Error('Authentication has been removed') };
};

export const isEmailFormat = (input: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

export const handleSignInWithUsername = async (_username: string, _password: string) => {
  console.log('Authentication has been removed');
  return { error: new Error('Authentication has been removed') };
};

export const handleSignOut = async () => {
  console.log('Authentication has been removed');
  return { error: null };
};
