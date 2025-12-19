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

type SettingsItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  iconColor?: string;
  isDestructive?: boolean;
  onPress?: () => void;
};

const SETTINGS: SettingsItem[] = [
  {
    label: 'Report issue',
    icon: 'warning-outline',
    iconColor: '#f59e0b', // amber-500
  },
  {
    label: 'Change segment',
    icon: 'layers-outline',
    iconColor: '#3b82f6', // blue-500
  },
  {
    label: 'Update Companies',
    icon: 'business-outline',
    iconColor: '#8b5cf6', // violet-500
  },
  {
    label: 'Logout',
    icon: 'log-out-outline',
    isDestructive: true,
  },
];

function SettingsItemRow({ item }: { item: SettingsItem }) {
  return (
    <Pressable className="mb-4 flex-row items-center justify-between rounded-xl border border-neutral-200 bg-white p-5 shadow-sm active:opacity-70 dark:border-neutral-800 dark:bg-neutral-900">
      <View className="flex-row items-center gap-4">
        <View
          className={`size-10 items-center justify-center rounded-full ${
            item.isDestructive
              ? 'bg-red-50 dark:bg-red-900/20'
              : 'bg-neutral-100 dark:bg-neutral-800'
          }`}
        >
          <Ionicons
            name={item.icon}
            size={20}
            color={item.isDestructive ? '#ef4444' : item.iconColor || '#525252'}
          />
        </View>
        <Text
          className={`text-base font-bold ${
            item.isDestructive
              ? 'text-red-500 dark:text-red-400'
              : 'text-neutral-900 dark:text-white'
          }`}
        >
          {item.label}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={item.isDestructive ? '#ef4444' : '#d4d4d4'}
      />
    </Pressable>
  );
}

export default function Profile() {
  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-neutral-950"
      edges={['top']}
    >
      <FocusAwareStatusBar />
      <View className="flex-1 pt-6">
        <View className="px-5 pb-4 border-b border-neutral-200 shadow-sm bg-white dark:bg-neutral-950 dark:border-neutral-800">
          <Text className="text-3xl font-black text-neutral-900 dark:text-white">
            Profile
          </Text>
          <Text className="mt-2 text-base font-medium leading-6 text-neutral-500">
            Manage your account settings and preferences.
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          {/* User Info Card */}
          <View className="mb-6 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Signed in as
            </Text>
            <Text className="mt-1 text-2xl font-black text-neutral-900 dark:text-white">
              Atanu Nayak
            </Text>
            <View className="mt-4 flex-row items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 self-start dark:bg-neutral-800">
              <Ionicons name="mail-outline" size={16} color="#737373" />
              <Text className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                nayak.primary@gmail.com
              </Text>
            </View>
          </View>

          {/* Referral/Info Card */}
          <View className="mb-8 overflow-hidden rounded-xl bg-neutral-900 p-6 shadow-md dark:bg-neutral-800">
            <View className="mb-4 size-12 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="gift-outline" size={24} color="white" />
            </View>
            <Text className="text-lg font-bold leading-7 text-white">
              Hope you are enjoying our product, share it with your friends and
              get referral bonus of 100.
            </Text>
          </View>

          {/* Settings List */}
          <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-400">
            Settings
          </Text>
          {SETTINGS.map((item, index) => (
            <SettingsItemRow key={index} item={item} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
