import { useEffect, useState } from "react"
import AppLayout from "../layouts/AppLayout"
import { blogService } from "../services/blogService"
import { BlogPost } from "../types/blogs"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const Blogs = () => {
    const { t } = useTranslation();

    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            const data = await blogService.getAllPosts();
            setBlogs(data.filter((post: BlogPost) => post.isPublished));
            setLoading(false);
        }
        fetchBlogs()
    }, [])

    return (
        <AppLayout>
            <div className="w-full h-[400px] bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1500&q=80')" }}>
                <h1 className="text-5xl text-white font-bold tracking-wide uppercase">{t("navigation.blogs")}</h1>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                </div>
            ) : blogs.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center my-20">
                    <span className="text-4xl font-bold my-8 text-center">{t("blogs.no-posts-found")}</span>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center items-center gap-12 my-8">
                    {blogs.map(post => (
                        <div key={post.id} className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
                            {post.imageUrl && (
                                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            )}
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-2xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                                <p className="text-sm text-gray-500 mb-2">
                                    {t('blogs.published-by', {
                                        author: post.author,
                                        date: dayjs(post.createdAt.toDate()).format('DD/MM/YYYY HH:mm:ss')
                                    })}
                                </p>
                                {post.tags && post.tags.length > 0 && (
                                    <div className="mb-2 flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    {post.content.length > 150
                                        ? <>
                                            {post.content.slice(0, 150)}... <Link to={`/blogs/${post.id}`} className="text-blue-500 hover:underline">{t("common:read-more")}</Link>
                                        </>
                                        : post.content}
                                </p>
                                <span className="text-xs text-gray-400 mt-auto">{t("common:last-updated")}: {dayjs(post.updatedAt.toDate()).format('DD/MM/YYYY HH:mm:ss')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    )
}
