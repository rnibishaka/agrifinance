import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LoanHistory from './LoanHistory';
import LoanPayments from './LoanPayments';
import LoanAnalytics from './LoanAnalytics';
import { useRouter } from 'expo-router';

const loanProducts = [
    {
        title: 'Farming Equipment Loan',
        description: 'Finance essential farming equipment with competitive rates',
        amount: 'Up to $10,000',
        interest: '5.2% Interest',
        term: '1-3 Year Terms',
    },
    {
        title: 'Seasonal Crop Financing',
        description: 'Short-term financing for seasonal planting needs',
        amount: 'Up to $5,000',
        interest: '4.8% Interest',
        term: '6-12 Month Terms',
    },
];
const router = useRouter();
export default function LoanServicesScreen() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header Bar */}
            <View className="bg-green-700 pt-10 pb-3 px-4 flex-row items-center justify-between rounded-b-2xl shadow">
                <Text className="text-lg font-semibold text-white">Loan Services</Text>
                <View className="flex-row space-x-4">
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={22} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tabs */}
            <View className="flex-row bg-white rounded-t-2xl shadow mx-0 mt-0 overflow-hidden">
                <TouchableOpacity
                    className="flex-1 items-center py-3 flex-col"
                    style={activeTab === 'overview' ? { borderBottomWidth: 2, borderBottomColor: '#15803d' } : {}}
                    onPress={() => setActiveTab('overview')}
                >
                    <Ionicons name="home" size={28} color={activeTab === 'overview' ? '#15803d' : '#6b7280'} />
                    <Text className={activeTab === 'overview' ? 'text-green-700 font-semibold text-sm mt-1' : 'text-gray-500 text-sm mt-1'}>Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 items-center py-3 flex-col"
                    style={activeTab === 'payments' ? { borderBottomWidth: 2, borderBottomColor: '#15803d' } : {}}
                    onPress={() => setActiveTab('payments')}
                >
                    <MaterialIcons name="event-note" size={28} color={activeTab === 'payments' ? '#15803d' : '#6b7280'} />
                    <Text className={activeTab === 'payments' ? 'text-green-700 font-semibold text-sm mt-1' : 'text-gray-500 text-sm mt-1'}>Payments</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 items-center py-3 flex-col"
                    style={activeTab === 'history' ? { borderBottomWidth: 2, borderBottomColor: '#15803d' } : {}}
                    onPress={() => setActiveTab('history')}
                >
                    <MaterialIcons name="history" size={28} color={activeTab === 'history' ? '#15803d' : '#6b7280'} />
                    <Text className={activeTab === 'history' ? 'text-green-700 font-semibold text-sm mt-1' : 'text-gray-500 text-sm mt-1'}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 items-center py-3 flex-col"
                    style={activeTab === 'analytics' ? { borderBottomWidth: 2, borderBottomColor: '#15803d' } : {}}
                    onPress={() => setActiveTab('analytics')}
                >
                    <MaterialIcons name="show-chart" size={28} color={activeTab === 'analytics' ? '#15803d' : '#6b7280'} />
                    <Text className={activeTab === 'analytics' ? 'text-green-700 font-semibold text-sm mt-1' : 'text-gray-500 text-sm mt-1'}>Analytics</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'overview' && (
                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={true}>
                    {/* Welcome and Loan Status */}
                    <View className="px-3 pt-5">
                        <Text className="text-xl font-bold mb-1">Welcome, Farmer</Text>
                        <Text className="text-gray-500 mb-3">Access agricultural financing with ease</Text>
                        <View className="bg-white rounded-xl shadow p-4 mb-4 border border-gray-100">
                            <View className="flex-row items-center justify-between mb-2">
                                <Text className="font-semibold text-base">Loan Status</Text>
                                <Text className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</Text>
                            </View>
                            <View className="flex-row justify-between mb-2">
                                <View>
                                    <Text className="text-xs text-gray-400">Current Balance</Text>
                                    <Text className="font-bold text-lg">$5,000</Text>
                                </View>
                                <View>
                                    <Text className="text-xs text-gray-400">Next Payment</Text>
                                    <Text className="font-bold text-lg">$250</Text>
                                </View>
                                <View>
                                    <Text className="text-xs text-gray-400">Due Date</Text>
                                    <Text className="font-bold text-lg">Aug 15</Text>
                                </View>
                            </View>
                            <View className="mb-2">
                                <Text className="text-xs text-gray-400 mb-1">Repayment Progress</Text>
                                <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                                    <View className="h-2 bg-green-600 rounded-full" style={{ width: '25%' }} />
                                </View>
                                <Text className="text-xs text-green-700 font-semibold">25%</Text>
                            </View>
                            <View className="flex-row space-x-2 mt-2">
                                <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-gray-100 rounded-lg py-2">
                                    <MaterialIcons name="receipt-long" size={18} color="#15803d" style={{ marginRight: 6 }} />
                                    <Text className="text-green-700 font-semibold">Payment S...</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-green-700 rounded-lg py-2">
                                    <MaterialIcons name="payments" size={18} color="white" style={{ marginRight: 6 }} />
                                    <Text className="text-white font-semibold">Make Pay...</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Apply for a New Loan */}
                    <View className="bg-white rounded-xl shadow p-4 mx-3 mb-4 border border-gray-100">
                        <Text className="font-bold text-base mb-1">Apply for a New Loan</Text>
                        <Text className="text-gray-500 mb-3 text-sm">Quick and transparent agricultural loan application process</Text>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }}
                            className="w-full h-32 rounded-lg mb-3"
                            resizeMode="cover"
                        />
                        <View className="flex-row justify-center">

                            <TouchableOpacity className="flex-row items-center justify-center bg-green-700 rounded-full px-6 py-2" style={{ minWidth: 140 }} onPress={() => { router.push('/(tabs)/LoanApplication'); }}>
                                <Ionicons name="add-circle-outline" size={20} color="white" style={{ marginRight: 6 }} />
                                <Text className="text-white font-bold text-base">Apply Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Available Loan Products */}
                    <Text className="font-bold text-lg px-5 mb-3">Available Loan Products</Text>
                    {loanProducts.map((product, idx) => (
                        <View key={product.title} className="bg-white rounded-xl shadow p-4 mb-4 mx-3 border border-gray-100">
                            <Text className="font-bold text-base mb-1">{product.title}</Text>
                            <Text className="text-gray-500 mb-3 text-sm">{product.description}</Text>
                            <View className="flex-row items-center mb-3 space-x-4">
                                <View className="flex-row items-center space-x-1">
                                    <MaterialIcons name="attach-money" size={18} color="#15803d" />
                                    <Text className="text-gray-700 text-sm">{product.amount}</Text>
                                </View>
                                <View className="flex-row items-center space-x-1">
                                    <MaterialIcons name="percent" size={18} color="#15803d" />
                                    <Text className="text-gray-700 text-sm">{product.interest}</Text>
                                </View>
                                <View className="flex-row items-center space-x-1">
                                    <MaterialIcons name="event" size={18} color="#15803d" />
                                    <Text className="text-gray-700 text-sm">{product.term}</Text>
                                </View>
                            </View>
                            <View className="flex-row justify-between mt-2">
                                <TouchableOpacity className="flex-1 items-center justify-center bg-white border border-green-700 rounded-full py-2 mr-2" style={{ minWidth: 110 }}>
                                    <Text className="text-green-700 font-semibold">View Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 items-center justify-center bg-green-700 rounded-full py-2 ml-2" style={{ minWidth: 90 }}>
                                    <Text className="text-white font-semibold">Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}

            {activeTab === 'payments' && <LoanPayments />}
            {activeTab === 'history' && <LoanHistory />}
            {activeTab === 'analytics' && <LoanAnalytics />}
        </View>
    );
}
