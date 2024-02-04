export interface IPasswordOptions {
  includeLetters: boolean;
  includeNumbers: boolean;
  includeSpecialChars: boolean;
  length: number;
}

export const generateRandomPassword = ({ includeLetters, includeNumbers, includeSpecialChars, length }: IPasswordOptions): string => {
  let charset = "";

  if (includeLetters) {
    charset += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (includeNumbers) {
    charset += "0123456789";
  }

  if (includeSpecialChars) {
    charset += "!@#$%^&*()_-+=<>?";
  }

  if (charset.length === 0) {
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};
