/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { RuleFront } from "./fronts/rule";
import { StyleFront } from "./fronts/style";

/**
 * Store of CSSStyleDeclarations mapped to properties that have been changed by
 * the user.
 */
export default class UserProperties {
  map: Map<string, Record<string, string>>;

  constructor() {
    this.map = new Map<string, Record<string, string>>();
  }

  /**
   * Get a named property for a given CSSStyleDeclaration.
   *
   * @param {CSSStyleDeclaration} style
   *        The CSSStyleDeclaration against which the property is mapped.
   * @param {String} name
   *        The name of the property to get.
   * @param {String} value
   *        Default value.
   * @return {String}
   *        The property value if it has previously been set by the user, null
   *        otherwise.
   */
  getProperty(style: RuleFront | StyleFront, name: string, value: string) {
    const key = this.getKey(style);
    const entry = this.map.get(key);

    if (entry && name in entry) {
      return entry[name];
    }
    return value;
  }

  /**
   * Set a named property for a given CSSStyleDeclaration.
   *
   * @param {CSSStyleDeclaration} style
   *        The CSSStyleDeclaration against which the property is to be mapped.
   * @param {String} name
   *        The name of the property to set.
   * @param {String} userValue
   *        The value of the property to set.
   */
  // setProperty(style, name, userValue) {
  //   const key = this.getKey(style, name);
  //   const entry = this.map.get(key);

  //   if (entry) {
  //     entry[name] = userValue;
  //   } else {
  //     const props = {};
  //     props[name] = userValue;
  //     this.map.set(key, props);
  //   }
  // }

  /**
   * Check whether a named property for a given CSSStyleDeclaration is stored.
   *
   * @param {CSSStyleDeclaration} style
   *        The CSSStyleDeclaration against which the property would be mapped.
   * @param {String} name
   *        The name of the property to check.
   */
  contains(style: RuleFront | StyleFront, name: string) {
    const key = this.getKey(style, name);
    const entry = this.map.get(key);
    return !!entry && name in entry;
  }

  getKey(style: RuleFront | StyleFront, name?: string) {
    return style.objectId() + ":" + name;
  }

  clear() {
    this.map.clear();
  }
}
