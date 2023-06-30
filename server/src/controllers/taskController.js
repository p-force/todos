const taskService = require('../services/taskService');

/* eslint-disable class-methods-use-this */
class TaskController {
  async getAll(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.status(401).json({
          error: 'You are not logged in',
        });
      }
      const data = await taskService.getAll(refreshToken);
      return res.json(data);
    } catch (err) {
      return res.json(err.message);
    }
  }

  async newTask(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { title } = req.body;
      if (!refreshToken) {
        return res.status(401).json({
          error: 'You are not logged in',
        });
      }
      await taskService.newTask(refreshToken, title);
      return res.sendStatus(200);
    } catch (err) {
      return res.json(err.message);
    }
  }

  async deleteTask(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { id } = req.params;
      if (!refreshToken) {
        return res.status(401).json({
          error: 'You are not logged in',
        });
      }
      await taskService.deleteTask(refreshToken, id);
      return res.sendStatus(200);
    } catch (err) {
      return res.json(err.message);
    }
  }

  async updateTask(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { id } = req.params;
      const { title, status } = req.body;
      if (!refreshToken) {
        return res.status(401).json({
          message: 'You are not logged in',
        });
      }
      await taskService.updateTask(refreshToken, id, title, status);
      return res.sendStatus(200);
    } catch (err) {
      return res.json(err.message);
    }
  }
}

module.exports = new TaskController();
