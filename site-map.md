---
layout: page
title: "Site Map"
permalink: /site-map/
description: "Browse the full public page and article structure for Operation Antifragile."
---

<div class="sitemap-layout">
  <section class="sitemap-panel" aria-labelledby="site-map-pages">
    <h2 id="site-map-pages">Pages</h2>
    <ul class="sitemap-list">
      {% assign public_pages = site.html_pages | sort: 'title' %}
      {% for item in public_pages %}
        {% unless item.url == page.url or item.url == '/404.html' or item.title == nil %}
          <li><a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
        {% endunless %}
      {% endfor %}
    </ul>
  </section>

  <section class="sitemap-panel" aria-labelledby="site-map-posts">
    <h2 id="site-map-posts">Posts</h2>
    <ul class="sitemap-list">
      {% assign public_posts = site.posts | sort: 'title' %}
      {% for post in public_posts %}
        <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
      {% endfor %}
    </ul>
  </section>
</div>
