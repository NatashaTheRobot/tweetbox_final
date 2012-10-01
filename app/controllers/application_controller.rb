class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user, :hashtags_with_nums

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def hashtags_with_nums(tweets)
    hashtags = {}
    tweets.each do |tweet|
      tweet.hashtags.each do |hashtag|
        if hashtags.include?(hashtag.text)
          hashtags[hashtag.text] += 1
        else
          hashtags[hashtag.text] = 1
        end
      end
    end
    Hash[hashtags.sort]
  end

  def hashtags_with_tweets(tweets)
    hashtags = {"untagged" => []}

    tweets.each do |tweet|
      if tweet.hashtags == []
        hashtags["untagged"] << tweet
      else
        tweet.hashtags.each do |hashtag|
          if hashtags[hashtag.text]
            hashtags[hashtag.text] << tweet
          else
            hashtags[hashtag.text] = [tweet]
          end
        end
      end
    end
    untagged = hashtags.delete('untagged')
    hashtags_sorted = Hash[hashtags.sort]
    hashtags_sorted['untagged'] = untagged
    hashtags_sorted
  end
end