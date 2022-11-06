/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

import memoize from "lodash/memoize";

interface ParsedURL {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  password: string;
  path: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  // This should be a "URLSearchParams" object
  searchParams: Record<string, string>;
  username: string;
}

const defaultUrl: ParsedURL = {
  hash: "",
  host: "",
  hostname: "",
  href: "",
  origin: "null",
  password: "",
  path: "",
  pathname: "",
  port: "",
  protocol: "",
  search: "",
  // This should be a "URLSearchParams" object
  searchParams: {},
  username: "",
};

export const parse = memoize(function parse(url): ParsedURL {
  try {
    if (url.startsWith("webpack://_N_E")) {
      url = `webpack:${url.substring(14)}`;
    } else if (url.startsWith("webpack-internal:///.")) {
      url = `webpack-internal:${url.substring(21)}`;
    }
    const urlObj = new URL(url) as unknown as ParsedURL;
    urlObj.path = urlObj.pathname + urlObj.search;
    return urlObj;
  } catch (err) {
    // If we're given simply a filename...
    if (url) {
      return { ...defaultUrl, path: url, pathname: url };
    }

    return defaultUrl;
  }
});

export function sameOrigin(firstUrl: string, secondUrl: string) {
  return parse(firstUrl).origin == parse(secondUrl).origin;
}
