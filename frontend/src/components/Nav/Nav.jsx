
function Nav({selectPage}) {
  return (
    <>
        <ul>
            <li onClick={()=>selectPage('home')}>Home</li>
            <li onClick={()=>selectPage('Create')}>Create</li>
        </ul>
    </>
  )
}

export default Nav