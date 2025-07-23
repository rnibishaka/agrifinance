import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const loanTypes = [
  { label: 'Farming Equipment Loan', icon: <FontAwesome5 name="tractor" size={16} color="#15803d" /> },
  { label: 'Crop Production Loan', icon: <MaterialIcons name="agriculture" size={16} color="#15803d" /> },
  { label: 'Livestock Loan', icon: <FontAwesome5 name="horse-head" size={16} color="#15803d" /> },
  { label: 'Farm Expansion Loan', icon: <MaterialIcons name="home-work" size={16} color="#15803d" /> },
  { label: 'Agricultural Infrastructure', icon: <MaterialIcons name="foundation" size={16} color="#15803d" /> },
];

export default function LoanApplication({ navigation }) {
  const [step, setStep] = useState(1);
  const [loanType, setLoanType] = useState(loanTypes[0].label);
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [purposeError, setPurposeError] = useState('');
  // Step 2
  const [term, setTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  // Step 3: Farm info (static for demo)
  const farmInfo = { size: '503', location: 'Kigali', existingLoans: 'No' };

  // Validation for Step 1
  const validateStep1 = () => {
    if (!purpose) {
      setPurposeError('Loan purpose is required');
      return false;
    }
    setPurposeError('');
    return true;
  };

  // Step 1: Loan Details
  const renderStep1 = () => (
    <View>
      <Text className="text-lg font-bold text-green-700 text-center mb-2">Loan Application</Text>
      <View className="w-full h-2 bg-gray-200 rounded-full mb-2">
        <View className="h-2 bg-green-700 rounded-full" style={{ width: '33%' }} />
      </View>
      <Text className="text-center text-xs text-gray-400 mb-2">Step 1 of 3</Text>
      <Text className="text-green-700 font-bold mb-1">Step 1: Loan Details</Text>
      <Text className="text-gray-500 mb-3">Tell us about the loan you need</Text>
      <Text className="font-semibold mb-2">Select Loan Type</Text>
      <View className="flex-row flex-wrap mb-3 gap-2">
        {loanTypes.map((type) => (
          <TouchableOpacity
            key={type.label}
            className={`flex-row items-center px-3 py-2 rounded-lg border mb-2 mr-2 ${loanType === type.label ? 'bg-green-100 border-green-700' : 'bg-gray-100 border-gray-300'}`}
            onPress={() => setLoanType(type.label)}
          >
            {type.icon}
            <Text className={`ml-2 font-semibold ${loanType === type.label ? 'text-green-700' : 'text-gray-700'}`}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text className="font-semibold mb-1">Loan Amount ($)</Text>
      <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 bg-white mb-3">
        <MaterialIcons name="attach-money" size={18} color="#9CA3AF" />
        <TextInput
          className="flex-1 text-base ml-2"
          placeholder="3000"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>
      <Text className="font-semibold mb-1">Purpose of Loan</Text>
      <View className={`border rounded-md px-3 py-2 mb-1 ${purposeError ? 'border-red-500' : 'border-gray-300'} bg-white flex-row items-center`}>
        <MaterialIcons name="description" size={18} color="#9CA3AF" />
        <TextInput
          className="flex-1 text-base ml-2"
          placeholder="Purpose"
          value={purpose}
          onChangeText={setPurpose}
        />
      </View>
      {purposeError ? <Text className="text-red-500 text-xs mb-2">{purposeError}</Text> : null}
      <TouchableOpacity
        className="w-full bg-green-700 rounded-full py-3 mt-2"
        onPress={() => {
          if (validateStep1()) setStep(2);
        }}
      >
        <Text className="text-white text-center font-semibold text-base">Next</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 2: Repayment Terms
  const renderStep2 = () => (
    <View>
      <Text className="text-lg font-bold text-green-700 text-center mb-2">Loan Application</Text>
      <View className="w-full h-2 bg-gray-200 rounded-full mb-2">
        <View className="h-2 bg-green-700 rounded-full" style={{ width: '66%' }} />
      </View>
      <Text className="text-center text-xs text-gray-400 mb-2">Step 2 of 3</Text>
      <Text className="text-green-700 font-bold mb-1">Step 2: Repayment Terms</Text>
      <Text className="text-gray-500 mb-3">Set your repayment preferences</Text>
      <Text className="font-semibold mb-1">Term (months)</Text>
      <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 bg-white mb-3">
        <MaterialIcons name="date-range" size={18} color="#9CA3AF" />
        <TextInput
          className="flex-1 text-base ml-2"
          placeholder="8"
          value={term}
          onChangeText={setTerm}
          keyboardType="numeric"
        />
      </View>
      <Text className="font-semibold mb-1">Interest Rate (%)</Text>
      <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 bg-white mb-3">
        <MaterialIcons name="percent" size={18} color="#9CA3AF" />
        <TextInput
          className="flex-1 text-base ml-2"
          placeholder="8.0"
          value={interestRate}
          onChangeText={setInterestRate}
          keyboardType="numeric"
        />
      </View>
      <Text className="font-semibold mb-1">Est. Monthly Payment</Text>
      <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 bg-white mb-3">
        <MaterialIcons name="payments" size={18} color="#9CA3AF" />
        <TextInput
          className="flex-1 text-base ml-2"
          placeholder="$90.15"
          value={monthlyPayment}
          onChangeText={setMonthlyPayment}
          keyboardType="numeric"
        />
      </View>
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity className="flex-1 bg-gray-200 rounded-full py-3 mr-2" onPress={() => setStep(1)}>
          <Text className="text-gray-700 text-center font-semibold text-base">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-green-700 rounded-full py-3 ml-2" onPress={() => setStep(3)}>
          <Text className="text-white text-center font-semibold text-base">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Step 3: Review & Submit
  const renderStep3 = () => (
    <View>
      <Text className="text-lg font-bold text-green-700 text-center mb-2">Loan Application</Text>
      <View className="w-full h-2 bg-gray-200 rounded-full mb-2">
        <View className="h-2 bg-green-700 rounded-full" style={{ width: '100%' }} />
      </View>
      <Text className="text-center text-xs text-gray-400 mb-2">Step 3 of 3</Text>
      <Text className="text-green-700 font-bold mb-1">Step 3: Review & Submit</Text>
      <Text className="text-gray-500 mb-3">Please review your application details</Text>
      {/* Loan Details Card */}
      <View className="bg-gray-50 rounded-xl shadow p-4 mb-4 border border-gray-100">
        <View className="flex-row items-center mb-2">
          <MaterialIcons name="account-balance-wallet" size={22} color="#15803d" />
          <Text className="font-bold ml-2">Loan Details</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500">Loan Type:</Text>
          <Text className="font-semibold">{loanType}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500">Amount:</Text>
          <Text className="font-semibold">${amount}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500">Purpose:</Text>
          <Text className="font-semibold">{purpose}</Text>
        </View>
      </View>
      {/* Repayment Terms Card */}
      <View className="bg-gray-50 rounded-xl shadow p-4 mb-4 border border-gray-100">
        <View className="flex-row items-center mb-2">
          <MaterialIcons name="event" size={22} color="#15803d" />
          <Text className="font-bold ml-2">Repayment Terms</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500">Term:</Text>
          <Text className="font-semibold">{term} months</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500">Interest Rate:</Text>
          <Text className="font-semibold">{interestRate}% per annum</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500">Est. Monthly Payment:</Text>
          <Text className="font-semibold">${monthlyPayment}</Text>
        </View>
      </View>
      {/* Farm Information Card */}
      <View className="bg-gray-50 rounded-xl shadow p-4 mb-4 border border-gray-100">
        <View className="flex-row items-center mb-2">
          <MaterialIcons name="agriculture" size={22} color="#15803d" />
          <Text className="font-bold ml-2">Farm Information</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500">Farm Size:</Text>
          <Text className="font-semibold">{farmInfo.size}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500">Location:</Text>
          <Text className="font-semibold">{farmInfo.location}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500">Existing Loans:</Text>
          <Text className="font-semibold">{farmInfo.existingLoans}</Text>
        </View>
      </View>
      <Text className="text-xs text-gray-400 mb-3 text-center">
        By submitting this application, you confirm that all information provided is accurate and complete.
      </Text>
      <View className="flex-row justify-between mt-2">
        <TouchableOpacity className="flex-1 bg-gray-200 rounded-full py-3 mr-2" onPress={() => setStep(2)}>
          <Text className="text-gray-700 text-center font-semibold text-base">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-green-700 rounded-full py-3 ml-2">
          <Text className="text-white text-center font-semibold text-base">Submit Application</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-6">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </ScrollView>
  );
} 