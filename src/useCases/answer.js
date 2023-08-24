import _ from 'lodash';

import db from '../../models/index.js';
import sendToken from './sendToken.js';

export async function createAnswer(request) {
  console.log(request);
  if (!validCreateAnswerRequest(request)) {
    return {
      status: 400,
    };
  }

  try {
    // トークンの送金
    const recipientAddress = '0xAd4bb1548aF5205e8B9c749296Eebe36de33c90d';
    const transferAmount = (100 * 10 ** 18).toString();
    await sendToken(recipientAddress, transferAmount);

    // answer の保存
    await db.Answer.create({
      questionId: request.question_id,
      answer: request.answer,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      status: 200,
    }
  } catch (e) {
    console.error('createAnswer failed . error: ', e);
    return {
      status: 500,
    };
  }
}

export async function cunningAnswer(request) {
  console.log(request);
  if (!validCunningAnswerRequest(request)) {
    return {
      status: 400,
    };
  }

  const answers = await db.Answer.findAll({
    where: {
      questionId: request.question_id,
    },
    include: [{
      model: db.Question,
      required: true,
    }],
  });
  const answer = _.sample(answers);
  console.log('answer', answer);

  return {
    status: 200,
    body: answer,
  };
}

function validCreateAnswerRequest(request) {
  if (!request) {
    return false;
  }
  if (!request.question_id || !Number.isInteger(request.question_id)) {
    return false;
  }
  if (!request.step_count || !Number.isInteger(request.step_count)) {
    return false;
  }
  if (!request.wallet_address || request.wallet_address === '') {
    return false;
  }
  if (!request.answer || request.answer === '') {
    return false;
  }

  return true;
}

function validCunningAnswerRequest(request) {
  if (!request) {
    return false;
  }
  if (!request.question_id || !Number.isInteger(request.question_id)) {
    return false;
  }

  return true;
}
