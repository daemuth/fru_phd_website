const Cache = require("@11ty/eleventy-cache-assets");
require("dotenv").config();

module.exports = async function () {

  let notionDatabases = [{'name': 'posts', 'id': `${process.env.NOTION_POSTS_DB}`}, {
    'name': 'pages', 'id': `${process.env.NOTION_PAGES_DB}`
  }, {'name': 'cards', 'id': `${process.env.NOTION_CARDS_DB}`}]


  function getCacheOptions(method) {
    return {
      duration: "1d", type: "json", fetchOptions: {
        method: `${method}`, headers: {
          "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2021-08-16",
          "Content-Type": "application/json"
        },
      }
    }
  }

  let dataNew = {}

  for (let database of notionDatabases) {

    let currentDatabaseUrl = `https://api.notion.com/v1/databases/${database.id}/query`

    // List object of all pages within database
    let currentDatabaseCached = await Cache(currentDatabaseUrl, getCacheOptions("POST"))

    //Array of objects containing all pages
    for (let page of currentDatabaseCached.results) {

      page.notion_metadata = page.properties
      console.log(page.properties)


      if ('properties' in page && 'Name' in page.properties) {
        page.title = page.properties.Name.title[0].plain_text
      }

      if ('properties' in page && 'url' in page.properties) {
        page.custom_slug = page.properties.url.rich_text[0].plain_text
      }

      page.content = []
      await cacheNotionPageBlocks(page, page, page.id)
    }

    dataNew[database.name] = currentDatabaseCached.results
  }

  async function cacheNotionPageBlocks(originalPage, parentPage, parent_id, start_cursor) {

    //Do not put cursor for first query
    let page_url = typeof start_cursor === 'undefined' ? `https://api.notion.com/v1/blocks/${parent_id}/children?page_size=100` : `https://api.notion.com/v1/blocks/${parent_id}/children?page_size=100&start_cursor=${start_cursor}`

    var page = await Cache(page_url, getCacheOptions("GET"))

    for (let block of page.results) {
      originalPage.content.push(block)
    }

    if (page.has_more === true) {
      let next_cursor = page['next_cursor']
      let nextPageUrl = `https://api.notion.com/v1/blocks/${parent_id}/children?start_cursor=${next_cursor}&page_size=100`
      let nextPage = await Cache(nextPageUrl, getCacheOptions("GET"))
      await cacheNotionPageBlocks(originalPage, nextPage, parent_id, next_cursor)
    }
  }
  return dataNew
};
