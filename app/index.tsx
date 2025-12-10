import { Image } from "expo-image";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function HomeScreen() {
  const heroNews = [
    {
      id: 1,
      title: "Share price of Tata Power jumps as sensex gains 1192.02 points",
      image: "https://picsum.photos/400/300?random=1",
    },
    {
      id: 2,
      title: "At BJP's key meet, PM Modii setting goals for next 25 years",
      image: "https://picsum.photos/400/300?random=2",
    },
    {
      id: 3,
      title: "At BJP's key meet, PM Modi setting goals for next 25 years",
      image: "https://picsum.photos/400/300?random=3",
    },
  ];

  const newsList = [
    {
      id: 3,
      title: "Virat Kohli Becomes First Player To Complete 7,000 Runs For RCB",
      time: "20 min ago",
      views: "1200 views",
      image: "https://picsum.photos/200/200?random=3",
    },
    {
      id: 4,
      title: "Elon Musk talks about Twitter bots yet AGAIN in recent tweet",
      time: "30 min ago",
      views: "1356 views",
      image: "https://picsum.photos/200/200?random=4",
    },
    {
      id: 5,
      title: "Crypto markets recover; Bitcoin, Ethereum both see uptrend",
      time: "2 hrs ago",
      views: "1400 views",
      image: "https://picsum.photos/200/200?random=5",
    },
    {
      id: 6,
      title: "US launches $3.5 billion program to remove carbon from air",
      time: "3 hrs ago",
      views: "980 views",
      image: "https://picsum.photos/200/200?random=6",
    },
    {
      id: 6,
      title: "US launches $3.5 billion program to remove carbon from air",
      time: "3 hrs ago",
      views: "980 views",
      image: "https://picsum.photos/200/200?random=6",
    },
    {
      id: 6,
      title: "US launches $3.5 billion program to remove carbon from air",
      time: "3 hrs ago",
      views: "980 views",
      image: "https://picsum.photos/200/200?random=6",
    },
    {
      id: 6,
      title: "US launches $3.5 billion program to remove carbon from air",
      time: "3 hrs ago",
      views: "980 views",
      image: "https://picsum.photos/200/200?random=6",
    },
    {
      id: 6,
      title: "US launches $3.5 billion program to remove carbon from air",
      time: "3 hrs ago",
      views: "980 views",
      image: "https://picsum.photos/200/200?random=6",
    },
    {
      id: 6,
      title: "US launches $3.5 billion program to remove carbon from air",
      time: "3 hrs ago",
      views: "980 views",
      image: "https://picsum.photos/200/200?random=6",
    },
  ];

  const categories = [
    "Барлығы",
    "Саясат",
    "Әлем",
    "Дін",
    "Сұхбат",
    "Сараптама",
  ];

  const imageUrl =
    "https://eysbvuebtdwqhpswiths.supabase.co/storage/v1/object/public/article-images/articles/50a18e9a-6d1a-4b8f-bc4f-7c9844b074dc.png";
  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     const { data: articles, error } = await supabase
  //       .from("articles")
  //       .select("*");

  //     if (error) {
  //       console.error(error);
  //       return;
  //     }

  //     console.log({ articles: articles });
  //   };

  //   fetchArticles();
  // }, []);
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ThemedText type="title" style={styles.headerTitle}>
            ONEMIN.KZ <HelloWave />
          </ThemedText>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.heroContainer}
          contentContainerStyle={styles.heroContent}
        >
          {heroNews.map((news) => (
            <TouchableOpacity key={news.id} style={styles.heroCard}>
              <Image source={{ uri: news.image }} style={styles.heroImage} />
              <View style={styles.heroOverlay}>
                <ThemedText style={styles.heroText}>{news.title}</ThemedText>
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
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                index === 0 && styles.categoryButtonActive,
              ]}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  index === 0 && styles.categoryTextActive,
                ]}
              >
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.newsList}>
          {newsList.map((news) => (
            <TouchableOpacity key={news.id} style={styles.newsCard}>
              <Image source={{ uri: news.image }} style={styles.newsImage} />
              <View style={styles.newsContent}>
                <ThemedText style={styles.newsTitle}>{news.title}</ThemedText>
                <View style={styles.newsFooter}>
                  <View style={styles.newsInfo}>
                    <Ionicons name="time-outline" size={14} color="#999" />
                    <ThemedText style={styles.newsTime}>{news.time}</ThemedText>
                    <Ionicons
                      name="eye-outline"
                      size={14}
                      color="#999"
                      style={{ marginLeft: 8 }}
                    />
                    <ThemedText style={styles.newsViews}>
                      {news.views}
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
    paddingHorizontal: 16,
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
});
