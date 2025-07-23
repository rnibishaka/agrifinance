import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import ProjectAnalytics from './ProjectAnalytics';
import { useRouter } from 'expo-router';

const projectSummary = {
  active: 3,
  goals: 11,
  completed: 4,
};

const projects = [
  {
    name: 'Maize Season 2025',
    progress: 65,
    due: 'Sep 30',
    goals: [
      { label: 'Land preparation', done: true },
      { label: 'Planting', done: true },
      { label: 'Fertilizer application', done: false },
      { label: 'Harvest', done: false },
    ],
  },
  {
    name: 'Tree Planting Initiative',
    progress: 30,
    due: 'Dec 15',
    goals: [
      { label: 'Site selection', done: true },
      { label: 'Seedling preparation', done: false },
      { label: 'Planting', done: false },
    ],
  },
  {
    name: 'Poultry Expansion',
    progress: 15,
    due: 'Nov 30',
    goals: [
      { label: 'Coop design', done: true },
      { label: 'Materials procurement', done: false },
      { label: 'Construction', done: false },
    ],
  },
];

const activities = [
  { label: 'Apply fertilizer to maize', due: 'Due Tomorrow', priority: 'high' },
  { label: 'Check irrigation system', due: 'Due In 3 days', priority: 'medium' },
  { label: 'Prepare seedlings for tree planting', due: 'Due In 3 days', priority: 'medium' },
  { label: 'Contact suppliers for poultry', due: 'Due In 5 days', priority: 'low' },
];

// Fix: Add type annotation for priorities
const priorities: Record<string, { color: string; text: string; label: string }> = {
  high: { color: 'bg-red-200', text: 'text-red-700', label: 'high' },
  medium: { color: 'bg-yellow-200', text: 'text-yellow-700', label: 'medium' },
  low: { color: 'bg-blue-200', text: 'text-blue-700', label: 'low' },
};

const allGoals = [
  { goal: 'Land preparation', project: 'Maize Season 2025', due: 'Jul 15', status: 'Done' },
  { goal: 'Planting', project: 'Maize Season 2025', due: 'Jul 30', status: 'Done' },
  { goal: 'Fertilizer application', project: 'Maize Season 2025', due: 'Aug 15', status: 'Active' },
  { goal: 'Harvesting', project: 'Maize Season 2025', due: 'Sep 30', status: 'Todo' },
  { goal: 'Site selection', project: 'Tree Planting Initiative', due: 'Jul 10', status: 'Done' },
  { goal: 'Seedling preparation', project: 'Tree Planting Initiative', due: 'Aug 20', status: 'Active' },
  { goal: 'Planting', project: 'Tree Planting Initiative', due: 'Sep 15', status: 'Todo' },
  { goal: 'Coop design', project: 'Poultry Expansion', due: 'Jul 20', status: 'Done' },
  { goal: 'Materials procurement', project: 'Poultry Expansion', due: 'Aug 30', status: 'Active' },
  { goal: 'Construction', project: 'Poultry Expansion', due: 'Oct 15', status: 'Todo' },
  { goal: 'Stock acquisition', project: 'Poultry Expansion', due: 'Nov 15', status: 'Todo' },
];

export default function ProjectServices() {
  const [activeTab, setActiveTab] = useState('overview');
  const [goalFilter, setGoalFilter] = useState('all');
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Bar */}
      <View className="bg-blue-700 pt-10 pb-3 px-4 flex-row items-center justify-between rounded-b-2xl shadow">
        <Text className="text-lg font-semibold text-white">Project Services</Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white rounded-t-2xl shadow mx-0 mt-0 overflow-hidden">
        <TouchableOpacity className="flex-1 items-center py-3 flex-col" style={activeTab === 'overview' ? { borderBottomWidth: 2, borderBottomColor: '#2563eb' } : {}} onPress={() => setActiveTab('overview')}>
          <MaterialIcons name="home" size={28} color={activeTab === 'overview' ? '#2563eb' : '#6b7280'} />
          <Text className={activeTab === 'overview' ? 'text-blue-700 font-semibold text-sm mt-1' : 'text-gray-500 text-sm mt-1'}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-3 flex-col" style={activeTab === 'projects' ? { borderBottomWidth: 2, borderBottomColor: '#2563eb' } : {}} onPress={() => setActiveTab('projects')}>
          <MaterialIcons name="folder-open" size={28} color={activeTab === 'projects' ? '#2563eb' : '#6b7280'} />
          <Text className={activeTab === 'projects' ? 'text-blue-700 font-semibold text-sm mt-1' : 'text-gray-500 text-sm mt-1'}>Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-3 flex-col" style={activeTab === 'goals' ? { borderBottomWidth: 2, borderBottomColor: '#2563eb' } : {}} onPress={() => setActiveTab('goals')}>
          <MaterialIcons name="flag" size={28} color={activeTab === 'goals' ? '#2563eb' : '#6b7280'} />
          <Text className={activeTab === 'goals' ? 'text-blue-700 font-semibold text-sm mt-1' : 'text-gray-500 text-sm mt-1'}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-3 flex-col" style={activeTab === 'analytics' ? { borderBottomWidth: 2, borderBottomColor: '#2563eb' } : {}} onPress={() => setActiveTab('analytics')}>
          <MaterialIcons name="bar-chart" size={28} color={activeTab === 'analytics' ? '#2563eb' : '#6b7280'} />
          <Text className={activeTab === 'analytics' ? 'text-blue-700 font-semibold text-sm mt-1' : 'text-gray-500 text-sm mt-1'}>Analytics</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'overview' && (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={true}>
          <View className="px-3 pt-5">
            <Text className="text-xl font-bold mb-1">Welcome, Farmer</Text>
            <Text className="text-gray-500 mb-3">Manage your agricultural projects</Text>
            {/* Project Summary */}
            <View className="bg-white rounded-xl shadow p-4 mb-4 border border-gray-100 flex-row justify-between items-center">
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-blue-700">{projectSummary.active}</Text>
                <Text className="text-xs text-gray-500">Active Projects</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-blue-700">{projectSummary.goals}</Text>
                <Text className="text-xs text-gray-500">Goals</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-blue-700">{projectSummary.completed}</Text>
                <Text className="text-xs text-gray-500">Completed</Text>
              </View>
            </View>
            {/* Active Projects */}
            <Text className="font-bold text-lg mb-2">Active Projects</Text>
            {projects.map((project, idx) => (
              <View key={project.name} className="bg-white rounded-xl shadow p-4 mb-4 border border-gray-100">
                <View className="flex-row justify-between mb-1">
                  <Text className="font-bold text-base">{project.name}</Text>
                  <Text className="text-xs text-gray-500">Due: {project.due}</Text>
                </View>
                <View className="flex-row items-center mb-2">
                  <Text className="text-xs text-gray-500 mr-2">Progress: {project.progress}%</Text>
                  <View className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <View className="h-2 bg-blue-600 rounded-full" style={{ width: `${project.progress}%` }} />
                  </View>
                </View>
                {/* Goals */}
                {project.goals.slice(0, 3).map((goal, i) => (
                  <View key={goal.label} className="flex-row items-center mb-1">
                    {goal.done ? (
                      <MaterialIcons name="check-circle" size={16} color="#22c55e" className="mr-1" />
                    ) : (
                      <MaterialIcons name="radio-button-unchecked" size={16} color="#f59e42" className="mr-1" />
                    )}
                    <Text className={goal.done ? 'text-green-700 ml-1' : 'text-yellow-700 ml-1'}>{goal.label}</Text>
                  </View>
                ))}
                {project.goals.length > 3 && (
                  <Text className="text-green-700 text-xs ml-6 mb-2">+{project.goals.length - 3} more goals</Text>
                )}
                <View className="flex-row justify-between mt-2">
                  <TouchableOpacity className="flex-1 items-center justify-center bg-white border border-blue-700 rounded-full py-2 mr-2" style={{ minWidth: 110 }}>
                    <Text className="text-blue-700 font-semibold">View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 items-center justify-center bg-blue-700 rounded-full py-2 ml-2" style={{ minWidth: 110 }}>
                    <Text className="text-white font-semibold">Update Progress</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {/* Upcoming Activities */}
            <Text className="font-bold text-lg mb-2">Upcoming Activities</Text>
            <View className="bg-white rounded-xl shadow p-4 mb-4 border border-gray-100">
              {activities.map((activity, idx) => (
                <View key={activity.label} className="flex-row items-center mb-3">
                  <MaterialIcons name="event-note" size={20} color="#2563eb" />
                  <View className="ml-2 flex-1">
                    <Text className="font-semibold text-gray-700" numberOfLines={1}>{activity.label}</Text>
                    <Text className="text-xs text-gray-500">{activity.due}</Text>
                  </View>
                  <View className={`px-2 py-1 rounded-full ml-2 ${priorities[activity.priority].color}`}>
                    <Text className={`text-xs font-semibold ${priorities[activity.priority].text}`}>{priorities[activity.priority].label}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {activeTab === 'goals' && (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={true}>
          <View className="px-3 pt-5">
            <Text className="text-xl font-bold mb-1">Manage your agricultural projects</Text>
            {/* Filter Buttons */}
            <View className="flex-row bg-purple-50 rounded-xl p-2 mb-3">
              <TouchableOpacity
                className={`flex-1 items-center py-2 rounded-lg mr-2 ${goalFilter === 'all' ? 'bg-purple-200' : ''}`}
                onPress={() => setGoalFilter('all')}
              >
                <Text className={`font-semibold ${goalFilter === 'all' ? 'text-purple-900' : 'text-gray-700'}`}>All Goals</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 items-center py-2 rounded-lg mr-2 ${goalFilter === 'done' ? 'bg-purple-200' : ''}`}
                onPress={() => setGoalFilter('done')}
              >
                <Text className={`font-semibold ${goalFilter === 'done' ? 'text-purple-900' : 'text-gray-700'}`}>Completed</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 items-center py-2 rounded-lg ${goalFilter === 'active' ? 'bg-purple-200' : ''}`}
                onPress={() => setGoalFilter('active')}
              >
                <Text className={`font-semibold ${goalFilter === 'active' ? 'text-purple-900' : 'text-gray-700'}`}>In Progress</Text>
              </TouchableOpacity>
            </View>
            {/* Goals Table */}
            <View className="bg-white rounded-xl shadow p-2 mb-4 border border-gray-100">
              <View className="flex-row px-2 py-2 border-b border-gray-200">
                <Text className="w-2/6 text-xs font-semibold text-gray-500">Goal</Text>
                <Text className="w-2/6 text-xs font-semibold text-gray-500">Project</Text>
                <Text className="w-1/6 text-xs font-semibold text-gray-500">Due Date</Text>
                <Text className="w-1/6 text-xs font-semibold text-gray-500">Status</Text>
              </View>
              {allGoals
                .filter(g =>
                  goalFilter === 'all' ? true :
                  goalFilter === 'done' ? g.status === 'Done' :
                  goalFilter === 'active' ? g.status === 'Active' : true
                )
                .map((g, idx) => (
                  <View key={g.goal + g.project} className="flex-row items-center px-2 py-2 border-b border-gray-100 last:border-b-0">
                    <Text className="w-2/6 text-gray-800" numberOfLines={1}>{g.goal}</Text>
                    <Text className="w-2/6 text-gray-800" numberOfLines={1}>{g.project}</Text>
                    <Text className="w-1/6 text-gray-800 text-xs">{g.due}</Text>
                    <View className="w-1/6 flex-row justify-center">
                      {g.status === 'Done' && (
                        <Text className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">Done</Text>
                      )}
                      {g.status === 'Active' && (
                        <Text className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-semibold">Active</Text>
                      )}
                      {g.status === 'Todo' && (
                        <Text className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">Todo</Text>
                      )}
                    </View>
                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
      )}

      {activeTab === 'analytics' && <ProjectAnalytics />}

      {/* Floating New Project Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 bg-blue-700 rounded-full px-6 py-3 flex-row items-center shadow-lg" onPress={() => router.push('/(tabs)/NewProject')}>
        <MaterialIcons name="add" size={22} color="white" />
        <Text className="text-white font-bold ml-2">New Project</Text>
      </TouchableOpacity>
    </View>
  );
}
