import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

export enum TaskType {
  BUG = 'bug',
  TASK = 'task',
  STORY = 'story'
}

export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum TaskStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  CODE_REVIEW = 'Code Review',
  QA = 'QA (Deployed on Dev)'
}

// Define the TaskAttributes interface
interface TaskAttributes {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  priority: TaskPriority;
  assignedTo: string; // ✅ Changed from assignee to assignedTo
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define TaskCreationAttributes for optional properties during creation
interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Extend Model with attributes and creation attributes
class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public title!: string;
  public description?: string;
  public type!: TaskType;
  public priority!: TaskPriority;
  public assignedTo!: string; // ✅ Changed from assignee to assignedTo
  public status!: TaskStatus;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUIDs
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TaskType)),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM(...Object.values(TaskPriority)),
      allowNull: false,
    },
    assignedTo: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TaskStatus)),
      allowNull: false,
      defaultValue: TaskStatus.TODO,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Task',
    timestamps: true,
  }
);

Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assigneeDetails' });

export default Task;
