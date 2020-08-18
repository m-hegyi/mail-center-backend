import jwt from 'jsonwebtoken';
export const generateAccessToken = (id: number, username: string) => {
  return jwt.sign({ id, username }, 'asd', {
    expiresIn: '1800s',
    algorithm: 'HS256',
  });
};
