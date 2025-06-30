import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBar = styled.header`
  padding: 1rem;
  background: #e3c39a;
  border-bottom: 1px solid #ddd;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(Link)`
  display: inline-block;
  color: #4b2414;
  font-size: 2.5rem;
  font-family: fantasy;
  text-decoration: none;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  a {
    color: #7b4b2a;
    text-decoration: none;
    font-weight: bold;
    margin: 0 0.5rem;

    &:hover {
      color: #5c3820;
    }
  }
`;

const StyledLink = styled(Link)`
  color: #7b4b2a;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  border: 1px solid #7b4b2a;
  padding: 10px;
  border-radius: 25px;

  &:hover {
    color: #5c3820;
  }
`;

const UserGreeting = styled.span`
  font-size: 1.2rem;
  color: #7b4b2a;
  margin-right: 1rem;
`;

const UserName = styled.span`
  font-weight: bold;
  color: #4b2414;
  font-size: 1.5rem;
`;

const LogoutButton = styled.button`
  background-color: #c0392b;
  font-size: 0.85rem;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    background-color: #922b21;
  }
`;

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);
  

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <HeaderBar>
      <Title to="/">Livros & Café</Title>
      <Nav>
        {isAuthenticated ? (
          <>
            {user?.name && (
              <UserGreeting>
                Olá, <UserName>{user.name}</UserName>
              </UserGreeting>
            )}
            {user?.role === "admin" && (
              <StyledLink to="/admin">Painel Admin</StyledLink>
            )}
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/register">Cadastrar</Link>
          </>
        )}
      </Nav>
    </HeaderBar>
  );
}
