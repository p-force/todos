/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const { Refresh } = require('../db/models');

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  async saveToken(newUser, refreshToken) {
    const data = newUser.dataValues.id;
    const tokenData = await Refresh.findOne({ where: { userId: data } });
    if (tokenData) {
      const token = await Refresh.update({ token: refreshToken }, { where: { userId: data } });
      return token;
    }
    const token = await Refresh.create({ userId: data, token: refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const token = await Refresh.findOne({ where: { token: refreshToken } });
    if (token) {
      await Refresh.destroy({ where: { token: refreshToken } });
    }
  }

  async findToken(refreshToken) {
    const token = await Refresh.findOne({ where: { token: refreshToken } });
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      return userData;
    } catch (err) {
      return null;
    }
  }
}

module.exports = new TokenService();
