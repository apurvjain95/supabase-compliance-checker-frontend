"use client";

import Header from "@/components/root/Header";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const ComplianceLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      {currentUser.id && (
        <>
          <Header />
          <div className="pt-8 pb-16 mx-auto sm:px-5 md:px-20">{children}</div>
        </>
      )}
    </>
  );
};

export default ComplianceLayout;
