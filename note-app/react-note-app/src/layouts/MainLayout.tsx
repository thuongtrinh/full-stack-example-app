function MainLayout({ children }: { children: React.ReactNode }) {

const wrapLayout: React.CSSProperties = {
  textAlign: "center",
  marginTop: '50px',
  padding: '10px',
};

  return (
    <main style={wrapLayout}>
      {children}
    </main>
  );
}

export default MainLayout;
