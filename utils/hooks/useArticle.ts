import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export interface ArticleDetail {
  id: string;
  title: string;
  slug: string;
  content: any;
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

export const useArticle = (slug: string) => {
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        const { data: article, error: fetchError } = await supabase
          .from("articles")
          .select(
            `
            id,
            title,
            slug,
            content,
            excerpt,
            preview_image,
            published_at,
            category:categories(id, name, slug),
            tags:tags(id, name, slug),
            stats:article_stats(views_count)
          `,
          )
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (fetchError) throw fetchError;

        const viewsCount = article.stats?.views_count || 0;

        delete article.stats;

        setArticle({
          ...article,
          views_count: viewsCount,
        });

        await supabase.rpc("increment_article_views", {
          article_id: article.id,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  return { article, loading, error };
};
