module ApplicationHelper
  def tweet_text(tweet)
    CGI.unescape(tweet.text).gsub(/http[^\s]+/, '')
  end
end
