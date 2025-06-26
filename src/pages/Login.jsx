import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../features/user/userSlice';
import { fakeAuthService } from '../features/user/authService';
import styled from 'styled-components';

const Container = styled.div`max-width: 400px; margin: 4rem auto;`;
const Input = styled.input`width: 100%; padding: 10px; margin: 10px 0;`;
const Button = styled.button`padding: 10px 20px; background-color: ${({ theme }) => theme.primary}; color: white; border: none; cursor: pointer;`;

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = await fakeAuthService.login(form);
      dispatch(login(user));
      alert("Login realizado com sucesso!");
    } catch (err) {
      alert("Erro ao logar: " + err.message);
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <Input type="password" name="password" placeholder="Senha" onChange={handleChange} />
        <Button type="submit">Entrar</Button>
      </form>
    </Container>
  );
}