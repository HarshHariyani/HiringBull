import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View as RNView } from 'react-native';

import {
  FocusAwareStatusBar,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { useIsFirstTime } from '@/lib';

const FEATURES = [
  {
    icon: 'briefcase-outline',
    title: 'Personalized Jobs',
    description: 'Curated opportunities based on your experience.',
    color: '#3b82f6', // blue-500
  },
  {
    icon: 'people-outline',
    title: 'Referral Network',
    description: 'Connect directly with employees and recruiters.',
    color: '#10b981', // emerald-500
  },
  {
    icon: 'chatbubbles-outline',
    title: 'Community',
    description: 'Anonymous discussions and insights.',
    color: '#8b5cf6', // violet-500
  },
] as const;

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <View className="mb-4 flex-row items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <View
        className="size-12 items-center justify-center rounded-full bg-opacity-10"
        style={{ backgroundColor: `${color}15` }}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-bold text-neutral-900 dark:text-white">
          {title}
        </Text>
        <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {description}
        </Text>
      </View>
    </View>
  );
}

export default function Landing() {
  const router = useRouter();
  const [_, setIsFirstTime] = useIsFirstTime();

  const handleContinue = () => {
    setIsFirstTime(false);
    router.replace('/login');
  };

  return (
    <View className="flex-1 bg-white dark:bg-neutral-950">
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 pt-10">
          {/* Header / Title Section */}
          <View className="mb-10">
            <View className="mb-4 size-16 items-center justify-center rounded-2xl bg-neutral-900 dark:bg-white">
              <Text className="text-3xl font-black text-white dark:text-black">
                H
              </Text>
            </View>
            <Text className="text-4xl font-black text-neutral-900 dark:text-white">
              HiringBull
            </Text>
            <Text className="mt-2 text-lg font-medium text-neutral-500 dark:text-neutral-400">
              Find your dream job at top companies with referrals and community
              support.
            </Text>
          </View>

          {/* Features List */}
          <View className="flex-1">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </View>
        </View>

        {/* Bottom Action Section */}
        <View className="border-t border-neutral-200 bg-white px-6 pb-8 pt-4 dark:border-neutral-800 dark:bg-neutral-950">
          <Pressable
            onPress={handleContinue}
            className="h-14 items-center justify-center rounded-xl bg-neutral-900 dark:bg-white"
          >
            <Text className="text-lg font-bold text-white dark:text-black">
              Get Started
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
