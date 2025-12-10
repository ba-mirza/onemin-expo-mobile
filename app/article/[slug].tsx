import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useArticle } from "@/utils/hooks/useArticle";

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { article, loading, error } = useArticle(slug || "");

  const handleShare = async () => {
    if (!article) return;

    try {
      const url = `https://oneminute.kz/kz/${article.category.slug}/${article.slug}`;

      await Share.share({
        message: `${article.title}\n\n${url}`,
        url: url, // for ios (don touch)
        title: article.title,
      });
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось поделиться");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e74c3c" />
        <ThemedText style={styles.loadingText}>Загрузка...</ThemedText>
      </ThemedView>
    );
  }

  if (error || !article) {
    return (
      <ThemedView style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#999" />
        <ThemedText style={styles.errorText}>
          {error || "Статья не найдена"}
        </ThemedText>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.backButtonText}>Назад</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.metaContainer}>
          <View style={styles.categoryBadge}>
            <ThemedText style={styles.categoryText}>
              {article.category.name}
            </ThemedText>
          </View>
          <View style={styles.metaInfo}>
            <Ionicons name="time-outline" size={14} color="#999" />
            <ThemedText style={styles.metaText}>
              {new Date(article.published_at).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </ThemedText>
            <Ionicons
              name="eye-outline"
              size={14}
              color="#999"
              style={{ marginLeft: 12 }}
            />
            <ThemedText style={styles.metaText}>
              {article.views_count} просмотров
            </ThemedText>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>{article.title}</ThemedText>
        </View>

        <Image
          source={{ uri: article.preview_image }}
          style={styles.mainImage}
        />

        {article.excerpt && (
          <View style={styles.excerptContainer}>
            <ThemedText style={styles.excerpt}>{article.excerpt}</ThemedText>
          </View>
        )}

        <View style={styles.contentContainer}>
          <ThemedText style={styles.content}>
            {typeof article.content === "string"
              ? article.content
              : JSON.stringify(article.content)}
          </ThemedText>
        </View>

        {article.tags && article.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            <View style={styles.tagsWrapper}>
              {article.tags.map((tag: any) => (
                <View key={tag.id} style={styles.tagBadge}>
                  <Ionicons name="pricetag" size={14} color="#b80000" />
                  <ThemedText style={styles.tagText}>{tag.name}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#999",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  backButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#b80000",
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  metaContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#b80000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: "#999",
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 34,
    color: "#000",
  },
  mainImage: {
    width: "100%",
    height: 240,
    marginTop: 20,
  },
  excerptContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  excerpt: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    fontStyle: "italic",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
  },
  tagsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  tagsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 12,
  },
  tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    color: "#333",
  },
});
