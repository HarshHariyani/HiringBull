import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

import {
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';

type Company = {
  id: string;
  name: string;
};

const COMPANIES: Company[] = [
  { id: '1', name: 'Google' },
  { id: '2', name: 'Meta' },
  { id: '3', name: 'Amazon' },
  { id: '4', name: 'Microsoft' },
];

function DiscussionCard({ name }: { name: string }) {
  return (
    <Pressable className="mb-4 flex-row items-center justify-between rounded-xl border border-neutral-200 bg-white p-5 android:shadow-md ios:shadow-sm">
      <View>
        <Text className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Company
        </Text>
        <Text className="text-lg font-bold text-neutral-900 dark:text-white">
          {name}
        </Text>
      </View>
      <View className="size-10 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20">
        <Ionicons name="chatbubbles-outline" size={20} color="#10b981" />
      </View>
    </Pressable>
  );
}

export default function Search() {
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
              Discussion
            </Text>
            <Text className="mt-2 text-base font-medium leading-6 text-neutral-500">
              Send up to 3 outreach requests per month to employees and HRs with
              your peers -- strictly no spam
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
          {COMPANIES.map((company) => (
            <DiscussionCard key={company.id} name={company.name} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
