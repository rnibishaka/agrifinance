import { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import UserTable from './components/UserTable';
import { useRouter } from 'expo-router';

const initialUsers = [
  { name: 'Emily Davis', email: 'emily@example.com', phone: '+1555666777', farmType: 'Poultry', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321', farmType: 'Livestock', status: 'Active' },
  { name: 'John Doe', email: 'john@example.com', phone: '+1234567890', farmType: 'Crop Farming', status: 'Active' },
  { name: 'Michael Wilson', email: 'michael@example.com', phone: '+1777888999', farmType: 'Dairy Farming', status: 'Active' },
  { name: 'Robert Johnson', email: 'robert@example.com', phone: '+1122334455', farmType: 'Mixed Farming', status: 'Inactive' },
];
const router = useRouter();
export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const router = useRouter();
  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchesStatus =
      filter === 'all' ? true :
      filter === 'active' ? u.status === 'Active' :
      filter === 'inactive' ? u.status === 'Inactive' : true;
    return matchesSearch && matchesStatus;
  });

  const handleView = (user) => {};
  const handleEdit = (user) => {};
  const handleDelete = (user) => {};

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 pt-8 pb-2">
        <Text className="text-xl font-bold">User Management</Text>
        <View className="flex-row space-x-2">
          <TouchableOpacity>
            <MaterialIcons name="filter-list" size={24} color="#444" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-4 mb-2">
        <View className="flex-row items-center bg-purple-50 rounded-lg px-3 py-2 mb-2">
          <MaterialIcons name="search" size={20} color="#888" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search users..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <View className="flex-row space-x-2 mb-2">
          <TouchableOpacity className={`flex-row items-center px-3 py-1 rounded-full ${filter === 'all' ? 'bg-green-100' : 'bg-gray-100'}`} onPress={() => setFilter('all')}>
            <MaterialIcons name="groups" size={16} color="#15803d" />
            <Text className="ml-1 text-xs font-semibold">Total: {users.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity className={`flex-row items-center px-3 py-1 rounded-full ${filter === 'active' ? 'bg-green-100' : 'bg-gray-100'}`} onPress={() => setFilter('active')}>
            <MaterialIcons name="check-circle" size={16} color="#22c55e" />
            <Text className="ml-1 text-xs font-semibold">Active: {users.filter(u => u.status === 'Active').length}</Text>
          </TouchableOpacity>
          <TouchableOpacity className={`flex-row items-center px-3 py-1 rounded-full ${filter === 'inactive' ? 'bg-red-100' : 'bg-gray-100'}`} onPress={() => setFilter('inactive')}>
            <MaterialIcons name="remove-circle" size={16} color="#ef4444" />
            <Text className="ml-1 text-xs font-semibold">Inactive: {users.filter(u => u.status === 'Inactive').length}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 px-2">
        <UserTable users={filteredUsers} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
      </View>
      <TouchableOpacity className="absolute bottom-6 right-6 bg-green-700 rounded-full px-6 py-3 flex-row items-center shadow-lg">
        <MaterialIcons name="add" size={22} color="white" />
        <Text className="text-white font-bold ml-2">Add User</Text>
      </TouchableOpacity>
    </View>
  );
}
