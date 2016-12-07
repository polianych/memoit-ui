export interface Post {
  post: {
    id: string,
    title: string,
    content: string,
    postable_type: string,
    publisher_type: string,
    published_at: string
  },
  user?: {
    id: string,
    nickname: string
  },
  user_post?: {
    id: string,
    link: string,
    image_url: string,
    video_url: string
  },
  rss_channel?: {
    id: string,
    title: string,
    image_url: string
  },
  rss_post?: {
    id: string,
    link: string,
    media_thumbnail: string,
    guid: string
  }
}
