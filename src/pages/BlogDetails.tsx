import { useParams, useNavigate, Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { blogService } from "../services/blogService";
import { BlogPost } from "../types/blogs";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { BlogDetailsSkeleton } from "../skeletons/BlogDetailsSkeleton";

const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const {
        data: blog,
        isLoading: loading,
    } = useQuery<BlogPost | null>({
        queryKey: ['blog', id],
        queryFn: async () => {
            if (!id) return null;
            const post = await blogService.getPostById(id);
            if (!post || !post.isPublished) return null;
            return post;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const {
        data: latestBlogs = [],
    } = useQuery<BlogPost[]>({
        queryKey: ['latest-blogs', id],
        queryFn: async () => {
            const all = await blogService.getAllPosts();
            const published = all.filter((b: BlogPost) => b.isPublished && b.id !== id);
            published.sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime());
            return published.slice(0, 3);
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        if (!loading) {
            const timeout = setTimeout(() => setShowSkeleton(false), 1000);
            return () => clearTimeout(timeout);
        } else {
            setShowSkeleton(true);
        }
    }, [loading]);

    if (showSkeleton) {
        return (
            <AppLayout>
                <BlogDetailsSkeleton />
            </AppLayout>
        );
    }
    if (!blog) {
        return (
            <AppLayout>
                <div className="w-full flex flex-col items-center justify-center my-20">
                    <span className="text-4xl font-bold my-8 text-center">{t("blogs.post-not-found")}</span>
                    <button className="mt-4 text-blue-500 hover:underline" onClick={() => navigate(-1)}>{t("common:go-back")}</button>
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <div className="w-full h-[400px] bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url('${blog.imageUrl || "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1500&q=80"}')` }}>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl text-white font-bold tracking-wide uppercase line-clamp-2 text-center bg-black/40 px-4 py-2 rounded-lg">{blog.title}</h1>
            </div>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col my-8">
                <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-gray-500 mb-2">
                        {t('blogs.published-by', {
                            author: blog.author,
                            date: dayjs(blog.createdAt.toDate()).format('DD/MM/YYYY HH:mm:ss')
                        })}
                    </p>
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-2">
                            {blog.tags.map(tag => (
                                <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                    )}
                    <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">{blog.content}</p>
                    <span className="text-xs text-gray-400 mt-auto">{t("common:last-updated")}: {dayjs(blog.updatedAt.toDate()).format('DD/MM/YYYY HH:mm:ss')}</span>
                </div>
            </div>
            {latestBlogs.length > 0 && (
                <div className="max-w-2xl mx-auto my-8">
                    <h2 className="text-2xl font-bold mb-4">{t("blogs.latest-blogs")}</h2>
                    <div className="flex flex-col gap-4">
                        {latestBlogs.map(blog => (
                            <Link key={blog.id} to={`/blogs/${blog.id}`} className="block p-4 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                                <div className="flex items-center gap-4">
                                    {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="w-20 h-20 object-cover rounded" />}
                                    <div>
                                        <h3 className="text-lg font-semibold line-clamp-1">{blog.title}</h3>
                                        <p className="text-xs text-gray-500">{dayjs(blog.createdAt.toDate()).format('DD/MM/YYYY')}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default BlogDetails; 