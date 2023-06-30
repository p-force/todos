/* eslint-disable class-methods-use-this */
const { Refresh, Tasks } = require('../db/models');

class TaskService {
  async getAll(refreshToken) {
    try {
      const user = await Refresh.findOne({ where: { token: refreshToken } });
      if (!user) {
        throw new Error('Invalid refresh token');
      }
      const tasks = await Tasks.findAll({
        where: { userId: user.dataValues.id },
        attributes: ['id', 'title', 'status', 'createdAt'],
        order: [['id', 'DESC']],
      });
      if (tasks.length === 0) {
        return [];
      }
      const tasksArray = tasks.map((task) => ({
        title: task.dataValues.title,
        status: task.dataValues.status,
        id: task.dataValues.id,
      }));
      return tasksArray;
    } catch (err) {
      throw new Error(err);
    }
  }

  async newTask(refreshToken, title) {
    try {
      const user = await Refresh.findOne({ where: { token: refreshToken } });
      if (!user) {
        throw new Error('Invalid refresh token');
      }
      await Tasks.create({
        title,
        userId: user.dataValues.id,
        status: false,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteTask(refreshToken, id) {
    try {
      const user = await Refresh.findOne({ where: { token: refreshToken } });
      if (!user) {
        throw new Error('Invalid refresh token');
      }
      const task = await Tasks.findOne({ where: { id } });
      if (!task || task.userId !== user.dataValues.id) {
        throw new Error('Task not found');
      }
      await Tasks.destroy({ where: { id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateTask(refreshToken, id, title, status) {
    try {
      const user = await Refresh.findOne({ where: { token: refreshToken } });
      if (!user) {
        throw new Error('Invalid refresh token');
      }
      const task = await Tasks.findOne({ where: { id } });
      if (!task || task.userId !== user.dataValues.id) {
        throw new Error('Task not found');
      }
      if (status || status === false) {
        await Tasks.update({ status }, { where: { id } });
      }
      if (title) {
        await Tasks.update({ title }, { where: { id } });
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new TaskService();
