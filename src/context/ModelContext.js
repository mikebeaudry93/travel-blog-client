import React, { createContext, useState } from "react";

const ModelContext = createContext();

function ModelContextProvider(props) {
  const [showModalContext, setShowModalContext] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(true);

  const [emailForModal, setEmailForModal] = useState("");

  return (
    <ModelContext.Provider
      value={{
        showModalContext,
        setShowModalContext,
        showModal,
        setShowModal,
        showDeleteModal,
        setShowDeleteModal,
        emailForModal,
        setEmailForModal,
      }}
    >
      {props.children}
    </ModelContext.Provider>
  );
}

export default ModelContext;
export { ModelContextProvider };
