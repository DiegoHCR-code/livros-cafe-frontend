import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 10;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 500px;
  max-width: 95%;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  background-color: #7b4b2a;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #5c3820;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
  border-radius: 10px;
`;

export default function EditBookModal({ livro, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    autor: "",
    preco: "",
    quantidade: "",
    categoria: "",
    imagem: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (livro) {
      setForm({
        title: livro.title || "",
        autor: livro.autor || "",
        preco: livro.preco || "",
        quantidade: livro.quantidade || "",
        categoria: livro.categoria || "",
        imagem: livro.imagem || "",
      });
    }
  }, [livro]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const data = new FormData();

    data.append("title", form.title);
    data.append("autor", form.autor);
    data.append("preco", form.preco);
    data.append("quantidade", form.quantidade);
    data.append("categoria", form.categoria);

    if (file) {
      data.append("file", file);
    } else {
      data.append("imagem", form.imagem);
    }

    try {
      await axios.put(
        `http://localhost:5001/api/livros/${livro.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSave();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar livro. Verifique o console.");
    }
  };

  return (
    <Overlay>
      <Modal>
        <h2>Editar Livro</h2>
        {form.imagem && !file && (
          <ImagePreview src={form.imagem} alt="Imagem atual" />
        )}
        {file && (
          <ImagePreview src={URL.createObjectURL(file)} alt="Nova imagem" />
        )}
        <form onSubmit={handleSubmit}>
          <Input name="title" value={form.title} onChange={handleChange} placeholder="Título" />
          <Input name="autor" value={form.author} onChange={handleChange} placeholder="Autor" />
          <Input name="preco" value={form.preco} onChange={handleChange} placeholder="Preço" />
          <Input name="quantidade" value={form.quantidade} onChange={handleChange} placeholder="Quantidade" />
          <Input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoria" />
          <Input name="imagem" value={form.imagem} onChange={handleChange} placeholder="URL da imagem" />
          <label>Ou envie uma nova imagem:</label>
          <Input type="file" onChange={handleFileChange} />
          <Button type="submit">Salvar</Button>
          <Button onClick={onClose} type="button" style={{ backgroundColor: "#888", marginLeft: "10px" }}>
            Cancelar
          </Button>
        </form>
      </Modal>
    </Overlay>
  );
}
