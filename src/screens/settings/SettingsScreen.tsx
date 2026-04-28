import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Header } from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

export const SettingsScreen = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const { user } = useAuth();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Configurações</Text>
        
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Perfil</Text>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Nome:</Text>
            <Text style={[styles.value, { color: colors.textSecondary }]}>{user?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Usuário:</Text>
            <Text style={[styles.value, { color: colors.textSecondary }]}>{user?.username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Nível de Acesso:</Text>
            <Text style={[styles.value, { color: colors.primary, fontWeight: 'bold' }]}>
              {user?.role === 'admin' ? 'Administrador' : 'Usuário Comum'}
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Preferências</Text>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Modo Escuro</Text>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={theme === 'dark' ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
  },
});
