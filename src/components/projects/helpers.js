export const userIsStaff = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  const base64Payload = atob(token.split('.')[1]);
  const payload = JSON.parse(base64Payload);
  return payload.is_staff;
};
