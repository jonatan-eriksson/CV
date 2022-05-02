import { useState } from "react";

const defaultDocument: IDocument = {
  id: 0,
  name: "",
  description: "",
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
};

const DocumentEdit = () => {
  const [document, setDocument] = useState<IDocument>(defaultDocument);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setDocument({ ...document, [name]: value });
  }

  const updateDocument = () => {
    console.log(document);
  }

  return (
    <>
      <div>Edit Document</div>
      <form onSubmit={updateDocument}>
        <div>
          <h3>Profile</h3>
          <label>Name </label>
          <input name="name" value={document?.name} onChange={onChange} />

          {/* <label>First name </label>
          <input value={document?.name} onChange={(e: any) => setFirstName(e.value)} />

          <label>Last name </label>
          <input /> */}

          <label>Description </label>
          <textarea name="description" value={document?.description} onChange={onChange} />
        </div>
      </form>
    </>
  )
}

export default DocumentEdit;
