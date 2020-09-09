import jwt from 'jsonwebtoken';
export const generateAccessToken = (
  id: number,
  userName: string,
  mode: 'user' | 'admin' = 'admin',
) => {
  return jwt.sign({ id, userName, mode }, 'asd', {
    expiresIn: '1800s',
    algorithm: 'HS256',
  });
};
