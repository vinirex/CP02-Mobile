import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';

export const Header = () => {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      <View>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>Olá,</Text>
        <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
        <Text style={[styles.role, { color: colors.primary }]}>{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</Text>
      </View>
      <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
        <MaterialIcons name="logout" size={24} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48, // Safe area roughly
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  logoutBtn: {
    padding: 8,
  },
});
