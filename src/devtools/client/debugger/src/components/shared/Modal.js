/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

//

import classnames from "classnames";
import React from "react";
import { Transition } from "react-transition-group";

export const transitionTimeout = 50;

export class Modal extends React.Component {
  onClick = e => {
    e.stopPropagation();
  };

  render() {
    const { additionalClass, children, handleClose, status, width } = this.props;

    return (
      <div className="modal-wrapper" onClick={handleClose}>
        <div
          style={{ width }}
          className={classnames("modal", additionalClass, status)}
          onClick={this.onClick}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default function Slide({
  width = "50%",
  in: inProp,
  children,
  additionalClass,
  handleClose,
}) {
  return (
    <Transition in={inProp} timeout={transitionTimeout} appear>
      {status => (
        <Modal
          width={width}
          status={status}
          additionalClass={additionalClass}
          handleClose={handleClose}
        >
          {children}
        </Modal>
      )}
    </Transition>
  );
}
