import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  preview_image: string;
  published_at: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
  views_count: number;
}

interface UseArticlesOptions {
  lang: "ru" | "kz";
  categorySlug?: string;
  pageSize?: number;
}

export const useArticles = ({
  lang,
  categorySlug,
  pageSize = 10,
}: UseArticlesOptions) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (pageNum: number, isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      let query = supabase
        .from("articles")
        .select(
          `
          id,
          title,
          slug,
          excerpt,
          preview_image,
          published_at,
          category:categories(id, name, slug),
          tags:tags(id, name, slug),
          stats:article_stats(views_count)
        `,
        )
        .eq("is_published", true)
        .eq("lang", lang)
        .order("published_at", { ascending: false })
        .range((pageNum - 1) * pageSize, pageNum * pageSize - 1);

      if (categorySlug && categorySlug !== "all") {
        const { data: category } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", categorySlug)
          .single();

        if (category) {
          query = query.eq("category_id", category.id);
        }
      }

      const { data: articles, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      const articlesWithStats = (articles || []).map((article: any) => ({
        ...article,
        views_count: article.stats?.views_count || 0,
      }));

      if (isRefresh || pageNum === 1) {
        setArticles(articlesWithStats);
        setPage(1);
      } else {
        setArticles((prev) => [...prev, ...articlesWithStats]);
      }

      setHasMore(articlesWithStats.length === pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    fetchArticles(1);
  }, [lang, categorySlug]);

  const refresh = () => {
    fetchArticles(1, true);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchArticles(nextPage);
    }
  };

  return {
    articles,
    loading,
    refreshing,
    loadingMore,
    error,
    hasMore,
    refresh,
    loadMore,
  };
};
