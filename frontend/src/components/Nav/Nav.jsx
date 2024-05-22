
function Nav({selectPage}) {
  return (
    <>
        <ul>
            <li onClick={()=>selectPage('home')}>Home</li>
            <li onClick={()=>selectPage('create')}>Create</li>
        </ul>
    </>
  )
}

export default Nav