import axios from "axios";

const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

async function login(email: string, password: string) {
  const response = await axios.post("/graphql", {
    query: LOGIN_MUTATION,
    variables: { email, password },
  });

  const data = response.data.data;
  localStorage.setItem("token", data.login.token); // Store token
  return data.login.user;
}


const AuthService = () => {
};

export default AuthService;