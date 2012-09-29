#                  root        /                                 users#new
#                 users GET    /users(.:format)                  users#index
#                       POST   /users(.:format)                  users#create
#              new_user GET    /users/new(.:format)              users#new
#             edit_user GET    /users/:id/edit(.:format)         users#edit
#                  user PUT    /users/:id(.:format)              users#update
#                       DELETE /users/:id(.:format)              users#destroy
#              hashtags GET    /hashtags(.:format)               hashtags#index
#                       POST   /hashtags(.:format)               hashtags#create
#           new_hashtag GET    /hashtags/new(.:format)           hashtags#new
#          edit_hashtag GET    /hashtags/:id/edit(.:format)      hashtags#edit
#               hashtag PUT    /hashtags/:id(.:format)           hashtags#update
#                       DELETE /hashtags/:id(.:format)           hashtags#destroy
# auth_twitter_callback GET    /auth/twitter/callback(.:format)  sessions#create
#               signout GET    /signout(.:format)                sessions#destroy
#               hashtag GET    /:twitter_name/:hashtag(.:format) hashtags#show
#                  user GET    /:twitter_name(.:format)          users#show


Thetweetbox::Application.routes.draw do
  root to: "users#new"
  get "/auth/twitter/callback" => "sessions#create"
  get "/signout" => "sessions#destroy", :as => :signout
  get "/tag/:hashtag" => "hashtags#index", :as => 'hashtags'
  get "/:twitter_name/:hashtag" => 'hashtags#show', :as => 'hashtag'
  get "/:twitter_name" => "users#show", :as => 'user'

end

