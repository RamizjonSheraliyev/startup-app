import { IBlog } from '@/types'
import request, { gql } from 'graphql-request'
import { cache } from 'react'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

if (!graphqlAPI) {
	console.error('❌ Error: NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined in environment variables!')
}

export const getBlogs = async (): Promise<IBlog[]> => {
	const query = gql`
		query GetBlogs {
			blogs {
				title
				createdAt
				author {
					name
					image {
						url
					}
				}
				category {
					name
					slug
				}
				description
				tag {
					name
					slug
				}
				image {
					url
				}
				content {
					html
				}
				slug
			}
		}
	`

	try {
		if (!graphqlAPI) return []
		console.log('🔍 Fetching all blogs...')
		const { blogs } = await request<{ blogs: IBlog[] }>(graphqlAPI, query)
		console.log('✅ Blogs fetched:', blogs.length)
		return blogs
	} catch (error) {
		console.error('❌ Error fetching blogs:', error)
		return []
	}
}

export const getDetailedBlog = cache(async (slug: string): Promise<IBlog | null> => {
	if (!slug) {
		console.error('❌ Error: Slug is undefined or empty!')
		return null
	}

	const query = gql`
		query GetDetailedBlog($slug: String!) {
			blog(where: { slug: $slug }) {
				author {
					name
					image {
						url
					}
					bio
					id
				}
				content {
					html
				}
				createdAt
				image {
					url
				}
				slug
				tag {
					name
					slug
				}
				category {
					name
					slug
				}
				title
				description
			}
		}
	`

	try {
		if (!graphqlAPI) return null
		console.log(`🔍 Fetching blog with slug: "${slug}"...`)
		const { blog } = await request<{ blog: IBlog | null }>(graphqlAPI, query, { slug })

		if (!blog) {
			console.warn(`⚠️ Warning: Blog with slug "${slug}" not found!`)
			return null
		}

		console.log('✅ Blog fetched successfully:', blog)
		return blog
	} catch (error) {
		console.error(`❌ Error fetching detailed blog (slug: ${slug}):`, error)
		return null
	}
})
