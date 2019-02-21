'use strict';
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define('game', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    player: DataTypes.INTEGER
  }, {});
  game.associate = function(models) {
    // associations can be defined here
  };
  return game;
};