import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Realm } from "@realm/react";

import { TaskItem } from "./TaskItem";
import { Bill } from "../models/Bill";

type TaskListProps = {
  tasks: Realm.Results<Bill & Realm.Object>;
  // onToggleTaskStatus: (task: Task & Realm.Object) => void;
  // onDeleteTask: (task: Task & Realm.Object) => void;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task._id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            // onToggleStatus={() => onToggleTaskStatus(item)}
            // onDelete={() => onDeleteTask(item)}
            // // Don't spread the Realm item as such: {...item}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default TaskList;
