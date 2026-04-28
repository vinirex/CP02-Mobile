import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Linking, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { fetchDailyMeme, MemeResponse } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export const HomeScreen = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [meme, setMeme] = useState<MemeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeme();
  }, []);

  const loadMeme = async () => {
    setLoading(true);
    const data = await fetchDailyMeme();
    setMeme(data);
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <View style={styles.content}>
        <Text style={[styles.welcome, { color: colors.text }]}>
          Bem-vindo ao TaskFlow, {user?.name.split(' ')[0]}!
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Aqui está um meme para alegrar seu dia:
        </Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Carregando meme...</Text>
            </View>
          ) : meme ? (
            <TouchableOpacity onPress={() => Linking.openURL(meme.url)} activeOpacity={0.8} style={{ width: '100%', alignItems: 'center' }}>
              <Text style={[styles.memeTitle, { color: colors.text }]} numberOfLines={2}>{meme.title}</Text>
              {meme.url.includes('.jpg') || meme.url.includes('.png') || meme.url.includes('.gif') ? (
                <Image source={{ uri: meme.url }} style={styles.memeImage} resizeMode="contain" />
              ) : (
                <View style={styles.linkContainer}>
                  <Text style={[styles.linkText, { color: colors.primary }]}>Ver Meme no Reddit</Text>
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: colors.danger }]}>Falha ao carregar o meme :(</Text>
            </View>
          )}
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
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
  },
  memeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  memeImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
  linkContainer: {
    padding: 16,
    backgroundColor: '#00000010',
    borderRadius: 8,
    marginTop: 16,
  },
  linkText: {
    fontWeight: 'bold',
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorText: {
    fontWeight: 'bold',
  },
});
