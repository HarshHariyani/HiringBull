import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Image, Linking } from 'react-native';

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
              Outreach
            </Text>
            <Text className="mb-4 text-base font-medium text-neutral-500">
              Get{' '}
              <Text className="font-semibold text-neutral-700">
                real visibility with employees from the companies you choose
              </Text>
              . Your request is shared in a{' '}
              <Text className="font-semibold text-neutral-700">
                verified WhatsApp group
              </Text>
              , ensuring it reaches the right people. To stay meaningful and
              spam-free,{' '}
              <Text className="font-semibold text-neutral-700">
                up to 3 reviewed requests are allowed each month
              </Text>
              .
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
                12 Companies
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
                85 Employees & HRs
              </Text>
            </Pressable>
          </View>

          {/* {COMPANIES.map((company) => (
            <DiscussionCard key={company.id} name={company.name} />
          ))} */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
