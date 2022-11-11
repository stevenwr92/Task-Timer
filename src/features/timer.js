import { View, Text, StyleSheet, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { Countdown } from "../components/Countdown";
import { RoundedButton } from "../components/RoundedButtons";
import { useState } from "react";
import { spacing } from "../utils/sizes";
import { colors } from "../utils/colors";
import { Timing } from "./Timing";
import { useKeepAwake } from "expo-keep-awake";

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgess] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgess(1);
    reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgess}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.progressBar}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timmingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton
            title="Start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        )}
        {isStarted && (
          <RoundedButton
            title="Pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={60} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  timmingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
  },
  clearSubjectWrapper: { alignItems: "center" },
});
