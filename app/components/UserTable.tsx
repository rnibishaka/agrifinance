import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function UserTable({ users, onView, onEdit, onDelete }) {
  return (
    <ScrollView horizontal className="w-full" showsHorizontalScrollIndicator={true}>
      <View className="min-w-[800px]">
        {/* Table Header */}
        <View className="flex-row border-b border-gray-200 bg-gray-50">
          <Text className="w-36 px-2 py-2 font-semibold text-xs text-gray-500">Name</Text>
          <Text className="w-48 px-2 py-2 font-semibold text-xs text-gray-500">Email</Text>
          <Text className="w-36 px-2 py-2 font-semibold text-xs text-gray-500">Phone</Text>
          <Text className="w-36 px-2 py-2 font-semibold text-xs text-gray-500">Farm Type</Text>
          <Text className="w-24 px-2 py-2 font-semibold text-xs text-gray-500">Status</Text>
          <Text className="w-32 px-2 py-2 font-semibold text-xs text-gray-500">Actions</Text>
        </View>
        {/* Table Rows */}
        {users.map((user, idx) => (
          <View key={user.email} className="flex-row border-b border-gray-100 items-center">
            <Text className="w-36 px-2 py-2 text-gray-800" numberOfLines={1}>{user.name}</Text>
            <Text className="w-48 px-2 py-2 text-gray-800" numberOfLines={1}>{user.email}</Text>
            <Text className="w-36 px-2 py-2 text-gray-800" numberOfLines={1}>{user.phone}</Text>
            <Text className="w-36 px-2 py-2 text-gray-800" numberOfLines={1}>{user.farmType}</Text>
            <View className="w-24 px-2 py-2 flex-row justify-center">
              {user.status === 'Active' ? (
                <Text className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Active</Text>
              ) : (
                <Text className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Inactive</Text>
              )}
            </View>
            <View className="w-32 px-2 py-2 flex-row justify-center space-x-2">
              <TouchableOpacity onPress={() => onView(user)}>
                <MaterialIcons name="visibility" size={20} color="#2563eb" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onEdit(user)}>
                <MaterialIcons name="edit" size={20} color="#fbbf24" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(user)}>
                <MaterialIcons name="delete" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
