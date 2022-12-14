/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export * from "devtools/client/webconsole/actions/toolbox";

export interface DebuggerLocation {
  url?: string;
  sourceId?: string;
  line?: number;
  column?: number;
}
