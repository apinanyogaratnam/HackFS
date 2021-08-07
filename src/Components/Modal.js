import React from "react";
import Draggable from "react-draggable";
import { ModalContext } from "../Contexts/ModalProvider";
import "../css/window.scss";
import WindowContent from "./window_content";
import DragIcon from "../assets/drag-vector.png";
import styled from "styled-components";

const Modal = () => {
    return (
        <ModalContext.Consumer>
            {({
                windowPosition,
                hasDraggedWindowPosition,
                extensionId,
                getExtensionId,
            }) => (
                <Draggable
                    handle=".handle-text"
                    defaultPosition={{
                        x: windowPosition.x,
                        y: windowPosition.y,
                    }}
                    position={
                        hasDraggedWindowPosition
                            ? { x: windowPosition.x, y: windowPosition.y }
                            : null
                    }
                >
                    <div
                        id="modal"
                        className="modal-window"
                        style={{
                            transform: windowPosition,
                        }}
                    >
                        <div className="modal-window-inner-border">
                            <>
                                <div className="modal-body">
                                    <div className="modal-handle">
                                        <div className="modal-close-button">
                                        </div>
                                        <img
                                            className="handle-text"
                                            src={DragIcon}
                                        />
                                    </div>
                                    <div className="modal-content">
                                        <h3>{extensionId}</h3>
                                        <WindowContent />
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                </Draggable>
            )}
        </ModalContext.Consumer>
    );
};

export default Modal;
