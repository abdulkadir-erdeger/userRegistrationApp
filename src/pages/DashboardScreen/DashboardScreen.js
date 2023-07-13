import { View, Text, Dimensions, ScrollView } from "react-native";
import React from "react";
import styles from "./DashboardScreen.styles";
import { BarChart, ProgressChart } from "react-native-chart-kit";

const DashboardScreen = () => {
  const data = {
    labels: ["Swim", "Bike", "Run"],
    data: [0.4, 0.6, 0.8],
  };

  const data2 = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const screenWidth = Dimensions.get("window").width - 80;
  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.widget}>
        <Text style={styles.widgetTitle}>Widget 1</Text>
        <ProgressChart
          data={data}
          width={screenWidth}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
          backgroundColor={"transparent"}
        />
      </View>

      <View style={styles.widget}>
        <Text style={styles.widgetTitle}>Widget 2</Text>
        <BarChart
          data={data2}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
