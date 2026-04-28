import { NavigatorScreenParams } from '@react-navigation/native';

export type TaskStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string };
  TaskDetail: { taskId: string };
};

export type TabParamList = {
  Home: undefined;
  Tasks: NavigatorScreenParams<TaskStackParamList>;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  App: NavigatorScreenParams<TabParamList>;
};
