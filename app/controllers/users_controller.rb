class UsersController < ApplicationController
  def new
    @hashtags = Hashtag.order("RANDOM()").scoped.page(params[:page]).per(15)# (:order => "RANDOM()")
  end

  def show
    @user = User.find(:first, :conditions => ["lower(twitter_name) =?", params[:twitter_name].downcase])
    @hashtags_with_nums = hashtags_with_nums(@user.tweets)
    @hashtags_with_tweets = hashtags_with_tweets(@user.tweets)
  end

end
