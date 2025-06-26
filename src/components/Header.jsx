import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <header style={{ padding: '1rem', background: '#fffaf2', borderBottom: '1px solid #ddd' }}>
      <h1 style={{ display: 'inline-block' }}>📚 Livros & Café</h1>
      <nav style={{ float: 'right' }}>
        {isAuthenticated ? (
          <>
            <span>Olá, {user.name}</span> &nbsp;
            {user.role === 'admin' && <Link to="/admin">Painel Admin</Link>} &nbsp;
            <button onClick={() => dispatch(logout())}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link> | <Link to="/cadastro">Cadastrar</Link>
          </>
        )}
      </nav>
    </header>
  );
}