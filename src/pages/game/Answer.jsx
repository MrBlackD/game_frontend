import { Container } from "@nextui-org/react";

export default function Answer({ gameSession }) {
    
  return (
    <Container className="h-full">
      <div className="flex items-center justify-center h-full ">
        <div className="flex items-center justify-center  w-[400px] h-[400px]  border-4 border-indigo-200 border-b-indigo-500">
          <h1>{gameSession.currentScreen.title}</h1>
          <h3>{gameSession.currentScreen.description}</h3>
        </div>
      </div>
    </Container>
  );
}
