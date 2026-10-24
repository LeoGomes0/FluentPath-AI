import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/features/auth/AuthProvider';
import { supabase } from '@/lib/supabase';

import type { CompetencyRow, Profile, StudentState } from './types';

export function useProfile() {
  const { session } = useAuth();
  const userId = session?.user.id;
  return useQuery({
    queryKey: ['profile', userId],
    enabled: !!userId,
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId!)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
  });
}

export function useStudentState() {
  const { session } = useAuth();
  const userId = session?.user.id;
  return useQuery({
    queryKey: ['student_state', userId],
    enabled: !!userId,
    queryFn: async (): Promise<StudentState | null> => {
      const { data, error } = await supabase
        .from('student_state')
        .select('*')
        .eq('user_id', userId!)
        .maybeSingle();
      if (error) throw error;
      return data as StudentState | null;
    },
  });
}

export function useCompetencies() {
  const { session } = useAuth();
  const userId = session?.user.id;
  return useQuery({
    queryKey: ['competencies', userId],
    enabled: !!userId,
    queryFn: async (): Promise<CompetencyRow[]> => {
      const { data, error } = await supabase
        .from('competencies')
        .select('*')
        .eq('user_id', userId!);
      if (error) throw error;
      return (data ?? []) as CompetencyRow[];
    },
  });
}
