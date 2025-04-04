import { graphql } from "../../utils/graphql";
import { User } from "./useUser";


export const GET_USERS = graphql(`
  query User {
        user(username: $username) {
            name
        }
    }
`);

export interface CreateUserResult {
    createUser: User;
}
