const createModel = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: DataTypes.STRING,
  }, {});
  Question.associate = function(models) {
    Question.hasMany(models.Answer);
  };
  return Question;
};

export default createModel;