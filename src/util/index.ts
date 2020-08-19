import jwt from 'jsonwebtoken';
export const generateAccessToken = (id: number, userName: string) => {
  return jwt.sign({ id, userName }, 'asd', {
    expiresIn: '1800s',
    algorithm: 'HS256',
  });
};
