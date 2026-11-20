"use client";

import { useState, useEffect } from "react";
import PageIntro from "@/components/main/shared/PageIntro";
import ProjectSearch from "@/components/main/projects/ProjectSearch";
import ProjectResultsInfo from "@/components/main/projects/ProjectResultsInfo";
import ProjectGrid from "@/components/main/projects/ProjectGrid";
import ProjectPagination from "@/components/main/projects/ProjectPagination";
import ProjectEmptyState from "@/components/main/projects/ProjectEmptyState";
import ProjectErrorState from "@/components/main/projects/ProjectErrorState";
import ProjectLoadingState from "@/components/main/projects/ProjectLoadingState";
import ProjectTabs from "@/components/main/projects/ProjectTabs";
const PAGE_SIZE = 12;

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [view, setView] = useState("grid");
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
        limit: String(PAGE_SIZE),
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
      <PageIntro
        label="Selected work"
        title="Projects"
        description="Web apps and experiments I've designed and built — from product ideas to polished interfaces."
      >
        <ProjectSearch
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          loading={loading}
        />
      </PageIntro>

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
              view={view}
              onViewChange={setView}
            />
            <ProjectErrorState error={error} />
            <ProjectLoadingState loading={loading} />
            <ProjectGrid
              projects={projects}
              loading={loading}
              view={view}
              startIndex={(currentPage - 1) * PAGE_SIZE + 1}
            />

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
