import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const ResultsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [tableData, setTableData] = useState([]);

  const fetchResults = async () => {
    try {
      const response = await fetch("https://tgryl.pl/quiz/results?last=20");
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchResults().then(() => setRefreshing(false));
  }, []);

  const Item = ({ nick, score, total, type, createdOn }) => (
    <View style={[styles.row, styles.evenRow]}>
      <Text style={styles.cell}>{nick}</Text>
      <Text style={styles.cell}>{score}</Text>
      <Text style={styles.cell}>{total}</Text>
      <Text style={styles.cell}>{type}</Text>
      <Text style={styles.cell}>{createdOn}</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView horizontal>
          <FlatList
            data={tableData}
            renderItem={({ item }) => (
              <Item
                nick={item.nick}
                score={item.score}
                total={item.total}
                type={item.type}
                createdOn={item.createdOn}
              />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.headerText]}>Nick</Text>
                <Text style={[styles.cell, styles.headerText]}>Score</Text>
                <Text style={[styles.cell, styles.headerText]}>Total</Text>
                <Text style={[styles.cell, styles.headerText]}>Type</Text>
                <Text style={[styles.cell, styles.headerText]}>Created On</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    backgroundColor: '#4CAF50',
    width: "500px"
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'align'
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
});

export default ResultsScreen;