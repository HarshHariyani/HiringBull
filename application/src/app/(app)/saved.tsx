import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

type SocialPost = {
  id: string;
  name: string;
  description: string;
  segment: string | null;
  source_link: string | null;
  image_link: string | null;
  created_at: string;
  created_by: string | null;
  source_name: string;
};

const DUMMY_POSTS: SocialPost[] = [
  {
    id: '1',
    name: 'Atanu Nayak (SDE @Samsung)',
    description:
      'Hi everyone my team is hiring for SDE 2 roles, if your profile fits well please mail me at nayak.primary@gmail.com. Looking for strong problem solvers with React Native experience.',
    segment: 'Engineering',
    source_link: 'https://www.linkedin.com/in/kabeer-joshi-7173061aa/',
    image_link: null,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_by: null,
    source_name: 'LinkedIn',
  },
  {
    id: '2',
    name: 'Sarah Chen (Recruiter @Google)',
    description:
      'We are looking for a Senior Product Designer to join our Cloud team in Bangalore. 5+ years experience required. DM me for referral!',
    segment: 'Design',
    source_link: 'https://twitter.com',
    image_link: null,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    created_by: 'admin',
    source_name: 'Twitter',
  },
  {
    id: '3',
    name: 'Alex Rivera (EM @Microsoft)',
    description:
      'Hiring for our Azure DevOps team. Multiple open positions for backend engineers (C#, .NET, Go). Remote options available within India.',
    segment: 'Engineering',
    source_link: 'https://www.linkedin.com/in/kabeer-joshi-7173061aa/',
    image_link: null,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    created_by: null,
    source_name: 'LinkedIn',
  },
];

function SocialPostCard({ post }: { post: SocialPost }) {
  const handleOpenSource = useCallback(() => {
    if (post.source_link) {
      Linking.openURL(post.source_link);
    }
  }, [post.source_link]);

  return (
    <View className="mb-4 rounded-xl border border-neutral-200 bg-white android:shadow-md ios:shadow-sm">
      <View className="relative overflow-hidden p-5">
        {/* Decorative Quote Icon */}
        <View className="absolute -right-4 -top-4 opacity-5">
          <MaterialCommunityIcons
            name="format-quote-close"
            size={80}
            color="black"
          />
        </View>

        <View className="mb-3 flex-row items-center gap-3">
          <View className="size-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
            <Text className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
              {post.name.charAt(0)}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-neutral-900 dark:text-white">
              {post.name}
            </Text>
            <Text className="text-xs font-medium text-neutral-400">
              {formatRelativeTime(post.created_at)}
            </Text>
          </View>
        </View>

        <Text className="mb-4 text-base leading-7 text-neutral-600 dark:text-neutral-300">
          {post.description}
        </Text>

        {post.source_link && (
          <Pressable
            onPress={handleOpenSource}
            className="flex-row items-center self-start gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 active:opacity-70 dark:border-blue-900/30 dark:bg-blue-900/20"
          >
            <Ionicons name="link" size={14} color="#3b82f6" />
            <Text className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Source
            </Text>
            <Text className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {post.source_name}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default function SocialPosts() {
  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-neutral-950"
      edges={['top']}
    >
      <FocusAwareStatusBar />
      <View className="flex-1 pt-6">
        <View className="flex-row items-center justify-between px-5 pb-4 border-b border-neutral-200 shadow-sm bg-white dark:bg-neutral-950 dark:border-neutral-800">
          <View className="mr-4 flex-1">
            <Text className="text-3xl font-black text-neutral-900 dark:text-white">
              Social posts
            </Text>
            <Text className="mt-2 text-base font-medium leading-6 text-neutral-500">
              Discover referral opportunities posted directly by employees or
              curated from professional networks like LinkedIn and Twitter.
            </Text>
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
          {DUMMY_POSTS.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
