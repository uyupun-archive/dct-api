const createModel = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answer: DataTypes.STRING,
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.Question, {
      foreignKey: 'questionId'
    });
  };
  return Answer;
};
export default createModel;