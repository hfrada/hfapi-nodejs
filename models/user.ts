'use strict';

import { Model, UUIDV4 } from 'sequelize'

interface UserAttributes {
  id: string
  name: string
  email: string
  password: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string
    name!: string
    email!: string
    password!: string
    static associate(models: any) {
      // define association here
      User.belongsToMany(models.Project, {
        through: 'UserProjectAssigments'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
}