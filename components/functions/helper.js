var userId = null;

export const setUser = (userData) => {
  userId = userData;
};

export const getUser = (userData) => {
  return userId;
};
