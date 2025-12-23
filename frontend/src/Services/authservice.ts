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

const GET_USER_BY_EMAIL = `
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      name
      email
      password
    }
  }
`;

const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
const graphqlUrl = apiUrl ? `${apiUrl.replace(/\/$/, "")}/query` : "/query";

async function login(email: string, password: string) {
  // const response = await axios.post(graphqlUrl, {
  //   query: LOGIN_MUTATION,
  //   variables: { email, password },
  // });

  const response = await axios.post(graphqlUrl, {
    query: GET_USER_BY_EMAIL,
    variables: { email: email },
  });

  console.log(response.data);
  const data = response.data.data;
  localStorage.setItem("token", data.login.token);
  return data.login.user;
}

const authService = {
  login,
};

export default authService;

