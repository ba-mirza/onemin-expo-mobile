import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams();

  const article = {
    title: "Virat Kohli Becomes First Player To Complete 7,000 Runs For RCB",
    date: "23/04/2022 Monday",
    time: "20 min ago",
    image: "https://picsum.photos/800/400?random=1",
    content: `Virat Kohli achieved this feat during the match against Gujarat Titans (GT) at the Wankheda Stadium.

Royal Challengers Bangalore (RCB) star batter Virat Kohli on Thursday became the first player to score 7000 runs for a single IPL franchise. Kohli achieved this feat during the match against Gujarat Titans (GT) at the Wankheda Stadium.

He created history as soon after he scored 57th run in this match.

He created history as soon after he scored 57th run in this match. Listen to the latest songs, only on JioSaavn.com Kohli is also the highest run-scorer in the league's history, followed by Shikhar Dhawan (6,205), Rohit Sharma (5,877), David Warner (5,876), Suresh Raina (5,528) and Ab De Villiers (5,162).`,
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>{article.title}</ThemedText>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color="#999" />
              <ThemedText style={styles.metaText}>{article.date}</ThemedText>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color="#999" />
              <ThemedText style={styles.metaText}>{article.time}</ThemedText>
            </View>
          </View>
        </View>

        <Image source={{ uri: article.image }} style={styles.mainImage} />

        <View style={styles.contentContainer}>
          <ThemedText style={styles.content}>{article.content}</ThemedText>
        </View>

        <View style={styles.shareContainer}>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    color: "#000",
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: "#999",
  },
  mainImage: {
    width: "90%",
    height: 240,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
    color: "#333",
  },
  shareContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    paddingVertical: 32,
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
});
