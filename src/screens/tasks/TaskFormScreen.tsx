import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { Task, TaskPriority, TaskStatus } from '../../types/task';
import { generateId } from '../../utils/generateId';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TaskStackParamList } from '../../types/navigation';
import { FilterBar } from '../../components/FilterBar';

type NavigationProp = NativeStackNavigationProp<TaskStackParamList, 'TaskForm'>;
type RoutePropType = RouteProp<TaskStackParamList, 'TaskForm'>;

interface Props {
  navigation: NavigationProp;
  route: RoutePropType;
}

const PRIORITIES = [
  { id: 'baixa', label: 'Baixa' },
  { id: 'media', label: 'Média' },
  { id: 'alta', label: 'Alta' },
];

const CATEGORIES = [
  { id: 'Trabalho', label: 'Trabalho', icon: 'work' },
  { id: 'Estudo', label: 'Estudo', icon: 'school' },
  { id: 'Casa', label: 'Casa', icon: 'home' },
  { id: 'Saúde', label: 'Saúde', icon: 'favorite' },
  { id: 'Outros', label: 'Outros', icon: 'label' },
];

export const TaskFormScreen = ({ navigation, route }: Props) => {
  const { taskId } = route.params;
  const { tasks, addTask, updateTask } = useTasks();
  const { colors } = useTheme();

  const isEditing = !!taskId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        const cat = CATEGORIES.find(c => c.id === task.category) || CATEGORIES[4];
        setCategory(cat);
      }
    }
  }, [taskId]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError('O título é obrigatório.');
      return;
    }

    const now = new Date().toISOString();

    if (isEditing) {
      const existingTask = tasks.find(t => t.id === taskId);
      if (existingTask) {
        const updated: Task = {
          ...existingTask,
          title,
          description,
          priority,
          category: category.id,
          categoryIcon: category.icon,
          updatedAt: now,
        };
        await updateTask(updated);
      }
    } else {
      const newTask: Task = {
        id: generateId(),
        title,
        description,
        status: 'pendente',
        priority,
        category: category.id,
        categoryIcon: category.icon,
        createdAt: now,
        updatedAt: now,
      };
      await addTask(newTask);
    }
    
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <CustomInput
          label="Título *"
          placeholder="Ex: Fazer compras"
          value={title}
          onChangeText={(text) => { setTitle(text); setError(''); }}
          error={error}
        />

        <CustomInput
          label="Descrição"
          placeholder="Detalhes adicionais..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <FilterBar 
          filters={PRIORITIES} 
          activeFilter={priority} 
          onFilterChange={(id) => setPriority(id as TaskPriority)} 
        />

        <FilterBar 
          filters={CATEGORIES.map(c => ({ id: c.id, label: c.label }))} 
          activeFilter={category.id} 
          onFilterChange={(id) => setCategory(CATEGORIES.find(c => c.id === id) || CATEGORIES[4])} 
        />

        <View style={styles.actions}>
          <CustomButton 
            title="Cancelar" 
            variant="outline" 
            onPress={() => navigation.goBack()} 
            style={styles.btn}
          />
          <CustomButton 
            title={isEditing ? "Atualizar" : "Salvar"} 
            onPress={handleSave} 
            style={styles.btn}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 16,
  },
  btn: {
    flex: 1,
  },
});
