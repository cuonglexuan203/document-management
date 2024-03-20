"use client";
import React, { useState } from "react";
import Footer from "./_components/Footer";
import LoadingModal from "./_components/LoadingModal";
import Header from "./_components/Header";
import NavBar from "./_components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main>
      <Header />
      {children}
      <Footer />
      <LoadingModal />
    </main>
  );
}
