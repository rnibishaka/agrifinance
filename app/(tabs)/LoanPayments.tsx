import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const paymentSchedule = [
  { date: 'Aug 15, 2025', amount: '$250', status: 'Upcoming' },
  { date: 'Sep 15, 2025', amount: '$250', status: 'Upcoming' },
  { date: 'Oct 15, 2025', amount: '$250', status: 'Scheduled' },
  { date: 'Nov 15, 2025', amount: '$250', status: 'Scheduled' },
  { date: 'Dec 15, 2025', amount: '$250', status: 'Scheduled' },
];

// Calculate totals dynamically
const totalLoanAmount = paymentSchedule.reduce((sum, item) => sum + Number(item.amount.replace(/[^\d.]/g, '')), 0);
const paidAmount = paymentSchedule
  .filter(item => item.status !== 'Scheduled')
  .reduce((sum, item) => sum + Number(item.amount.replace(/[^\d.]/g, '')), 0);
const remaining = totalLoanAmount - paidAmount;

export default function LoanPayments() {
  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={true}>
      <View className="px-3 pt-5">
        <Text className="text-xl font-bold mb-1">Welcome, Farmer</Text>
        <Text className="text-gray-500 mb-3">Access agricultural financing with ease</Text>
        <View className="bg-white rounded-xl shadow p-4 border border-gray-100">
          <Text className="font-bold text-base mb-4">Payment Schedule</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 font-semibold">Date</Text>
            <Text className="text-gray-500 font-semibold">Amount</Text>
            <Text className="text-gray-500 font-semibold">Status</Text>
          </View>
          {paymentSchedule.map((item, idx) => (
            <View key={item.date} className="flex-row justify-between items-center mb-2">
              <Text className="text-base text-gray-800" style={{ minWidth: 90 }}>{item.date}</Text>
              <Text className="text-base text-gray-800">{item.amount}</Text>
              {item.status === 'Upcoming' ? (
                <Text className="text-xs bg-orange-400 text-white px-2 py-1 rounded-full font-semibold">Upcoming</Text>
              ) : (
                <Text className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-full font-semibold">Scheduled</Text>
              )}
            </View>
          ))}
          <View className="flex-row justify-between mt-4 mb-2">
            <View className="items-center">
              <Text className="text-xs text-gray-500">Total Loan Amount</Text>
              <Text className="text-green-700 font-bold text-lg">${totalLoanAmount.toLocaleString()}</Text>
            </View>
            <View className="items-center">
              <Text className="text-xs text-gray-500">Paid Amount</Text>
              <Text className="text-green-700 font-bold text-lg">${paidAmount.toLocaleString()}</Text>
            </View>
            <View className="items-center">
              <Text className="text-xs text-gray-500">Remaining</Text>
              <Text className="text-green-700 font-bold text-lg">${remaining.toLocaleString()}</Text>
            </View>
          </View>
          <View className="flex-row justify-center mt-2">
            <TouchableOpacity className="flex-row items-center justify-center bg-green-700 rounded-full px-6 py-2" style={{ minWidth: 160 }}>
              <MaterialIcons name="payments" size={20} color="white" style={{ marginRight: 6 }} />
              <Text className="text-white font-bold text-base">Make Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
