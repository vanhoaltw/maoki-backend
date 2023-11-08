const validatePassword = (password) => {
  // Password validation rules
  const minLength = 8;
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;

  if (!password || password.length < minLength) {
    return "Password must be at least 8 characters";
  }

  if (!pattern.test(password)) {
    return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  return null;
};
module.exports = validatePassword;
