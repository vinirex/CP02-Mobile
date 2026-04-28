import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../types/navigation';
import { TaskListScreen } from '../screens/tasks/TaskListScreen';
import { TaskDetailScreen } from '../screens/tasks/TaskDetailScreen';
import { TaskFormScreen } from '../screens/tasks/TaskFormScreen';
import { useTheme } from '../hooks/useTheme';

const Stack = createNativeStackNavigator<TaskStackParamList>();

export const TaskStackRoutes = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Minhas Tarefas', headerShown: false }} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Detalhes da Tarefa' }} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Tarefa' }} />
    </Stack.Navigator>
  );
};
