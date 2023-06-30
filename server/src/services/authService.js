/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const { Users } = require('../db/models');
const mailService = require('./mailService');
const tokenService = require('./tokenService');

class AuthService {
  async login(email, password) {
    try {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid login or password');
      }
      const isPasswordValid = await await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid login or password');
      }
      if (!user.confirmEmail) {
        return { message: 'Please confirm your email' };
      }
      const userFront = {
        id: user.id,
        email: user.email,
        password: user.password,
        url: user.activationLink,
      };
      const tokens = await tokenService.generateTokens({ ...userFront });
      await tokenService.saveToken(user, tokens.refreshToken);
      return { ...tokens, userFront };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async register(email, password) {
    try {
      const activationLink = faker.string.uuid();
      const [newUser, createdUser] = await Users.findOrCreate({
        where: { email },
        defaults: {
          email,
          confirmEmail: false,
          password: await bcrypt.hash(password, 10),
          activationLink,
        },
      });
      if (!createdUser) {
        throw new Error('User already exists');
      }
      const userFront = {
        id: newUser.id,
        email: newUser.email,
      };
      await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`);
      return { ...userFront };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async activate(activationLink) {
    try {
      const user = await Users.findOne({ where: { activationLink } });
      if (!user) {
        throw new Error('User not found');
      }
      if (user.confirmEmail) {
        return { isActive: true };
      }
      const userFront = {
        id: user.id,
        email: user.email,
        password: user.password,
        url: user.activationLink,
      };
      await Users.update({ confirmEmail: true }, { where: { id: user.dataValues.id } });
      const tokens = await tokenService.generateTokens({ ...userFront });
      await tokenService.saveToken(user, tokens.refreshToken);
      return { isActive: false };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async logout(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error('Invalid refresh token');
      }
      await tokenService.removeToken(refreshToken);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error('Invalid refresh token');
      }
      const tokens = await tokenService.generateTokens({ refreshToken });
      return tokens;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async forgotPassword(email) {
    try {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }
      const activationLink = faker.string.uuid();
      await Users.update({ activationLink }, { where: { id: user.dataValues.id } });
      await mailService.sendResetPasswordMail(email, `${process.env.API_URL}/auth/reset-password?token/${activationLink}`);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async resetPassword(token, password) {
    try {
      if (!token) {
        throw new Error('Invalid token');
      }
      if (!password) {
        throw new Error('Invalid password');
      }
      const user = await Users.findOne({ where: { activationLink: token } });
      if (!user) {
        throw new Error('User not found');
      }
      await Users.update({ password, activationLink: null }, { where: { id: user.dataValues.id } });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new AuthService();
