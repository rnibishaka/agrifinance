import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { EyeIcon, EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1500); // Simulate network request
    };

    return (
        <View className="flex-1 justify-center items-center bg-gray-50 px-6">
            {/* Logo */}
            <View className="mb-6">


                <Text className="text-3xl font-bold text-green-700 text-center">AgriFinance</Text>
                <Text className="text-gray-500 text-center mt-1">Agricultural Loans & Project Management</Text>
            </View>

            {/* Email Input */}
            <View className="w-full mb-4">
                <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-1 bg-white">
                    <EnvelopeIcon size={20} color="#9CA3AF" className="mr-2" />
                    <TextInput
                        className="flex-1 text-base"
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>
            </View>

            {/* Password Input */}
            <View className="w-full mb-4">
                <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-1 bg-white">
                    <LockClosedIcon size={20} color="#9CA3AF" className="mr-2" />
                    <TextInput
                        className="flex-1 text-base"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        placeholderTextColor="#9CA3AF"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <EyeIcon size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
                className={`w-full bg-green-700 rounded-2xl py-3 mb-3 ${loading ? 'opacity-60' : ''}`}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center font-semibold text-base">Login</Text>
                )}
            </TouchableOpacity>




            {/* Forgot Password */}
            <TouchableOpacity className="mb-6" onPress={() => { }}>
                <Text className="text-green-700 text-center text-sm">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <Text className="text-gray-500 text-center text-sm">
                Don't have an account?{' '}
                <Text className="text-green-700 font-semibold">Sign Up</Text>
            </Text>
            <TouchableOpacity className="mt-20" onPress={() => router.push('/admin-login')}>
                <Text className="text-blue-700 text-center text-sm font-semibold">Login as Admin</Text>
            </TouchableOpacity>
        </View>
    );
}
