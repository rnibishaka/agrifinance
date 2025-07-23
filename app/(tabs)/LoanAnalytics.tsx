import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Circle, Path, Svg, Text as SvgText } from 'react-native-svg';

const balanceData = [5000, 4688, 4375, 4063, 3750];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const stats = {
  interestPaid: 250,
  principalPaid: 750,
  remainingInterest: 500,
  remainingPrincipal: 4500,
};

const total = stats.interestPaid + stats.principalPaid + stats.remainingInterest + stats.remainingPrincipal;
const principalPercent = ((stats.principalPaid + stats.remainingPrincipal) / total) * 100;
const interestPercent = 100 - principalPercent;

export default function LoanAnalytics() {
  const [balance] = useState(balanceData);

  // Chart dimensions (increased for design)
  const chartWidth = 320;
  const chartHeight = 180;
  const minY = Math.min(...balance);
  const maxY = Math.max(...balance);
  const yRange = maxY - minY;
  const points = balance.map((val, i) => {
    const x = (i / (balance.length - 1)) * (chartWidth - 60) + 30;
    const y = ((maxY - val) / yRange) * (chartHeight - 60) + 30;
    return { x, y };
  });
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')} L${points[points.length-1].x},${chartHeight-30} L${points[0].x},${chartHeight-30} Z`;

  // Donut chart
  const donutRadius = 48;
  const donutStroke = 12;
  const principalAngle = (principalPercent / 100) * 360;
  const interestAngle = 360 - principalAngle;
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };
  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    color: string
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    return (
      <Path
        d={`M${start.x},${start.y} A${radius},${radius} 0 ${arcSweep} 0 ${end.x},${end.y}`}
        stroke={color}
        strokeWidth={donutStroke}
        fill="none"
      />
    );
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={true}>
      <View className="px-3 pt-5">
        <Text className="text-xl font-bold mb-1">Welcome, Farmer</Text>
        <Text className="text-gray-500 mb-3">Access agricultural financing with ease</Text>
        {/* Loan Balance Over Time */}
        <View className="bg-white rounded-xl shadow p-4 mb-4 border border-gray-100">
          <Text className="font-bold text-base mb-4">Loan Balance Over Time</Text>
          <View className="bg-gray-50 rounded-xl p-2 items-center">
            <Svg width={chartWidth} height={chartHeight}>
              {/* Area fill */}
              <Path d={areaPath} fill="#bbf7d0" opacity={0.5} />
              {/* Line */}
              <Path d={linePath} stroke="#15803d" strokeWidth={2} fill="none" />
              {/* Points */}
              {points.map((p, i) => (
                <Circle key={i} cx={p.x} cy={p.y} r={7} fill="#15803d" />
              ))}
              {/* Legend */}
              <Circle cx={50} cy={30} r={7} fill="#15803d" />
              <SvgText x={65} y={36} fontSize="14" fill="#222">Loan Balance</SvgText>
              {/* Y axis labels */}
              {[0,1,2,3,4].map(i => (
                <SvgText
                  key={i}
                  x={10}
                  y={30 + i * ((chartHeight-60)/4)}
                  fontSize="13"
                  fill="#888"
                >
                  {Math.round(maxY - (yRange/4)*i)}
                </SvgText>
              ))}
              {/* X axis labels */}
              {points.map((p, i) => (
                <SvgText
                  key={months[i] || i}
                  x={p.x}
                  y={chartHeight-10}
                  fontSize="13"
                  fill="#888"
                  textAnchor="middle"
                >
                  {months[i] || ''}
                </SvgText>
              ))}
            </Svg>
          </View>
        </View>
        {/* Loan Statistics */}
        <View className="bg-gray-50 rounded-xl shadow p-4 mb-4 border border-gray-100">
          <Text className="font-bold text-base mb-4">Loan Statistics</Text>
          <View className="flex-row flex-wrap justify-between mb-4 gap-y-3">
            <View className="w-1/2 p-2">
              <View className="bg-white rounded-lg py-3 px-2 items-center justify-center">
                <Text className="text-xs text-gray-500 mb-1">Interest Paid</Text>
                <Text className="font-bold text-lg">${stats.interestPaid.toLocaleString()}</Text>
              </View>
            </View>
            <View className="w-1/2 p-2">
              <View className="bg-white rounded-lg py-3 px-2 items-center justify-center">
                <Text className="text-xs text-gray-500 mb-1">Principal Paid</Text>
                <Text className="font-bold text-lg">${stats.principalPaid.toLocaleString()}</Text>
              </View>
            </View>
            <View className="w-1/2 p-2">
              <View className="bg-white rounded-lg py-3 px-2 items-center justify-center">
                <Text className="text-xs text-gray-500 mb-1">Remaining Interest</Text>
                <Text className="font-bold text-lg">${stats.remainingInterest.toLocaleString()}</Text>
              </View>
            </View>
            <View className="w-1/2 p-2">
              <View className="bg-white rounded-lg py-3 px-2 items-center justify-center">
                <Text className="text-xs text-gray-500 mb-1">Remaining Principal</Text>
                <Text className="font-bold text-lg">${stats.remainingPrincipal.toLocaleString()}</Text>
              </View>
            </View>
          </View>
          <View className="border-t border-gray-200 my-2" />
          {/* Donut chart and legend */}
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <View className="w-3 h-3 rounded-full bg-green-700 mr-2" />
                <Text className="text-xs text-gray-700">Principal ({Math.round(principalPercent)}%)</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-orange-400 mr-2" />
                <Text className="text-xs text-gray-700">Interest ({Math.round(interestPercent)}%)</Text>
              </View>
            </View>
            <View className="items-center">
              <Svg width={110} height={110}>
                {/* Principal arc */}
                {describeArc(55, 55, donutRadius, 0, principalAngle, '#15803d')}
                {/* Interest arc */}
                {describeArc(55, 55, donutRadius, principalAngle, 360, '#fb923c')}
                {/* Center circle */}
                <Circle cx={55} cy={55} r={donutRadius - donutStroke} fill="#fff" />
                <SvgText x={55} y={55} fontSize="18" fill="#15803d" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                  ${total.toLocaleString()}
                </SvgText>
                <SvgText x={55} y={72} fontSize="12" fill="#888" textAnchor="middle">Total</SvgText>
              </Svg>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
