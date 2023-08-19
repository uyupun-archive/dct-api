'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import configJson from '../config/config.json' assert { type: 'json' }
import Question from './question.js';
import Answer from './answer.js';
const config = configJson[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
  Question: Question(sequelize, Sequelize.DataTypes),
  Answer: Answer(sequelize, Sequelize.DataTypes),
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db)
  .forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

export default db;