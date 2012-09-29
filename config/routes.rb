Thetweetbox::Application.routes.draw do
  root to: "users#new"
  get "/auth/twitter/callback" => "sessions#create"
  get "/signout" => "sessions#destroy", :as => :signout
  get "/tag/:hashtag" => "hashtags#index", :as => 'hashtags'
  get "/:twitter_name/:hashtag" => 'hashtags#show', :as => 'hashtag'
  get "/:twitter_name" => "users#show", :as => 'user'

end

