import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

import {
  Checkbox,
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { completeOnboarding } from '@/lib';

const EXPERIENCE_LEVELS = [
  {
    id: 'junior',
    label: 'Junior',
    description: '0-2 years of experience',
    icon: '🌱',
  },
  {
    id: 'mid',
    label: 'Mid-Level',
    description: '2-5 years of experience',
    icon: '🚀',
  },
  {
    id: 'senior',
    label: 'Senior',
    description: '5-8 years of experience',
    icon: '⭐',
  },
  {
    id: 'lead',
    label: 'Lead / Principal',
    description: '8+ years of experience',
    icon: '👑',
  },
] as const;

const COMPANIES = [
  { id: 'google', name: 'Google', emoji: '🔍', type: 'mnc' },
  { id: 'apple', name: 'Apple', emoji: '🍎', type: 'mnc' },
  { id: 'meta', name: 'Meta', emoji: '👤', type: 'mnc' },
  { id: 'amazon', name: 'Amazon', emoji: '📦', type: 'mnc' },
  { id: 'microsoft', name: 'Microsoft', emoji: '💻', type: 'mnc' },
  { id: 'netflix', name: 'Netflix', emoji: '🎬', type: 'mnc' },
  { id: 'spotify', name: 'Spotify', emoji: '🎵', type: 'global-startup' },
  { id: 'stripe', name: 'Stripe', emoji: '💳', type: 'global-startup' },
  { id: 'airbnb', name: 'Airbnb', emoji: '🏠', type: 'global-startup' },
  { id: 'uber', name: 'Uber', emoji: '🚗', type: 'global-startup' },
  { id: 'zomato', name: 'Zomato', emoji: '🍕', type: 'indian-startup' },
  { id: 'swiggy', name: 'Swiggy', emoji: '🍱', type: 'indian-startup' },
  { id: 'flipkart', name: 'Flipkart', emoji: '🛍️', type: 'indian-startup' },
  { id: 'razorpay', name: 'Razorpay', emoji: '💸', type: 'indian-startup' },
] as const;

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Global MNC', value: 'mnc' },
  { label: 'Global Startups', value: 'global-startup' },
  { label: 'Indian Startups', value: 'indian-startup' },
] as const;

type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]['id'];
type CompanyId = (typeof COMPANIES)[number]['id'];

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View className="mb-8 w-full flex-row items-center px-2">
      <View
        className={`size-8 items-center justify-center rounded-full ${
          currentStep >= 1
            ? 'bg-black dark:bg-white'
            : 'bg-neutral-200 dark:bg-neutral-700'
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            currentStep >= 1 ? 'text-white dark:text-black' : 'text-neutral-500'
          }`}
        >
          1
        </Text>
      </View>

      <View className="mx-3 h-1 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
        <View
          className="h-full rounded-full bg-black dark:bg-white"
          style={{ width: `${progress}%` }}
        />
      </View>

      <View
        className={`size-8 items-center justify-center rounded-full ${
          currentStep >= 2
            ? 'bg-black dark:bg-white'
            : 'bg-neutral-200 dark:bg-neutral-700'
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            currentStep >= 2 ? 'text-white dark:text-black' : 'text-neutral-500'
          }`}
        >
          2
        </Text>
      </View>
    </View>
  );
}

type OptionCardProps = {
  selected: boolean;
  onPress: () => void;
  children: React.ReactNode;
};

function OptionCard({ selected, onPress, children }: OptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`mb-3 flex-row items-center rounded-xl border bg-white p-5 ${
        selected
          ? 'border-2 border-black shadow-lg'
          : 'border-neutral-200 shadow-md dark:border-neutral-700'
      }`}
    >
      <View className="flex-1">{children}</View>
      <Ionicons
        name={selected ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={24}
        color={selected ? '#000000' : '#d1d5db'}
      />
    </Pressable>
  );
}

type Step1Props = {
  selectedLevel: ExperienceLevel | null;
  onSelect: (level: ExperienceLevel) => void;
};

function Step1({ selectedLevel, onSelect }: Step1Props) {
  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(300)}
      className="flex-1"
    >
      <View className="px-6">
        <Text className="mb-2 text-3xl font-bold">
          What&apos;s your experience level?
        </Text>
        <Text className="mb-6 text-base text-neutral-500">
          This helps us show you the most relevant jobs
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 24,
        }}
      >
        {EXPERIENCE_LEVELS.map((level) => {
          const isSelected = selectedLevel === level.id;
          return (
            <OptionCard
              key={level.id}
              selected={isSelected}
              onPress={() => onSelect(level.id)}
            >
              <View className="flex-row items-center">
                <Text className="mr-3 text-2xl">{level.icon}</Text>
                <View className="flex-1">
                  <Text className="text-lg font-semibold">{level.label}</Text>
                  <Text className="text-sm text-neutral-500">
                    {level.description}
                  </Text>
                </View>
              </View>
            </OptionCard>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

type Step2Props = {
  selectedCompanies: CompanyId[];
  onToggle: (companyId: CompanyId) => void;
  onBack: () => void;
  onSelectAll: (companyIds: CompanyId[], select: boolean) => void;
};

function Step2({
  selectedCompanies,
  onToggle,
  onBack,
  onSelectAll,
}: Step2Props) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]['value']>('all');
  const { colorScheme } = useColorScheme();

  const filteredCompanies = useMemo(() => {
    let result = COMPANIES as unknown as typeof COMPANIES;
    if (activeFilter !== 'all') {
      result = result.filter((c) => c.type === activeFilter) as any;
    }
    if (!search.trim()) return result;
    return result.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, activeFilter]);

  const allFilteredSelected = useMemo(() => {
    if (filteredCompanies.length === 0) return false;
    return filteredCompanies.every((c) => selectedCompanies.includes(c.id));
  }, [filteredCompanies, selectedCompanies]);

  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(300)}
      className="flex-1"
    >
      <View className="px-6">
        <Pressable
          onPress={onBack}
          className="mb-4 flex-row items-center self-start"
        >
          <Ionicons
            name="arrow-back"
            size={16}
            color={colorScheme === 'dark' ? '#a3a3a3' : '#737373'}
          />
          <Text className="ml-1 text-sm font-medium text-neutral-500 underline dark:text-neutral-400">
            Back
          </Text>
        </Pressable>
        <Text className="mb-2 text-3xl font-bold">
          Companies you&apos;d love
        </Text>
        <Text className="mb-4 text-base text-neutral-500">
          Select companies you&apos;re interested in working for
        </Text>

        <View className="mb-4 flex-row items-center rounded-xl border border-neutral-200 bg-neutral-100 px-4 dark:border-neutral-700 dark:bg-neutral-800">
          <Text className="mr-2">🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search companies..."
            placeholderTextColor="#9ca3af"
            className="flex-1 py-3 text-base text-black dark:text-white"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 flex-row"
        >
          {FILTERS.map((filter) => (
            <Pressable
              key={filter.value}
              onPress={() => setActiveFilter(filter.value)}
              className={`mr-2 rounded-full border px-4 py-2 ${
                activeFilter === filter.value
                  ? 'border-black bg-black dark:border-white dark:bg-white'
                  : 'border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  activeFilter === filter.value
                    ? 'text-white dark:text-black'
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}
              >
                {filter.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-sm font-medium text-neutral-500">
            {filteredCompanies.length} companies found
          </Text>
          <Pressable
            onPress={() => {
              const ids = filteredCompanies.map((c) => c.id);
              onSelectAll(ids, !allFilteredSelected);
            }}
            className="flex-row items-center"
          >
            <Text className="mr-2 text-sm font-medium dark:text-neutral-300">
              Select All
            </Text>
            <Checkbox
              checked={allFilteredSelected}
              onChange={() => {}}
              accessibilityLabel="Select all visible companies"
            />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 24,
        }}
      >
        {filteredCompanies.map((company) => {
          const isSelected = selectedCompanies.includes(company.id);
          return (
            <OptionCard
              key={company.id}
              selected={isSelected}
              onPress={() => onToggle(company.id)}
            >
              <View className="flex-row items-center">
                <Text className="mr-3 text-2xl">{company.emoji}</Text>
                <Text className="text-lg font-semibold">{company.name}</Text>
              </View>
            </OptionCard>
          );
        })}
        {filteredCompanies.length === 0 && (
          <Text className="py-8 text-center text-neutral-500">
            No companies found
          </Text>
        )}
      </ScrollView>
    </Animated.View>
  );
}

export default function Onboarding() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel | null>(null);
  const [selectedCompanies, setSelectedCompanies] = useState<CompanyId[]>([]);

  const handleToggleCompany = useCallback((companyId: CompanyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  }, []);

  const handleSelectAll = useCallback(
    (companyIds: CompanyId[], select: boolean) => {
      setSelectedCompanies((prev) => {
        if (select) {
          const toAdd = companyIds.filter((id) => !prev.includes(id));
          return [...prev, ...toAdd];
        } else {
          return prev.filter((id) => !companyIds.includes(id));
        }
      });
    },
    []
  );

  const handleContinue = useCallback(() => {
    setStep(2);
  }, []);

  const handleBack = useCallback(() => {
    setStep(1);
  }, []);

  const handleFinish = useCallback(() => {
    // TODO: Save experienceLevel and selectedCompanies to storage/API
    completeOnboarding();
    router.replace('/');
  }, [router]);

  const canContinue = step === 1 ? experienceLevel !== null : true;

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <View className="flex-1 pt-4">
          <View className="px-6">
            <StepIndicator currentStep={step} totalSteps={2} />
          </View>

          {step === 1 ? (
            <Step1
              selectedLevel={experienceLevel}
              onSelect={setExperienceLevel}
            />
          ) : (
            <Step2
              selectedCompanies={selectedCompanies}
              onToggle={handleToggleCompany}
              onBack={handleBack}
              onSelectAll={handleSelectAll}
            />
          )}
        </View>
      </SafeAreaView>

      <View className="border-t border-neutral-200 bg-white px-6 pb-8 pt-4 dark:border-neutral-700 dark:bg-neutral-900">
        <Pressable
          onPress={step === 1 ? handleContinue : handleFinish}
          disabled={!canContinue}
          className={`h-14 items-center justify-center rounded-xl ${
            canContinue ? 'bg-black dark:bg-white' : 'bg-neutral-300'
          }`}
        >
          <Text
            className={`text-lg font-semibold ${
              canContinue ? 'text-white dark:text-black' : 'text-neutral-500'
            }`}
          >
            {step === 1 ? 'Continue' : 'Finish'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
