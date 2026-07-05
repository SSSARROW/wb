import { useEffect } from "react"

const SITE_URL = "https://senxdev.com"
const DEFAULT_IMAGE = `${SITE_URL}/favicon.jpg`

function setMetaTag(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function setLinkTag(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

// Updates document head tags on route change so each page has its own
// title/description/canonical/OG data instead of sharing index.html's defaults.
export default function Seo({ title, description, path = "/", image, jsonLd, noindex = false }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const ogImage = image || DEFAULT_IMAGE

    if (title) document.title = title

    setMetaTag("name", "description", description)
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow")

    setMetaTag("property", "og:title", title)
    setMetaTag("property", "og:description", description)
    setMetaTag("property", "og:url", url)
    setMetaTag("property", "og:image", ogImage)
    setMetaTag("property", "og:type", "website")
    setMetaTag("property", "og:site_name", "SenXDev")

    setMetaTag("name", "twitter:card", "summary_large_image")
    setMetaTag("name", "twitter:title", title)
    setMetaTag("name", "twitter:description", description)
    setMetaTag("name", "twitter:image", ogImage)

    setLinkTag("canonical", url)

    const scriptId = "seo-jsonld"
    let script = document.getElementById(scriptId)
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script")
        script.id = scriptId
        script.type = "application/ld+json"
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }
  }, [title, description, path, image, jsonLd, noindex])

  return null
}
