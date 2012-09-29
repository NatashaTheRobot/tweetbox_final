class HashtagsController < ApplicationController
  def show
    @user = User.find(:first, :conditions => ["lower(twitter_name) =?", params[:twitter_name].downcase])
    @hashtag = Hashtag.find_by_text(params[:hashtag])
    @tweets = []
    @user.tweets.each do |tweet|
      if tweet.hashtags.include?(@hashtag)
          @tweets << tweet
      end
    end

    hashtags = {}
    @user.tweets.each do |tweet|
      tweet.hashtags.each do |hashtag|
        if hashtags.include?(hashtag.text)
          hashtags[hashtag.text] += 1
        else
          hashtags[hashtag.text] = 1
        end
      end
    end
    @hashtags = Hash[hashtags.sort]

  end

  def index
    @user = current_user
    @hashtags = Hashtag.all
    @hashtag = Hashtag.find_by_text(params[:hashtag])
    @tweets = @hashtag.tweets
    hashtags = {}
    @tweets.each do |tweet|
      tweet.hashtags.each do |hashtag|
        if hashtags.include?(hashtag.text)
          hashtags[hashtag.text] += 1
        else
          hashtags[hashtag.text] = 1
        end
      end
    end
    @hashtags = Hash[hashtags.sort]
  end
end