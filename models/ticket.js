'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
   
    static associate(models) {
      this.belongsTo(models.user,{foreignKey : 'userID'});
      this.belongsTo(models.event,{foreignKey : 'eventID'});
      this.belongsTo(models.seat,{foreignKey : 'seatID'});
    }
  }
  ticket.init({
    ticketID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    eventID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    seatID: DataTypes.INTEGER,
    bookedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ticket',
  });
  return ticket;
};