# Paperclip.options[:content_type_mappings] = {
#   pdf: 'application/octet-stream'
# }
Paperclip::Attachment.default_options[:url] = ':s3_domain_url'
# Paperclip::Attachment.default_options[:path] = ":class/:attachment/:id_partition/:filename"
# Paperclip::Attachment.default_options[:s3_host_name] = 's3-us-west-2.amazonaws.com'
