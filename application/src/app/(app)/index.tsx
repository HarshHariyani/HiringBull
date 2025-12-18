import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

import {
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { formatRelativeTime } from '@/lib/utils';

type Job = {
  id: string;
  company: string;
  segment: string;
  title: string;
  careerpage_link: string;
  company_id: string;
  created_at: string;
  created_by: string | null;
  isSaved?: boolean;
};

const DUMMY_JOBS: Job[] = [
  {
    id: '1',
    company: 'Google',
    segment: 'Experience: <1 Year',
    title: 'Software Engineer, AI/ML Infrastructure',
    careerpage_link: 'https://google.com',
    company_id: 'google-1',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_by: null,
    isSaved: true,
  },
  {
    id: '2',
    company: 'Meta',
    segment: 'Experience: 1-3 Years',
    title: 'Frontend Engineer, React Native',
    careerpage_link: 'https://meta.com',
    company_id: 'meta-1',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    created_by: 'admin',
    isSaved: false,
  },
  {
    id: '3',
    company: 'Amazon',
    segment: 'Experience: <1 Year',
    title: 'SDE I, AWS Cloud Services',
    careerpage_link: 'https://amazon.jobs',
    company_id: 'amazon-1',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    created_by: null,
    isSaved: true,
  },
  {
    id: '4',
    company: 'Microsoft',
    segment: 'Experience: 2-4 Years',
    title: 'Product Manager, Azure DevOps',
    careerpage_link: 'https://microsoft.com',
    company_id: 'microsoft-1',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: 'admin',
    isSaved: false,
  },
  {
    id: '5',
    company: 'Apple',
    segment: 'Experience: 1-2 Years',
    title: 'iOS Developer, Health Team',
    careerpage_link: 'https://apple.com/careers',
    company_id: 'apple-1',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: null,
    isSaved: false,
  },
  {
    id: '6',
    company: 'Netflix',
    segment: 'Experience: 3-5 Years',
    title: 'Senior Backend Engineer, Streaming',
    careerpage_link: 'https://netflix.com/jobs',
    company_id: 'netflix-1',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: 'admin',
    isSaved: false,
  },
];

type JobCardProps = {
  job: Job;
  onSave: () => void;
};

function JobCard({ job, onSave }: JobCardProps) {
  const handleOpenLink = useCallback(() => {
    Linking.openURL(job.careerpage_link);
  }, [job.careerpage_link]);

  // Define nice pastel themes for accents only
  const getCardTheme = () => {
    if (job.segment.includes('<1')) {
      return {
        border: 'border-secondary-500 bg-secondary-50',
        text: 'text-blue-700 dark:text-blue-300',
      };
    }
    if (job.segment.includes('1-3') || job.segment.includes('1-2')) {
      return {
        border: 'border-emerald-500 bg-emerald-50',
        text: 'text-emerald-700 dark:text-emerald-300',
      };
    }
    if (
      job.segment.includes('Senior') ||
      job.segment.includes('3-5') ||
      job.segment.includes('2-4')
    ) {
      return {
        border: 'border-purple-500 bg-purple-50',
        text: 'text-purple-700 dark:text-purple-300',
      };
    }
    return {
      border: 'border-amber-500 bg-amber-50',
      text: 'text-amber-700 dark:text-amber-300',
    };
  };

  const theme = getCardTheme();

  return (
    <View
      className={`mb-4 rounded-xl border-l-4 ${theme.border} bg-white dark:bg-neutral-900 p-5 shadow-sm`}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text
            className={`text-xs font-bold uppercase tracking-wider ${theme.text} mb-0.5`}
          >
            {job.company}
          </Text>
          <Text className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">
            {job.title}
          </Text>
        </View>
      </View>

      <Text className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 font-medium">
        {job.segment}
      </Text>

      <View className="flex-row items-center justify-between border-t border-neutral-200/50 dark:border-neutral-700 pt-4">
        <Text className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
          Posted : {formatRelativeTime(job.created_at)}
        </Text>
        <View className="flex-row items-center gap-7">
          <Pressable onPress={onSave} hitSlop={12}>
            <Ionicons
              name={job.isSaved ? 'star' : 'star-outline'}
              size={20}
              color="#3b82f6"
            />
          </Pressable>
          <Pressable onPress={handleOpenLink} hitSlop={12}>
            <Ionicons name="paper-plane-outline" size={20} color="#3b82f6" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function Jobs() {
  const handleSaveJob = useCallback((jobId: string) => {
    // TODO: Implement save job functionality
    console.log('Save job:', jobId);
  }, []);

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-neutral-950"
      edges={['top']}
    >
      <FocusAwareStatusBar />
      <View className="flex-1 px-5 pt-6 ">
        <View className="mb-6 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-3xl font-black text-neutral-900 dark:text-white">
              Explore Jobs
            </Text>
            <Text className="text-base font-medium text-neutral-500">
              Jobs are based on the segment you have choosen for you.
            </Text>
          </View>
          <View className="rounded-2xl  p-2 ">
            <Image
              source="https://cdn-icons-png.flaticon.com/512/5537/5537993.png"
              style={{ width: 32, height: 32 }}
              contentFit="contain"
            />
          </View>
        </View>

        <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
          {DUMMY_JOBS.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={() => handleSaveJob(job.id)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
