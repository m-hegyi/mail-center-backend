import { generateAccessToken } from '../../util/index';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn((param) => param),
}));

describe('util code tests', () => {
  it('generate an access token', () => {
    const userName = 'Béla';
    const id = 1;
    const token = generateAccessToken(id, userName);

    expect(token).toStrictEqual({ id, userName });
  });
});
