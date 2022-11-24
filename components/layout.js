export default function Layout(props) {
  return (
    <div className="flex flex-col min-h-screen bg-black"> 
    
      <main>{props.children}</main> 
    
    </div>
  )
}
