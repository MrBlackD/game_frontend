import { Container } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useCurrentUser, user } from "./auth/auth";
import AuthForm from "./pages/auth-form/AuthForm";

export default function Auth({ children }) {
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading) {
    return null;
  }
  if (!!user?.id) {
    return children;
  }
  return (
    <Container className="h-full">
      <div className="h-full flex justify-center items-center">
        <AuthForm />
      </div>
    </Container>
  );
}
