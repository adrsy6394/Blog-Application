export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const reqError = validateRequired(email, 'Email');
  if (reqError) return reqError;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email address';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  const reqError = validateRequired(password, 'Password');
  if (reqError) return reqError;

  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
};

export const validateUsername = (username: string): string | null => {
  const reqError = validateRequired(username, 'Username');
  if (reqError) return reqError;

  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  return null;
};
