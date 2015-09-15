options = {
  scope: ['email','profile','https://www.googleapis.com/auth/drive']
  # approval_prompt:"force",
  # access_type:'offline',
  # prompt:'consent'
}


if !Rails.env.production?
  options.merge!({
    :client_options => {
      :ssl => {
        :verify => false
      }
    }
  })
end


Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['CLIENT_ID'], ENV['CLIENT_SECRET'], options
end