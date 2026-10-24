import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/theme';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
};

export function Screen({ children, scroll = true }: Props) {
  const insets = useSafeAreaInsets();
  const padding = { paddingBottom: insets.bottom + theme.spacing(3) };

  if (scroll) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, padding]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.container, styles.content, padding]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: theme.spacing(3),
    gap: theme.spacing(2),
  },
});
