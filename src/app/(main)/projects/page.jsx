"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ProjectSearch from "@/components/main/projects/ProjectSearch";
import ProjectResultsInfo from "@/components/main/projects/ProjectResultsInfo";
import ProjectGrid from "@/components/main/projects/ProjectGrid";
import ProjectPagination from "@/components/main/projects/ProjectPagination";
import ProjectEmptyState from "@/components/main/projects/ProjectEmptyState";
import ProjectErrorState from "@/components/main/projects/ProjectErrorState";
import ProjectLoadingState from "@/components/main/projects/ProjectLoadingState";
import ProjectTabs from "@/components/main/projects/ProjectTabs";

const ease = [0.16, 1, 0.3, 1];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [counts, setCounts] = useState({
    personal: 0,
    professional: 0,
    total: 0,
  });

  const fetchProjects = async (page = 1, search = "", type = "all") => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        published: "true",
      });

      if (search) params.append("search", search);
      if (type && type !== "all") params.append("type", type);

      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch projects");
      }

      if (data.success) {
        setProjects(data.data.projects);
        setCurrentPage(data.data.pagination.page);
        setTotalPages(data.data.pagination.pages);
        setTotalProjects(data.data.pagination.total);
        setCounts(
          data.data.counts || { personal: 0, professional: 0, total: 0 }
        );
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(1, searchTerm, activeTab);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProjects(1, searchTerm, activeTab);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    fetchProjects(1, searchTerm, tab);
  };

  const handlePageChange = (page) => {
    fetchProjects(page, searchTerm, activeTab);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchProjects(1, "", activeTab);
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
            Selected work
          </motion.p>
          <motion.h1
            className="mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            Projects
          </motion.h1>
          <motion.p
            className="mb-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
          >
            Web apps and experiments I&apos;ve designed and built — from product
            ideas to polished interfaces.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
          >
            <ProjectSearch
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
          <ProjectTabs
            personalCount={counts.personal}
            professionalCount={counts.professional}
            totalCount={counts.total}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          >
            <ProjectResultsInfo
              searchTerm={searchTerm}
              totalProjects={totalProjects}
              loading={loading}
            />
            <ProjectErrorState error={error} />
            <ProjectLoadingState loading={loading} />
            <ProjectGrid projects={projects} loading={loading} />

            {totalPages > 1 && (
              <div className="mt-12">
                <ProjectPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {!loading && projects.length === 0 && !error && (
              <ProjectEmptyState
                searchTerm={searchTerm}
                onClearSearch={handleClearSearch}
              />
            )}
          </ProjectTabs>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
