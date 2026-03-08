# TesterArmy CLI mutation evaluation

| # | Mutation | Result | Issues | Notes |
|---|---|---|---:|---|
| 1 | baseline | PASS | 0 | Verified that all header navigation links (okwasniewski, blog, portfolio, videos, contact) are present in the mobile viewport and correctly route to their respective paths (/, /blog, /portfolio, /videos, /contact). Navig |
| 2 | home_label_changed | FAILED | 3 | Verified header links and routes on mobile viewport. Found that the brand link text is 'Oskar Site' instead of 'okwasniewski', the 'Home' link text is missing, and the navigation links are lowercase instead of capitalize |
| 3 | blog_typo | FAILED | 2 | Tested header navigation in mobile viewport (375x812). All links (Home, Blog, Portfolio, Videos, Contact) were present, but the 'Blog' and 'Contact' links inconsistently route to incorrect paths ('/blgo' and '/contcat')  |
| 4 | portfolio_typo | FAILED | 2 | Verified header navigation in mobile viewport. Found incorrect routes for 'Portfolio' on the home page and 'Contact' on the 404 page, both leading to broken links. |
| 5 | videos_typo | FAILED | 1 | Tested header navigation in mobile view (375x812) and found that the Contact link correctly exists but has a typo in its route ('/contcat'), leading to a 404 error. |
| 6 | contact_typo | FAILED | 1 | Verified navigation links for Home, Blog, Portfolio, Videos, and Contact in the header at 375x812; the 'Contact' link incorrectly routes to '/contcat' instead of '/contact', resulting in a 404 error. |
| 7 | blog_removed | FAILED | 1 | Verified header navigation in mobile viewport; all links (Home, Portfolio, Videos, Contact) correctly route to their respective pages, but the 'Blog' link is missing from the header specifically on the Home page. |
| 8 | contact_not_clickable | FAILED | 1 | Verified header navigation links for okwasniewski (Home), Blog, Portfolio, Videos, and Contact; the 'contact' item is a non-clickable SPAN element on the homepage instead of a link. |
| 9 | swapped_blog_portfolio | FAILED | 2 | Verified the mobile header navigation; found that the 'Blog' and 'Portfolio' links are swapped, leading to the wrong routes. |
| 10 | nav_pointer_events_none | FAILED | 1 | All header navigation links (Home/okwasniewski, Blog, Portfolio, Videos, Contact) have correct routing in the DOM but are unclickable via pointer events (mouse/touch) on both mobile and desktop viewports due to 'pointer- |
