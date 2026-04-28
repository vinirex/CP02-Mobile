import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TaskStackParamList } from '../../types/navigation';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { CustomButton } from '../../components/CustomButton';
import { StatusBadge } from '../../components/StatusBadge';
import { formatDate } from '../../utils/formatDate';
import { MaterialIcons } from '@expo/vector-icons';
import { TaskStatus } from '../../types/task';

type NavigationProp = NativeStackNavigationProp<TaskStackParamList, 'TaskDetail'>;
type RoutePropType = RouteProp<TaskStackParamList, 'TaskDetail'>;

interface Props {
  navigation: NavigationProp;
  route: RoutePropType;
}

export const TaskDetailScreen = ({ navigation, route }: Props) => {
  const { taskId } = route.params;
  const { tasks, removeTask, updateTask } = useTasks();
  const { colors } = useTheme();

  const task = tasks.find(t => t.id === taskId);

  if (!task) return null;

  const handleDelete = () => {
    Alert.alert(
      "Excluir Tarefa",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: async () => {
            await removeTask(taskId);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const cycleStatus = async () => {
    const statusFlow: Record<TaskStatus, TaskStatus> = {
      'pendente': 'em_andamento',
      'em_andamento': 'concluida',
      'concluida': 'pendente'
    };
    
    const nextStatus = statusFlow[task.status];
    await updateTask({
      ...task,
      status: nextStatus,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
          <TouchableOpacity onPress={cycleStatus} style={{ padding: 4, borderRadius: 8, backgroundColor: colors.background }}>
             <StatusBadge status={task.status} />
             <Text style={{fontSize: 10, textAlign: 'center', marginTop: 4, color: colors.primary}}>Alterar</Text>
          </TouchableOpacity>
        </View>

        {task.description ? (
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {task.description}
          </Text>
        ) : null}

        <View style={styles.infoRow}>
          <MaterialIcons name={task.categoryIcon as any || "label"} size={20} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>{task.category}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="flag" size={20} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Prioridade: {task.priority}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="event" size={20} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Criado em: {formatDate(task.createdAt)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="update" size={20} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Atualizado em: {formatDate(task.updatedAt)}
          </Text>
        </View>

        <View style={styles.actions}>
          <CustomButton 
            title="Editar" 
            onPress={() => navigation.navigate('TaskForm', { taskId: task.id })} 
            style={styles.btn}
          />
          <CustomButton 
            title="Excluir" 
            variant="danger" 
            onPress={handleDelete} 
            style={styles.btn}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  actions: {
    marginTop: 32,
    gap: 12,
  },
  btn: {
    width: '100%',
  },
});
