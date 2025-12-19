import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-8">
          <Text className="text-4xl font-black text-neutral-900 dark:text-white">
            Welcome Back
          </Text>
          <Text className="mt-2 text-base font-medium text-neutral-500 dark:text-neutral-400">
            Sign in to continue your search for the perfect job.
          </Text>
        </View>

        <View className="gap-4">
          <ControlledInput
            testID="email-input"
            control={control}
            name="email"
            label="Email"
            placeholder="john@example.com"
          />
          <ControlledInput
            testID="password-input"
            control={control}
            name="password"
            label="Password"
            placeholder="******"
            secureTextEntry={true}
          />
        </View>

        <View className="mt-8">
          <Button
            testID="login-button"
            label="Sign In"
            onPress={handleSubmit(onSubmit)}
            size="lg"
            className="rounded-xl bg-neutral-900 dark:bg-white"
            textClassName="font-bold text-white dark:text-black"
          />
        </View>

        <View className="mt-4 flex-row justify-center">
          <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Don't have an account?{' '}
          </Text>
          <Text className="text-sm font-bold text-neutral-900 dark:text-white">
            Sign Up
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
