import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task, TaskStatus } from '../types/task';
import { useTheme } from '../hooks/useTheme';
import { StatusBadge } from './StatusBadge';
import { MaterialIcons } from '@expo/vector-icons';
import { formatDate } from '../utils/formatDate';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

export const TaskCard = ({ task, onPress }: TaskCardProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {task.title}
        </Text>
        <StatusBadge status={task.status} />
      </View>
      
      <View style={styles.row}>
        <MaterialIcons name={task.categoryIcon as any || "label"} size={16} color={colors.textSecondary} />
        <Text style={[styles.category, { color: colors.textSecondary }]}>{task.category}</Text>
        
        <View style={styles.dot} />
        
        <Text style={[styles.priority, { color: task.priority === 'alta' ? colors.danger : task.priority === 'media' ? colors.warning : colors.success }]}>
          Prioridade {task.priority}
        </Text>
      </View>

      <Text style={[styles.date, { color: colors.textSecondary }]}>
        Atualizado em: {formatDate(task.updatedAt)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    marginLeft: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CCC',
    marginHorizontal: 8,
  },
  priority: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 11,
  },
});
