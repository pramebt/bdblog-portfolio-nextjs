"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import BlogSearch from "@/components/main/blog/BlogSearch";
import BlogResultsInfo from "@/components/main/blog/BlogResultsInfo";
import BlogGrid from "@/components/main/blog/BlogGrid";
import BlogPagination from "@/components/main/blog/BlogPagination";
import BlogEmptyState from "@/components/main/blog/BlogEmptyState";
import BlogErrorState from "@/components/main/blog/BlogErrorState";
import BlogLoadingState from "@/components/main/blog/BlogLoadingState";

const ease = [0.16, 1, 0.3, 1];

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchPosts = async (page = 1, search = "") => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        published: "true",
      });

      if (search) params.append("search", search);

      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch posts");
      }

      if (data.success) {
        setPosts(data.data.posts);
        setCurrentPage(data.data.pagination.page);
        setTotalPages(data.data.pagination.pages);
        setTotalPosts(data.data.pagination.total);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, searchTerm);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts(1, searchTerm);
  };

  const handlePageChange = (page) => {
    fetchPosts(page, searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchPosts(1, "");
  };

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[50vh] ambient-surface opacity-80" />

      <section className="px-4 pb-10 pt-16 md:pb-14 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            Writing
          </motion.p>
          <motion.h1
            className="mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            Blog
          </motion.h1>
          <motion.p
            className="mb-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
          >
            Notes on web development, craft, and the things I&apos;m learning
            along the way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
          >
            <BlogSearch
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              onSubmit={handleSearch}
              loading={loading}
            />
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-5xl">
          <BlogResultsInfo
            searchTerm={searchTerm}
            totalPosts={totalPosts}
            loading={loading}
          />
          <BlogErrorState error={error} />
          <BlogLoadingState loading={loading} />
          <BlogGrid posts={posts} loading={loading} />

          {totalPages > 1 && (
            <div className="mt-12">
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {!loading && posts.length === 0 && !error && (
            <BlogEmptyState
              searchTerm={searchTerm}
              onClearSearch={handleClearSearch}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
