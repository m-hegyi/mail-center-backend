import { generateAccessToken } from '../../util/index';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn((param) => param),
}));

describe('util code tests', () => {
  it('generate an access token', () => {
    const username = 'Béla';
    const id = 1;
    const token = generateAccessToken(id, username);

    expect(token).toStrictEqual({ id, username });
  });
});
