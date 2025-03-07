import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory', { logging: false });

class Laborer extends Model {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public hireDate!: Date;
  public picture!: string;
  public role!: 'user' | 'admin' | 'supervisor';
}

Laborer.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  hireDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  
  picture: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'supervisor'),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Laborer'
});

export default sequelize;
export { Laborer };