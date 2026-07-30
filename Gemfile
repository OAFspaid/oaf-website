source "https://rubygems.org"

# GitHub Pages compatibility - includes jekyll and all supported plugins
gem "github-pages", "~> 231", group: :jekyll_plugins

# Webrick is required for Ruby 3+ (not included by default)
gem "webrick", "~> 1.9"

# Windows-specific support
platforms :mingw, :x64_mingw, :mswin do
  gem "tzinfo-data"
end

# Development dependencies
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-seo-tag", "~> 2.8"
end
