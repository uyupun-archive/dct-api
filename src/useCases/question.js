import db from '../../models/index.js';
import _ from 'lodash';

export async function getQuestion() {
  const questions = await db.Question.findAll();
  return {
    status: 200,
    body: _.sample(questions),
  };
}