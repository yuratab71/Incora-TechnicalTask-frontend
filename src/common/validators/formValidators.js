export const emailValidator = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const passwordValidator = (password) => {
  if (!password || password.length < 4 || password.length > 16) return false;
  return true;
};

export const nameValidator = (name) => {
  if (!name || name.length > 36) return false;
  return true;
};

export const descValidator = (description) => {
  if (!description || description.length > 2048) return false;
  return true;
};
