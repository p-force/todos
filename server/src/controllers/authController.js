/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

const path = require('path');
const authService = require('../services/authService');

const alreadyActive = path.resolve('../server/public/viewError.html');
const activated = path.resolve('../server/public/view.html');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login(email, password);
      return res.status(200).json({ ...userData });
    } catch (err) {
      return res.json({ message: err.message });
    }
  }

  async register(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await authService.register(email, password);
      return res.status(200).json({ ...userData });
    } catch (err) {
      return res.json({ message: err.message });
    }
  }

  async activate(req, res) {
    try {
      const { link } = req.params;
      const resp = await authService.activate(link);
      if (resp.isActive) { res.sendFile(alreadyActive); } else { res.sendFile(activated); }
    } catch (err) {
      return res.json({ message: err.message });
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');
      return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      return res.json({ message: err.message });
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const resp = await authService.refresh(refreshToken);
      if (resp.accessToken) { res.cookie('accessToken', resp.accessToken); }
      if (resp.refreshToken) { res.cookie('refreshToken', resp.refreshToken); }
      return res.status(200).json({ accessToken: resp.accessToken });
    } catch (err) {
      return res.json({ message: err.message });
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      return res.status(200);
    } catch (err) {
      return res.json({ message: err.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { password } = req.body;
      const { token } = req.params;
      await authService.resetPassword(password, token);
      return res.status(200);
    } catch (err) {
      return res.json({ message: err.message });
    }
  }
}

module.exports = new AuthController();
