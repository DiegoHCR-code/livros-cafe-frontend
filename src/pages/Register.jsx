import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../features/user/userSlice';
import { fakeAuthService } from '../features/user/authService';
import styled from 'styled-components';

const Container = styled.div`max-width: 400px; margin: 4rem auto;`;
const Input = styled.input`width: 100%; padding: 10px; margin: 10px 0;`;
const Button = styled.button`padding: 10px 20px; background-color: ${({ theme }) => theme.primary}; color: white; border: none; cursor: pointer;`;

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const user = await fakeAuthService.register(form);
    dispatch(login(user));
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <Container>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome" onChange={handleChange} />
        <Input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <Input name="password" type="password" placeholder="Senha" onChange={handleChange} />
        <Button type="submit">Cadastrar</Button>
      </form>
    </Container>
  );
}