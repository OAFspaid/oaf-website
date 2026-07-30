---
layout: page
title: "Contact Us"
permalink: /contact-us/
description: "Current contact options for Operation Antifragile."
---
{% assign contact = site.data.contact %}
{% assign social = site.data.social %}

<div class="contact-layout">
  {% include cta-panel.html
    title="Use the Live Contact Workflow"
    text="This GitHub Pages site is a static mirror. For active inquiries, use the live contact form or jump directly to current training offers."
    primary_text="Open the Live Contact Form"
    primary_url="https://operationantifragile.com/contact-us/"
    primary_external=true
    secondary_text="View TrainHeroic Programs"
    secondary_url="https://marketplace.trainheroic.com/brand/operation-antifragile"
    secondary_external=true
  %}

  <div class="contact-grid">
    <section class="contact-card" aria-labelledby="contact-direct">
      <h2 id="contact-direct">Get In Touch</h2>
      <ul class="contact-list">
        <li>
          <strong>{{ contact.address_label }}:</strong><br>
          {{ contact.address_lines | join: '<br>' }}
        </li>
        <li>
          <strong>{{ contact.phone_label }}:</strong>
          <a href="{{ contact.phone_url }}">{{ contact.phone_display }}</a>
        </li>
        <li>
          <strong>{{ contact.email_label }}:</strong>
          <a href="{{ contact.email_url }}">{{ contact.email_display }}</a>
        </li>
      </ul>
    </section>

    <section class="contact-card" aria-labelledby="contact-links">
      <h2 id="contact-links">Other Ways to Connect</h2>
      <ul class="contact-list">
        <li><a href="{{ site.baseurl }}/about/">Learn more about the mission</a></li>
        <li><a href="{{ site.baseurl }}/blog/">Read the latest articles and updates</a></li>
        <li><a href="https://marketplace.trainheroic.com/brand/operation-antifragile" target="_blank" rel="noopener noreferrer">Browse current TrainHeroic programs</a></li>
      </ul>

      <ul class="contact-social" aria-label="Social platforms">
        {% for item in social %}
          <li><a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a></li>
        {% endfor %}
      </ul>
    </section>
  </div>
</div>
