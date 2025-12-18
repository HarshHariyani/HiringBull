import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';

import {
  FocusAwareStatusBar,
  Input,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  useModal,
  View,
} from '@/components/ui';
import { formatRelativeTime } from '@/lib/utils';

type CompanyType = 'MNC' | 'Global Startup' | 'Indian Startup';

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
  company_type: CompanyType;
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
    company_type: 'MNC',
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
    company_type: 'MNC',
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
    company_type: 'MNC',
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
    company_type: 'Global Startup',
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
    isSaved: true,
    company_type: 'MNC',
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
    company_type: 'Indian Startup',
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
        text: 'text-blue-700 dark:text-blue-300',
      };
    }
    if (job.segment.includes('1-3') || job.segment.includes('1-2')) {
      return {
        text: 'text-emerald-700 dark:text-emerald-300',
      };
    }
    if (
      job.segment.includes('Senior') ||
      job.segment.includes('3-5') ||
      job.segment.includes('2-4')
    ) {
      return {
        text: 'text-purple-700 dark:text-purple-300',
      };
    }
    return {
      text: 'text-amber-700 dark:text-amber-300',
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
    <View className="mb-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
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
          <Pressable hitSlop={12} onPress={onSave}>
            <Ionicons
              name={job.isSaved ? 'star' : 'star-outline'}
              size={20}
              color={job.isSaved ? '#FFD700' : '#000000'}
            />
          </Pressable>
          <Pressable hitSlop={12} onPress={handleOpenLink}>
            <Ionicons name="paper-plane-outline" size={20} color="#000000" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, present, dismiss } = useModal();

  const handleSaveJob = useCallback((jobId: string) => {
    // TODO: Implement save job functionality
    console.log('Save job:', jobId);
  }, []);

  const handleFilterPress = useCallback(() => {
    present();
  }, [present]);

  const filteredJobs = DUMMY_JOBS.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <FocusAwareStatusBar />
      <View className="flex-1 px-5 pt-6">
        <View className="mb-4">
          <Text className="text-3xl font-black text-neutral-900">
            Explore Jobs
          </Text>
          <Text className="mb-4 text-base font-medium text-neutral-500">
            Jobs are based on the segment you have choosen for you.
          </Text>

          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <Pressable
              onPress={handleFilterPress}
              className="mb-2 size-12 items-center justify-center rounded-xl border border-neutral-300 bg-neutral-100"
            >
              <Ionicons name="options-outline" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={() => handleSaveJob(job.id)}
            />
          ))}
        </ScrollView>
      </View>

      <Modal
        ref={ref}
        snapPoints={['50%']}
        title="Filter Jobs"
        onDismiss={dismiss}
      >
        <View className="flex-1 px-4 py-2">
          <Text className="text-base text-neutral-600">
            Filters will appear here.
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
