export interface Subscription {
  id: number,
  created_at: string,
  user_id: number,
  publisher_type: string,
  publisher_id: number,
  publisher_title: string,
  user_subscription_id: number,
  subscribed: boolean
}
