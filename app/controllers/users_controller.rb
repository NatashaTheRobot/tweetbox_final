class UsersController < ApplicationController
  def new
    @hashtags = Hashtag.order("RANDOM()").scoped.page(params[:page]).per(15)# (:order => "RANDOM()")
  end

  def show
    @user = User.find(:first, :conditions => ["lower(twitter_name) =?", params[:twitter_name].downcase])
    @tweets = @user.tweets.order("twitter_id DESC").scoped.page(params[:page]).per(50)
    @hashtags = hashtags_with_nums(@tweets)
  end

end
