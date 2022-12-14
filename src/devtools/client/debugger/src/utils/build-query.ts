/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

//
import escapeRegExp from "lodash/escapeRegExp";

/**
 * Ignore doing outline matches for less than 3 whitespaces
 *
 * @memberof utils/source-search
 * @static
 */
function ignoreWhiteSpace(str: string) {
  return /^\s{0,2}$/.test(str) ? "(?!\\s*.*)" : str;
}

function wholeMatch(query: string, wholeWord?: boolean) {
  if (query === "" || !wholeWord) {
    return query;
  }

  return `\\b${query}\\b`;
}

function buildFlags(caseSensitive?: boolean, isGlobal?: boolean) {
  if (caseSensitive && isGlobal) {
    return "g";
  }

  if (!caseSensitive && isGlobal) {
    return "gi";
  }

  if (!caseSensitive && !isGlobal) {
    return "i";
  }
}

export interface SearchQueryModifiers {
  caseSensitive?: boolean;
  regexMatch?: boolean;
  wholeWord?: boolean;
}

export default function buildQuery(
  originalQuery: string,
  modifiers: SearchQueryModifiers,
  { isGlobal = false, ignoreSpaces = false }
) {
  const { caseSensitive, regexMatch, wholeWord } = modifiers;

  if (originalQuery === "") {
    return new RegExp(originalQuery);
  }

  let query = originalQuery;
  if (ignoreSpaces) {
    query = ignoreWhiteSpace(query);
  }

  if (!regexMatch) {
    query = escapeRegExp(query);
  }

  query = wholeMatch(query, wholeWord);
  const flags = buildFlags(caseSensitive, isGlobal);

  if (flags) {
    return new RegExp(query, flags);
  }

  return new RegExp(query);
}
