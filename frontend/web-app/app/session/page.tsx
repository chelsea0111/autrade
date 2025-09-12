import { auth } from "@/auth";
import React from "react";
import Heading from "../components/heading";
import AuthTest from "./auth-test";

const Session = async () => {
  const session = await auth();
  return (
    <div>
      <Heading title="Session dashboard" />
      <div className="bg-blue-200 border-2 border-blue-500">
        <h3 className="text-lg">Session data</h3>
        <pre className="whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <div className="mt-4">
        <AuthTest />
      </div>
    </div>
  );
};

export default Session;
