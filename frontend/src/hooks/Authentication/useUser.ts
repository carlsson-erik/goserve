import { useMutation } from "@apollo/client";
import React from "react";
import { graphql } from "../../utils/graphql";
import { Variable } from "../template/useCreateTemplate";


export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }

export interface CreateUserResult {
    createUser: User;
}

const useUser = () => {
    const getUser = async () => {
    };

    const createUser = async () => {
        const [createTileGQL, other] = useMutation<CreateUserResult>(
            graphql(`
                mutation CreateUser($name: String!, $email: String!, $username: String!, $password: String!, $role: String!) {
                    createUser(input: { name: $name, email: $email, username: $username, password: $password, role: $role }) {
                        id
                        name
                        email
                        username
                        password
                        role
                        createdAt
                        updatedAt
                    }
                }
            `)
    };

    const updateUser = async () => {
    };
};

export default useUser;