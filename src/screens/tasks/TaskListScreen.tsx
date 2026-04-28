import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { TaskCard } from '../../components/TaskCard';
import { FilterBar } from '../../components/FilterBar';
import { EmptyState } from '../../components/EmptyState';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../../components/Header';

type NavigationProp = NativeStackNavigationProp<TaskStackParamList, 'TaskList'>;

interface Props {
  navigation: NavigationProp;
}

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'pendente', label: 'Pendentes' },
  { id: 'em_andamento', label: 'Em Andamento' },
  { id: 'concluida', label: 'Concluídas' },
];

export const TaskListScreen = ({ navigation }: Props) => {
  const { tasks } = useTasks();
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    return task.status === activeFilter;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <View style={styles.content}>
        <FilterBar 
          filters={FILTERS} 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />
        
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard 
              task={item} 
              onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })} 
            />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <EmptyState 
              title="Nenhuma tarefa encontrada" 
              message={activeFilter === 'all' ? "Você ainda não cadastrou nenhuma tarefa. Toque no botão + para começar." : `Nenhuma tarefa com o status selecionado.`} 
            />
          }
        />
        
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('TaskForm', {})}
        >
          <MaterialIcons name="add" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
