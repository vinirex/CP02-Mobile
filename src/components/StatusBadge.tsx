import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskStatus } from '../types/task';
import { useTheme } from '../hooks/useTheme';

interface StatusBadgeProps {
  status: TaskStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { colors } = useTheme();

  const getStatusConfig = () => {
    switch (status) {
      case 'pendente':
        return { label: 'Pendente', color: colors.danger };
      case 'em_andamento':
        return { label: 'Em Andamento', color: colors.warning };
      case 'concluida':
        return { label: 'Concluída', color: colors.success };
      default:
        return { label: 'Desconhecido', color: colors.textSecondary };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.color + '20' }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
