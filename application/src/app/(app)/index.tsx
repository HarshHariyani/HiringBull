import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Pressable, Image, Linking } from 'react-native';

import { type Job, JobCard } from '@/components/job-card';
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
      <View className="flex-1 pt-6">
        <View className="px-5 pb-4 border-b border-neutral-200 shadow-sm bg-white">
          <Text className="text-3xl font-black text-neutral-900">
            Explore Jobs
          </Text>
          <Text className="mb-4 text-base font-medium text-neutral-500">
            We curate jobs based on your experience and the companies you care
            about,
            <Text className="font-semibold text-neutral-700">
              notify you within 10 minutes of an opening{' '}
            </Text>
            so you can apply early. Our goal is simple,{' '}
            <Text className="font-semibold text-neutral-700">
              help you get seen before the crowd{' '}
            </Text> without noise or spam.
          </Text>

          <Pressable
            onPress={() => {
              Linking.openURL('https://github.com/NayakPenguin/HiringBull');
            }}
            className="mb-4 self-start flex-row items-center rounded-full border border-neutral-300"
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
            }}
          >
            <View className="flex-row items-center gap-2">
              <Image
                source={{
                  uri: 'https://icones.pro/wp-content/uploads/2021/06/icone-github-noir.png',
                }}
                style={{ width: 22, height: 22 }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 11, // ~0.8rem
                  color: 'rgb(19, 128, 59)',
                  fontWeight: '100',
                }}
              >
                Contribute to our open-source code on GitHub
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: 'rgb(19, 128, 59)',
                  fontWeight: '100',
                  marginLeft: -6,
                }}
              >
                ↗
              </Text>
            </View>
          </Pressable>

          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            {/* <Pressable
              onPress={handleFilterPress}
              className="mb-2 size-12 items-center justify-center rounded-xl border border-neutral-300 bg-neutral-100"
            >
              <Ionicons name="options-outline" size={24} color="black" />
            </Pressable> */}

            <Pressable className="mb-2 size-12 items-center justify-center rounded-xl border border-neutral-300 bg-neutral-100">
              <Ionicons name="search-outline" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 20,
            paddingTop: 10,
          }}
        >
          <View className="mb-3 flex-row gap-2">
            <Pressable
              className="self-start items-center justify-center rounded-xl border border-neutral-200 bg-white android:shadow-md ios:shadow-sm"
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: 'rgb(19, 128, 59)',
                  fontWeight: '400',
                }}
              >
                42 Companies Selected
              </Text>
            </Pressable>

            <Pressable
              className="self-start items-center justify-center rounded-xl border border-neutral-200 bg-white android:shadow-md ios:shadow-sm"
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: 'rgb(19, 128, 59)',
                  fontWeight: '400',
                }}
              >
                Entry Level (0–1 Year)
              </Text>
            </Pressable>
          </View>

          {filteredJobs.length === 0 ? (
            <View className="mt-20 items-center justify-center">
              <Ionicons name="search-outline" size={48} color="#a3a3a3" />
              <Text className="mt-4 text-center text-lg font-medium text-neutral-500">
                No jobs found
              </Text>
              <Text className="mt-1 text-center text-sm text-neutral-400">
                Try adjusting your search or filters
              </Text>
            </View>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSave={() => handleSaveJob(job.id)}
              />
            ))
          )}
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
