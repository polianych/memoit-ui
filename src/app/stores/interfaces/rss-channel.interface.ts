export interface RssChannel {
  id: number,
  slug: string,
  title: string,
  url: string,
  description: string,
  rss_category_id: number,
  subscribed: boolean,
  subscription_id: number|null
}
