const { sequelize } = require("../index");
const { Datatypes } = require("sequelize");

const book = sequelize.define(
  "book",
  {
    title: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: { max: 50 },
    },
    author: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: { max: 150 },
    },
    ISBN: {
      type: Datatypes.BIGINT,
      allowNull: false,
    },
    quantity: {
      type: Datatypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);
