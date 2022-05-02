type Props = {
  children?: JSX.Element | never[]
}

const Sidebar = ({ children }: Props) => {
  return (
    <>
      <div className="min-vh-100 d-none d-md-block bg-light">
        {children}
      </div>
    </>
  )
}

export default Sidebar;
