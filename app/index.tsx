import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { router } from "expo-router";
import { useArticles } from "@/utils/hooks/useArticles";
import { useCategories } from "@/utils/hooks/useCategories";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lang] = useState<"ru" | "kz">("kz");

  const { categories } = useCategories();
  const {
    articles,
    loading,
    refreshing,
    loadingMore,
    hasMore,
    refresh,
    loadMore,
  } = useArticles({ lang, categorySlug: selectedCategory });

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

    const paddingToBottom = 180;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    if (isCloseToBottom) {
      loadMore();
    }
  };

  const handleCategoryPress = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ThemedText type="title" style={styles.headerTitle}>
            ONEMIN.KZ <HelloWave />
          </ThemedText>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="#e74c3c" // ios color
            colors={["#e74c3c"]}
          />
        }
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.heroContainer}
          contentContainerStyle={styles.heroContent}
        >
          {articles.slice(0, 3).map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.heroCard}
              onPress={() => router.push(`/article/${article.slug}`)}
            >
              <Image
                source={{ uri: article.preview_image }}
                style={styles.heroImage}
              />
              <View style={styles.heroOverlay}>
                <ThemedText style={styles.heroText}>{article.title}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.slug &&
                  styles.categoryButtonActive,
              ]}
              onPress={() => handleCategoryPress(category.slug)}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  selectedCategory === category.slug &&
                    styles.categoryTextActive,
                ]}
              >
                {category.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.newsList}>
          {articles.slice(3).map((article) => (
            <TouchableOpacity
              onPress={() => router.push(`/article/${article.slug}`)}
              key={article.id}
              style={styles.newsCard}
            >
              <Image
                source={{ uri: article.preview_image }}
                style={styles.newsImage}
              />
              <View style={styles.newsContent}>
                <ThemedText style={styles.newsTitle}>
                  {article.title}
                </ThemedText>
                <View style={styles.newsFooter}>
                  <View style={styles.newsInfo}>
                    <Ionicons name="time-outline" size={14} color="#999" />
                    <ThemedText style={styles.newsTime}>
                      {new Date(article.published_at).toLocaleDateString(
                        "ru-RU",
                      )}
                    </ThemedText>
                    <Ionicons
                      name="eye-outline"
                      size={14}
                      color="#999"
                      style={{ marginLeft: 8 }}
                    />
                    <ThemedText style={styles.newsViews}>
                      {article.views_count}
                    </ThemedText>
                  </View>
                  <View style={styles.newsActions}>
                    <Ionicons
                      name="share-social-outline"
                      size={20}
                      color="#999"
                      style={{ marginLeft: 12 }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {loadingMore && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#e74c3c" />
              <ThemedText style={styles.loadingText}>Загрузка...</ThemedText>
            </View>
          )}

          {!loading && articles.length === 0 && (
            <View style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>Нет новостей</ThemedText>
            </View>
          )}

          {!hasMore && articles.length > 0 && (
            <View style={styles.endContainer}>
              <ThemedText style={styles.endText}>
                Больше нет новостей
              </ThemedText>
            </View>
          )}

          {loading && articles.length === 0 && (
            <View style={styles.initialLoadingContainer}>
              <ActivityIndicator size="large" color="#e74c3c" />
              <ThemedText style={styles.loadingText}>
                Загрузка новостей...
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: "#b80000",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroContainer: {
    marginTop: 16,
  },
  heroContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  heroCard: {
    width: 200,
    height: 230,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
  },
  heroText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  categoryButtonActive: {
    backgroundColor: "#b80000",
  },
  categoryText: {
    fontSize: 13,
    color: "#666",
  },
  categoryTextActive: {
    color: "#fff",
  },
  newsList: {
    paddingTop: 16,
    gap: 4,
  },
  newsCard: {
    flexDirection: "row",
    padding: 12,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
  newsImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  newsContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: "#333",
  },
  newsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newsInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  newsTime: {
    fontSize: 12,
    color: "#999",
  },
  newsViews: {
    fontSize: 12,
    color: "#999",
  },
  newsActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#999",
  },
  endContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  endText: {
    fontSize: 14,
    color: "#999",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  initialLoadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
  },
});
