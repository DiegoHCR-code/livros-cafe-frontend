import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../features/user/authService';
import { login } from '../features/user/userSlice';
import { useNavigate, Link } from 'react-router-dom';

const Background = styled.div`
  background-color: #1b0c0a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #e3c39a;
  border: 1px solid #d9b99b;
  padding: 2.5rem;
  border-radius: 30px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  text-align: center;

  img {
    width: 400px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 25px;
  margin: 10px 0;
  border: 1px solid #d9b99b;
  border-radius: 25px;
  background: #F8EDD4FF;
  color: #1b0c0a;

  &::placeholder {
    color: #1B0C0AFA;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background-color: #7b4b2a;
  color: white;
  border: none;
  padding: 20px;
  width: 50%;
  margin-top: 10px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;

  &:hover {
    background-color: #5c3820;
  }
`;

const SmallText = styled.small`
  display: block;
  margin-top: 1rem;
  color: #7b4b2a;
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  color: #7b4b2a;
  text-decoration: underline;
  font-weight: bold;
  font-size: 1.1rem;

  &:hover {
    color: #5c3820;
  }
`;

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = await authService.register(form);
      dispatch(login(user));
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert('Erro ao cadastrar: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Background>
      <Card>
        <img src="/assets/logo.png" alt="Livros & Café" />
        <form onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="Digite seu nome" onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Digite seu e-mail" onChange={handleChange} required />
          <Input type="password" name="password" placeholder="Digite sua senha" onChange={handleChange} required />
          <Button type="submit">Cadastrar</Button>
        </form>
        <SmallText>
          Já possui conta? <StyledLink to="/login">Faça login</StyledLink>
        </SmallText>
      </Card>
    </Background>
  );
}
