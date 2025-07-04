function Container({ children, className }) {
  return <div className={`w-full mx-auto px-4 ${className}`}>{children}</div>;
}

export default Container;
