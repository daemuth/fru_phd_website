const Cache = require("@11ty/eleventy-cache-assets");
require("dotenv").config();

module.exports = async function () {
  let notion_posts_db_url = `https://api.notion.com/v1/databases/${process.env.NOTION_POSTS_DB}/query`
  let notion_pages_db_url = `https://api.notion.com/v1/databases/${process.env.NOTION_PAGES_DB}/query`

  let cacheOptions = {
    duration: "30s",
    type: "json",
    fetchOptions: {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2021-08-16",
        "Content-Type": "application/json"
      },
    }
  }

  const filter = {
    "filter": {
      "property": "Published",
      "checkbox": {
        "equals": true
      }
    }
  }

  let posts = await Cache(notion_posts_db_url, cacheOptions)

  //TODO: Parse Pages later
  let pages = await Cache(notion_pages_db_url, cacheOptions)

  for (var post of posts.results) {
    let post_url = 'https://api.notion.com/v1/blocks/' + post.id + '/children?page_size=100'
    post.content = await Cache(post_url, {
      duration: "30s",
      type: "json",
      fetchOptions: {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2021-08-16",
          "Content-Type": "application/json"
        },
      }
    })
  }

  for (var page of pages.results) {
    let page_url = 'https://api.notion.com/v1/blocks/' + page.id + '/children?page_size=100'
    page.content = await Cache(page_url, {
      duration: "30s",
      type: "json",
      fetchOptions: {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2021-08-16",
          "Content-Type": "application/json"
        },
      }
    })
  }

  posts = posts.results
  pages = pages.results

  for (const post of posts)
  {
    post.title = post.properties.Name.title[0].plain_text;
  }

  for (const page of pages)
  {
    page.title = page.properties.Name.title[0].plain_text;
  }

  let data = {
    posts: posts,
    pages: pages
  }

  return data
};
