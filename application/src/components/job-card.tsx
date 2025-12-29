import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';
import { formatRelativeTime } from '@/lib/utils';

export type CompanyType = 'MNC' | 'Global Startup' | 'Indian Startup';

export type Job = {
  id: string;
  company: string;
  segment: string;
  title: string;
  careerpage_link: string;
  company_id: string;
  created_at: string;
  created_by: string | null;
  isSaved?: boolean;
  company_type: CompanyType;
};

type JobCardProps = {
  job: Job;
  onSave: () => void;
};

export function JobCard({ job, onSave }: JobCardProps) {
  const handleOpenLink = useCallback(() => {
    Linking.openURL(job.careerpage_link);
  }, [job.careerpage_link]);

  // Define nice pastel themes for accents only
  const getCardTheme = () => {
    if (job.segment.includes('<1')) {
      return {
        text: 'text-blue-700 dark:text-blue-300',
      };
    }
    if (job.segment.includes('1-3') || job.segment.includes('1-2')) {
      return {
        text: 'text-blue-700 dark:text-blue-300',
      };
    }
    if (
      job.segment.includes('Senior') ||
      job.segment.includes('3-5') ||
      job.segment.includes('2-4')
    ) {
      return {
        text: 'text-blue-700 dark:text-blue-300',
      };
    }
    return {
      text: 'text-blue-700 dark:text-blue-300',
    };
  };

  const getTagStyle = (type: CompanyType) => {
    switch (type) {
      case 'MNC':
        return { bg: 'bg-green-100', text: 'text-black' };
      case 'Global Startup':
        return { bg: 'bg-pink-100', text: 'text-black' };
      case 'Indian Startup':
        return { bg: 'bg-amber-100', text: 'text-black' };
      default:
        return { bg: 'bg-gray-100', text: 'text-black' };
    }
  };

  const theme = getCardTheme();
  const tagStyle = getTagStyle(job.company_type);

  return (
    <View className="mb-4 rounded-xl border border-neutral-200 bg-white p-5 android:shadow-md ios:shadow-sm">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-1">
          <View className="mb-1 flex-row items-center gap-2">
            <Text
              className={`text-sm font-bold uppercase tracking-wider ${theme.text}`}
            >
              {job.company}
            </Text>
            <View className={`rounded-md px-2 py-0.5 ${tagStyle.bg}`}>
              <Text className={`text-[10px] font-medium ${tagStyle.text}`}>
                {job.company_type}
              </Text>
            </View>
          </View>

          <Text className="text-lg font-bold leading-tight text-neutral-900">
            {job.title}
          </Text>
        </View>
      </View>

      <Text className="mb-4 text-sm font-medium text-neutral-600">
        {job.segment}
      </Text>

      <View className="flex-row items-center justify-between border-t border-neutral-200/50 pt-4">
        <Text className="text-[10px] font-bold uppercase tracking-tighter text-neutral-400">
          Posted : {formatRelativeTime(job.created_at)}
        </Text>
        <View className="flex-row items-center gap-7">
          {/* <Pressable hitSlop={12} onPress={onSave}>
            <Ionicons
              name={job.isSaved ? 'star' : 'star-outline'}
              size={20}
              color={job.isSaved ? '#FFD700' : '#000000'}
            />
          </Pressable> */}
          <Pressable hitSlop={12} onPress={handleOpenLink}>
            <Ionicons name="paper-plane-outline" size={20} color="#000000" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
